/**
 * ChapterFlashEMT - Content Protection & Encryption
 * AES-256 encryption for flashcard content and user data
 */

import CryptoJS from 'crypto-js'

// Generate a unique encryption key per installation
// In production, this could be tied to device ID or license key
const getEncryptionKey = (): string => {
  if (typeof window === 'undefined') return ''
  
  const storageKey = 'chapterflash_ek'
  let key = localStorage.getItem(storageKey)
  
  if (!key) {
    // Generate a random 256-bit key
    key = CryptoJS.lib.WordArray.random(32).toString()
    localStorage.setItem(storageKey, key)
  }
  
  return key
}

/**
 * Encrypt data using AES-256
 * @param data - Any JSON-serializable data
 * @returns Encrypted string
 */
export function encryptData(data: any): string {
  try {
    const key = getEncryptionKey()
    const jsonString = JSON.stringify(data)
    const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString()
    return encrypted
  } catch (error) {
    console.error('Encryption failed:', error)
    throw new Error('Failed to encrypt data')
  }
}

/**
 * Decrypt AES-256 encrypted data
 * @param encryptedData - Encrypted string
 * @returns Decrypted data
 */
export function decryptData<T = any>(encryptedData: string): T {
  try {
    const key = getEncryptionKey()
    const bytes = CryptoJS.AES.decrypt(encryptedData, key)
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8)
    
    if (!decryptedString) {
      throw new Error('Decryption produced empty result')
    }
    
    return JSON.parse(decryptedString) as T
  } catch (error) {
    console.error('Decryption failed:', error)
    throw new Error('Failed to decrypt data - content may be corrupted or tampered')
  }
}

/**
 * Hash data using SHA-256 (one-way, for verification)
 * @param data - Data to hash
 * @returns SHA-256 hash string
 */
export function hashData(data: any): string {
  const jsonString = JSON.stringify(data)
  return CryptoJS.SHA256(jsonString).toString()
}

/**
 * Generate a content fingerprint/watermark
 * Embeds invisible tracking information
 * @param userId - User identifier
 * @param timestamp - Current timestamp
 * @returns Encoded watermark
 */
export function createWatermark(userId: string, timestamp: number = Date.now()): string {
  const watermarkData = {
    uid: userId,
    ts: timestamp,
    app: 'ChapterFlashEMT'
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(watermarkData)))
}

/**
 * Verify content integrity using hash comparison
 * @param data - Original data
 * @param expectedHash - Expected hash value
 * @returns True if content is unmodified
 */
export function verifyIntegrity(data: any, expectedHash: string): boolean {
  const actualHash = hashData(data)
  return actualHash === expectedHash
}

/**
 * Obfuscate text content (additional layer)
 * Simple XOR cipher for text obfuscation
 */
export function obfuscateText(text: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}

export function deobfuscateText(obfuscated: string): string {
  return CryptoJS.enc.Base64.parse(obfuscated).toString(CryptoJS.enc.Utf8)
}
