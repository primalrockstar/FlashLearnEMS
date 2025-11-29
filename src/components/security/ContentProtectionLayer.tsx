/**
 * ChapterFlashEMT - Global Content Protection Layer
 * Client component that applies security protections app-wide
 */
'use client'

import { useContentProtection } from '@/hooks/useContentProtection'
import { useEffect } from 'react'
import { registerDevice, verifyDevice } from '@/lib/device-fingerprint'

export function ContentProtectionLayer({ children }: { children: React.ReactNode }) {
  const { devToolsOpen, deviceId } = useContentProtection({
    disableRightClick: true,
    disableTextSelection: true,
    disableCopy: true,
    disableScreenshot: true,
    detectDevTools: true,
    watermark: true,
    onViolation: (type) => {
      // Could send analytics or show warning
      if (type === 'devtools_opened') {
        console.warn('⚠️ Developer tools detected - content is protected')
      }
    }
  })

  // Register and verify device on mount
  useEffect(() => {
    const initializeDevice = async () => {
      const isNewDevice = await registerDevice()
      if (isNewDevice) {
        console.log('✅ Device registered')
      }
      
      const isVerified = await verifyDevice()
      if (!isVerified) {
        console.warn('⚠️ Device verification failed - content may be compromised')
      }
    }

    initializeDevice()
  }, [])

  // Show warning if DevTools are open (optional)
  useEffect(() => {
    if (devToolsOpen && process.env.NODE_ENV === 'production') {
      // Could show a modal or overlay warning
      console.warn('🔒 ChapterFlashEMT content is protected. Please close developer tools.')
    }
  }, [devToolsOpen])

  return (
    <>
      {children}
      
      {/* DevTools Warning Overlay (Production only) */}
      {devToolsOpen && process.env.NODE_ENV === 'production' && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[10000] flex items-center justify-center pointer-events-none"
          style={{ userSelect: 'none' }}
        >
          <div className="text-center px-4">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Content Protected
            </h2>
            <p className="text-white/60">
              ChapterFlashEMT content is protected by copyright.<br />
              Please close developer tools to continue studying.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
