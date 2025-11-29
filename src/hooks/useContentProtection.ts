/**
 * ChapterFlashEMT - Content Protection Hook
 * Prevents copying, screenshots, and dev tools access
 */

import { useEffect, useCallback, useState } from 'react'
import { getDeviceId } from '@/lib/device-fingerprint'

interface ProtectionOptions {
  disableRightClick?: boolean
  disableTextSelection?: boolean
  disableCopy?: boolean
  disableScreenshot?: boolean
  detectDevTools?: boolean
  watermark?: boolean
  onViolation?: (type: string) => void
}

export function useContentProtection(options: ProtectionOptions = {}) {
  const {
    disableRightClick = true,
    disableTextSelection = true,
    disableCopy = true,
    disableScreenshot = true,
    detectDevTools = true,
    watermark = true,
    onViolation
  } = options

  const [devToolsOpen, setDevToolsOpen] = useState(false)
  const [deviceId, setDeviceId] = useState<string>('')

  // Log security violations
  const logViolation = useCallback((type: string, details?: any) => {
    const violation = {
      type,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      deviceId,
      details
    }

    console.warn('🔒 Security violation:', violation)

    // Store violations
    const storageKey = 'chapterflash_violations'
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]')
    existing.push(violation)
    
    // Keep only last 100 violations
    if (existing.length > 100) existing.shift()
    
    localStorage.setItem(storageKey, JSON.stringify(existing))

    // Call custom handler
    onViolation?.(type)
  }, [deviceId, onViolation])

  // Initialize device ID
  useEffect(() => {
    getDeviceId().then(setDeviceId)
  }, [])

  // Disable right-click context menu
  useEffect(() => {
    if (!disableRightClick) return

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      logViolation('right_click_attempt')
      return false
    }

    document.addEventListener('contextmenu', handleContextMenu)
    return () => document.removeEventListener('contextmenu', handleContextMenu)
  }, [disableRightClick, logViolation])

  // Disable text selection
  useEffect(() => {
    if (!disableTextSelection) return

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      
      // Allow selection in input fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }
      
      e.preventDefault()
      logViolation('text_selection_attempt')
      return false
    }

    document.addEventListener('selectstart', handleSelectStart)
    return () => document.removeEventListener('selectstart', handleSelectStart)
  }, [disableTextSelection, logViolation])

  // Disable copy/paste
  useEffect(() => {
    if (!disableCopy) return

    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement
      
      // Allow copy in input fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }
      
      e.preventDefault()
      logViolation('copy_attempt')
      return false
    }

    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCopy)
    
    return () => {
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCopy)
    }
  }, [disableCopy, logViolation])

  // Detect screenshot attempts (limited detection)
  useEffect(() => {
    if (!disableScreenshot) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen key
      if (e.key === 'PrintScreen') {
        logViolation('screenshot_attempt', { key: 'PrintScreen' })
      }
      
      // Cmd+Shift+3/4 (Mac screenshot)
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === '3' || e.key === '4')) {
        logViolation('screenshot_attempt', { key: 'Mac screenshot shortcut' })
      }
      
      // Windows Snipping Tool (Win+Shift+S)
      if (e.key === 's' && e.shiftKey && e.metaKey) {
        logViolation('screenshot_attempt', { key: 'Windows snipping tool' })
      }
    }

    document.addEventListener('keyup', handleKeyDown)
    return () => document.removeEventListener('keyup', handleKeyDown)
  }, [disableScreenshot, logViolation])

  // Detect DevTools opening
  useEffect(() => {
    if (!detectDevTools) return

    let devToolsCheckInterval: NodeJS.Timeout

    const checkDevTools = () => {
      const widthThreshold = 160
      const heightThreshold = 160
      
      const isOpen = 
        (window.outerWidth - window.innerWidth > widthThreshold) ||
        (window.outerHeight - window.innerHeight > heightThreshold)

      if (isOpen !== devToolsOpen) {
        setDevToolsOpen(isOpen)
        if (isOpen) {
          logViolation('devtools_opened')
          console.clear() // Clear console
        }
      }
    }

    // Check every 1 second
    devToolsCheckInterval = setInterval(checkDevTools, 1000)
    checkDevTools() // Initial check

    // Detect debugger
    const detectDebugger = () => {
      const before = Date.now()
      // @ts-ignore
      debugger
      const after = Date.now()
      if (after - before > 100) {
        logViolation('debugger_detected')
      }
    }

    // Run debugger detection every 5 seconds
    const debuggerInterval = setInterval(detectDebugger, 5000)

    return () => {
      clearInterval(devToolsCheckInterval)
      clearInterval(debuggerInterval)
    }
  }, [detectDevTools, devToolsOpen, logViolation])

  // Add watermark overlay
  useEffect(() => {
    if (!watermark || !deviceId) return

    const watermarkDiv = document.createElement('div')
    watermarkDiv.id = 'content-watermark'
    watermarkDiv.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.015;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 100px,
        rgba(255,255,255,0.03) 100px,
        rgba(255,255,255,0.03) 200px
      );
      font-size: 10px;
      color: rgba(255,255,255,0.1);
      overflow: hidden;
    `

    // Add device ID text as watermark
    watermarkDiv.textContent = `ChapterFlashEMT | Device: ${deviceId.substring(0, 8)} | ${new Date().toISOString()}`
    
    document.body.appendChild(watermarkDiv)

    return () => {
      const existing = document.getElementById('content-watermark')
      if (existing) {
        document.body.removeChild(existing)
      }
    }
  }, [watermark, deviceId])

  // Disable certain keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault()
        logViolation('f12_pressed')
        return false
      }

      // Disable Ctrl+Shift+I / Cmd+Option+I (DevTools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        logViolation('devtools_shortcut')
        return false
      }

      // Disable Ctrl+Shift+J / Cmd+Option+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        logViolation('console_shortcut')
        return false
      }

      // Disable Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        logViolation('view_source_attempt')
        return false
      }

      // Disable Ctrl+S / Cmd+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        logViolation('save_page_attempt')
        return false
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [logViolation])

  return {
    devToolsOpen,
    deviceId,
    logViolation,
    getViolations: () => {
      const storageKey = 'chapterflash_violations'
      return JSON.parse(localStorage.getItem(storageKey) || '[]')
    }
  }
}

/**
 * CSS class names for protected content
 */
export const protectedContentClass = `
  select-none
  [user-select:none]
  [-webkit-user-select:none]
  [-moz-user-select:none]
  [-ms-user-select:none]
  cursor-default
  [pointer-events:auto]
`
