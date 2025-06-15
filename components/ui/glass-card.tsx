import { cn } from '@/lib/cn'
import { HTMLAttributes, forwardRef } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  blur?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, blur = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-white/70 dark:bg-gray-900/70',
          'border border-white/20 dark:border-gray-800/20',
          'shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]',
          blur && 'backdrop-blur-md',
          'transition-all duration-300',
          'hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.45)]',
          'hover:bg-white/80 dark:hover:bg-gray-900/80',
          className
        )}
        {...props}
      />
    )
  }
)

GlassCard.displayName = 'GlassCard'