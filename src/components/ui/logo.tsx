import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showSubtext?: boolean
  className?: string
}

export function Logo({ size = 'md', showSubtext = true, className }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl lg:text-3xl',
    md: 'text-4xl lg:text-5xl', 
    lg: 'text-6xl lg:text-7xl',
    xl: 'text-7xl lg:text-8xl'
  }

  const subtextSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <div className={cn("text-center", className)}>
      <h1 className={cn(
        "font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight",
        sizeClasses[size]
      )}>
        ChapterFlash<span className="text-emerald-400">EMT</span>
      </h1>
      {showSubtext && (
        <div className={cn(
          "flex items-center justify-center gap-2 text-white/60 font-medium mt-2",
          subtextSizes[size]
        )}>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-12 lg:w-20"></div>
          <span className="px-2 lg:px-4">ProMedixEMS™</span>
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-12 lg:w-20"></div>
        </div>
      )}
    </div>
  )
}