'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, X, ExternalLink, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MedicalDisclaimerBannerProps {
  variant?: 'compact' | 'full'
  className?: string
  dismissible?: boolean
}

export function MedicalDisclaimerBanner({ 
  variant = 'compact', 
  className = '',
  dismissible = true 
}: MedicalDisclaimerBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className={`bg-red-900/20 border border-red-700/50 backdrop-blur-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="p-2 rounded-lg bg-red-900/30 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            {variant === 'full' ? (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-red-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Important Medical Disclaimer
                </h3>
                <div className="text-red-200/90 text-sm leading-relaxed space-y-2">
                  <p>
                    <strong>ChapterFlashEMT is an educational tool designed to supplement formal EMT training.</strong> 
                    It is NOT a substitute for accredited EMT education programs, clinical training, hands-on experience, 
                    official certification courses, or medical advice.
                  </p>
                  <p>
                    <strong>Always follow your local protocols, medical direction, and scope of practice.</strong> 
                    In emergency situations, rely on your training, protocols, and qualified medical supervision.
                  </p>
                </div>
                <Link 
                  href="/medical-disclaimer" 
                  className="inline-flex items-center gap-1 text-sm text-red-300 hover:text-red-200 transition-colors"
                >
                  Read Full Disclaimer <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-red-200/90 text-sm leading-relaxed">
                  <strong>Educational Tool Only:</strong> This app supplements EMT training but does not replace 
                  formal education, clinical experience, or medical advice. Always follow local protocols and medical direction.{' '}
                  <Link 
                    href="/medical-disclaimer" 
                    className="text-red-300 hover:text-red-200 transition-colors underline"
                  >
                    Full Disclaimer
                  </Link>
                </p>
              </div>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-red-300 hover:text-red-200 hover:bg-red-900/30 h-8 w-8 p-0 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}