'use client'

import { useState } from 'react'
import { X, Smartphone, Download, Calendar, Star, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AppStoreAnnouncement() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 border-b border-white/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat bg-[length:30px_30px]" 
             style={{
               backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`
             }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-6">
          
          {/* Main Content */}
          <div className="flex items-center gap-6 flex-1">
            
            {/* Icon */}
            <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white">
                  Coming Soon to Mobile!
                </h3>
                <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                  <Calendar className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">2026</span>
                </div>
              </div>
              
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                <strong>ChapterFlashEMT</strong> will be available on the{' '}
                <span className="font-semibold">App Store</span> and{' '}
                <span className="font-semibold">Google Play</span> in early 2026.{' '}
                <span className="hidden sm:inline">
                  Get ready for offline studying, push notifications, and enhanced mobile features!
                </span>
              </p>
              
              {/* Features Preview */}
              <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Offline Mode</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>Enhanced UX</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  <Smartphone className="h-4 w-4" />
                  <span>Native Performance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <p className="text-white/90 text-sm font-medium mb-1">
                Want early access?
              </p>
              <div className="flex items-center gap-2 text-xs text-white/70">
                <ExternalLink className="h-3 w-3" />
                <span>WebConnect360.com</span>
              </div>
            </div>
            
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}