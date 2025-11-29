/**
 * ChapterFlashEMT - License & Device Management System
 * Controls app access based on valid license keys
 */

import { getDeviceId } from './device-fingerprint'
import { encryptData, decryptData, hashData } from './encryption'

export interface License {
  key: string
  email: string
  deviceId: string
  activatedAt: number
  expiresAt: number | null // null = lifetime
  maxDevices: number
  currentDevices: string[]
  tier: 'free' | 'student' | 'pro' | 'lifetime'
  features: string[]
}

interface LicenseValidationResult {
  valid: boolean
  license?: License
  error?: string
  daysRemaining?: number
}

/**
 * Validate a license key structure
 */
function isValidLicenseFormat(key: string): boolean {
  // ChapterFlashEMT license format: CFEMT-XXXXX-XXXXX-XXXXX-XXXXX
  const pattern = /^CFEMT-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/
  return pattern.test(key)
}

/**
 * Generate a license key (server-side in production)
 */
export function generateLicenseKey(): string {
  const segments = []
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  
  for (let i = 0; i < 4; i++) {
    let segment = ''
    for (let j = 0; j < 5; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    segments.push(segment)
  }
  
  return `CFEMT-${segments.join('-')}`
}

/**
 * Store license locally (encrypted)
 */
export function storeLicense(license: License): void {
  const encrypted = encryptData(license)
  localStorage.setItem('chapterflash_license', encrypted)
  localStorage.setItem('chapterflash_license_hash', hashData(license))
}

/**
 * Retrieve stored license
 */
export function getStoredLicense(): License | null {
  try {
    const encrypted = localStorage.getItem('chapterflash_license')
    const storedHash = localStorage.getItem('chapterflash_license_hash')
    
    if (!encrypted || !storedHash) return null
    
    const license = decryptData<License>(encrypted)
    
    // Verify integrity
    const currentHash = hashData(license)
    if (currentHash !== storedHash) {
      console.error('⚠️ License tampering detected!')
      revokeLicense()
      return null
    }
    
    return license
  } catch (error) {
    console.error('Failed to retrieve license:', error)
    return null
  }
}

/**
 * Revoke/remove license
 */
export function revokeLicense(): void {
  localStorage.removeItem('chapterflash_license')
  localStorage.removeItem('chapterflash_license_hash')
  localStorage.removeItem('chapterflash_activation_date')
}

/**
 * Validate license (client-side check)
 * In production, this should also ping a backend API
 */
export async function validateLicense(licenseKey?: string): Promise<LicenseValidationResult> {
  // Check stored license first
  let license = getStoredLicense()
  
  // If no stored license and key provided, activate it
  if (!license && licenseKey) {
    if (!isValidLicenseFormat(licenseKey)) {
      return {
        valid: false,
        error: 'Invalid license key format'
      }
    }
    
    // In production, validate with backend API here
    // For now, create a demo license
    const deviceId = await getDeviceId()
    
    license = {
      key: licenseKey,
      email: 'user@example.com', // Would come from backend
      deviceId,
      activatedAt: Date.now(),
      expiresAt: null, // Lifetime for demo
      maxDevices: 3,
      currentDevices: [deviceId],
      tier: 'student',
      features: ['offline_access', 'all_chapters', 'progress_tracking', 'export_data']
    }
    
    storeLicense(license)
  }
  
  if (!license) {
    return {
      valid: false,
      error: 'No license found. Please activate your license.'
    }
  }
  
  // Check expiration
  if (license.expiresAt && Date.now() > license.expiresAt) {
    return {
      valid: false,
      error: 'License has expired',
      daysRemaining: 0
    }
  }
  
  // Check device limit
  const currentDeviceId = await getDeviceId()
  if (!license.currentDevices.includes(currentDeviceId)) {
    if (license.currentDevices.length >= license.maxDevices) {
      return {
        valid: false,
        error: `License is already active on ${license.maxDevices} devices. Please deactivate a device first.`
      }
    }
    
    // Add this device
    license.currentDevices.push(currentDeviceId)
    storeLicense(license)
  }
  
  // Calculate days remaining
  let daysRemaining: number | undefined
  if (license.expiresAt) {
    daysRemaining = Math.ceil((license.expiresAt - Date.now()) / (1000 * 60 * 60 * 24))
  }
  
  return {
    valid: true,
    license,
    daysRemaining
  }
}

/**
 * Check if user has access to a specific feature
 */
export function hasFeature(feature: string): boolean {
  const license = getStoredLicense()
  if (!license) return false
  return license.features.includes(feature)
}

/**
 * Get license tier
 */
export function getLicenseTier(): 'free' | 'student' | 'pro' | 'lifetime' | null {
  const license = getStoredLicense()
  return license?.tier || null
}

/**
 * Check if license is valid without detailed result
 */
export async function isLicenseValid(): Promise<boolean> {
  const result = await validateLicense()
  return result.valid
}

/**
 * Get license info for display
 */
export function getLicenseInfo(): {
  tier: string
  devicesUsed: number
  maxDevices: number
  expiresAt: number | null
  features: string[]
} | null {
  const license = getStoredLicense()
  if (!license) return null
  
  return {
    tier: license.tier,
    devicesUsed: license.currentDevices.length,
    maxDevices: license.maxDevices,
    expiresAt: license.expiresAt,
    features: license.features
  }
}

/**
 * Deactivate current device
 */
export async function deactivateDevice(): Promise<boolean> {
  const license = getStoredLicense()
  if (!license) return false
  
  const currentDeviceId = await getDeviceId()
  license.currentDevices = license.currentDevices.filter(id => id !== currentDeviceId)
  
  storeLicense(license)
  return true
}

/**
 * Free tier limitations
 */
export const FREE_TIER_LIMITS = {
  maxChapters: 5,
  maxCardsPerDay: 50,
  features: ['basic_flashcards'],
  watermark: true
}

/**
 * Check if free tier limit reached
 */
export function checkFreeTierLimit(action: 'chapter_access' | 'cards_studied'): boolean {
  const tier = getLicenseTier()
  if (tier !== 'free' && tier !== null) return true // Paid tier, no limits
  
  // Implement free tier limits
  // This would check against actual usage stored in IndexedDB
  return true // Placeholder
}
