/**
 * ChapterFlashEMT - Device Fingerprinting
 * Generate unique device identifiers to prevent unauthorized distribution
 */

interface DeviceFingerprint {
  id: string
  components: {
    canvas: string
    userAgent: string
    language: string
    timezone: string
    screen: string
    colorDepth: number
    platform: string
    hardwareConcurrency: number
    deviceMemory?: number
    touchSupport: boolean
    vendor: string
  }
  timestamp: number
}

/**
 * Generate a unique canvas fingerprint
 * Different devices render canvas slightly differently
 */
function getCanvasFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'no-canvas'

    canvas.width = 200
    canvas.height = 50
    
    // Draw text with different properties
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    ctx.fillText('ChapterFlashEMT🚑', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
    ctx.fillText('EMS Education', 4, 17)

    return canvas.toDataURL()
  } catch (error) {
    return 'canvas-error'
  }
}

/**
 * Get WebGL fingerprint (GPU info)
 */
function getWebGLFingerprint(): string {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext
    if (!gl) return 'no-webgl'

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      return `${vendor}~${renderer}`
    }
    return 'no-debug-info'
  } catch (error) {
    return 'webgl-error'
  }
}

/**
 * Check for touch support
 */
function getTouchSupport(): boolean {
  return ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) || 
         // @ts-ignore
         (navigator.msMaxTouchPoints > 0)
}

/**
 * Generate a comprehensive device fingerprint
 * This creates a unique ID based on device characteristics
 */
export async function getDeviceFingerprint(): Promise<DeviceFingerprint> {
  const components = {
    canvas: getCanvasFingerprint(),
    userAgent: navigator.userAgent,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
    colorDepth: screen.colorDepth,
    platform: navigator.platform,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    // @ts-ignore
    deviceMemory: navigator.deviceMemory || undefined,
    touchSupport: getTouchSupport(),
    vendor: navigator.vendor,
  }

  // Create a composite string from all components
  const compositeString = Object.entries(components)
    .map(([key, value]) => `${key}:${value}`)
    .join('|')

  // Hash the composite to create a unique ID
  const encoder = new TextEncoder()
  const data = encoder.encode(compositeString)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const id = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return {
    id,
    components,
    timestamp: Date.now()
  }
}

/**
 * Store device fingerprint in localStorage
 * Returns true if this is a new device
 */
export async function registerDevice(): Promise<boolean> {
  const storageKey = 'chapterflash_device'
  const existingData = localStorage.getItem(storageKey)
  
  const fingerprint = await getDeviceFingerprint()
  
  if (!existingData) {
    // New device
    localStorage.setItem(storageKey, JSON.stringify(fingerprint))
    return true
  }
  
  const existing = JSON.parse(existingData) as DeviceFingerprint
  
  // Check if device ID matches
  if (existing.id !== fingerprint.id) {
    console.warn('⚠️ Device fingerprint mismatch detected!')
    // This could indicate:
    // 1. Content was copied to different device
    // 2. User changed device settings significantly
    // 3. Potential security issue
    return false
  }
  
  // Update timestamp
  localStorage.setItem(storageKey, JSON.stringify(fingerprint))
  return false
}

/**
 * Get current device ID
 */
export async function getDeviceId(): Promise<string> {
  const storageKey = 'chapterflash_device'
  const existingData = localStorage.getItem(storageKey)
  
  if (existingData) {
    const data = JSON.parse(existingData) as DeviceFingerprint
    return data.id
  }
  
  const fingerprint = await getDeviceFingerprint()
  localStorage.setItem(storageKey, JSON.stringify(fingerprint))
  return fingerprint.id
}

/**
 * Verify device authenticity
 * Returns true if device fingerprint matches stored value
 */
export async function verifyDevice(): Promise<boolean> {
  try {
    const storageKey = 'chapterflash_device'
    const existingData = localStorage.getItem(storageKey)
    
    if (!existingData) {
      // First time - register device
      await registerDevice()
      return true
    }
    
    const existing = JSON.parse(existingData) as DeviceFingerprint
    const current = await getDeviceFingerprint()
    
    // Allow some tolerance for minor variations
    // But major differences indicate device change
    const similarityScore = calculateSimilarity(existing.components, current.components)
    
    return similarityScore > 0.8 // 80% similarity threshold
  } catch (error) {
    console.error('Device verification failed:', error)
    return false
  }
}

/**
 * Calculate similarity between two device fingerprints
 */
function calculateSimilarity(a: any, b: any): number {
  const keys = Object.keys(a)
  let matches = 0
  
  for (const key of keys) {
    if (a[key] === b[key]) {
      matches++
    }
  }
  
  return matches / keys.length
}

/**
 * Track how many devices have accessed this content
 * Useful for detecting unauthorized sharing
 */
export function trackDeviceCount(): number {
  const storageKey = 'chapterflash_device_count'
  const count = parseInt(localStorage.getItem(storageKey) || '1', 10)
  return count
}

/**
 * Export device information for support/debugging
 */
export async function exportDeviceInfo(): Promise<string> {
  const fingerprint = await getDeviceFingerprint()
  return JSON.stringify(fingerprint, null, 2)
}
