"use client"

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SwipeIndicatorProps {
  className?: string
  show?: boolean
}

export function SwipeIndicator({ className, show = true }: SwipeIndicatorProps) {
  const [isVisible, setIsVisible] = useState(show)

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000) // Hide after 3 seconds
      
      return () => clearTimeout(timer)
    }
  }, [show])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 sm:hidden",
      "bg-background/90 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg",
      "flex items-center gap-2 text-sm text-muted-foreground",
      "animate-bounce",
      className
    )}>
      <ChevronLeft className="h-4 w-4" />
      <span>Swipe to navigate</span>
      <ChevronRight className="h-4 w-4" />
    </div>
  )
}