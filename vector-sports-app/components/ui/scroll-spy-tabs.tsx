"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const ScrollSpyTabs = TabsPrimitive.Root

const ScrollSpyTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const listRef = useRef<HTMLDivElement>(null)
  
  // Scroll active tab into view
  useEffect(() => {
    const activeTab = listRef.current?.querySelector('[data-state="active"]')
    if (activeTab && listRef.current) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={(node) => {
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
        listRef.current = node
      }}
      className={cn(
        "inline-flex h-auto items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-full overflow-x-auto scrollbar-hide mobile-tabs-list scroll-spy-tabs",
        "gap-1 flex-nowrap",
        "sm:justify-center sm:grid sm:grid-cols-5",
        className
      )}
      {...props}
    />
  )
})
ScrollSpyTabsList.displayName = TabsPrimitive.List.displayName

const ScrollSpyTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-3 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:font-semibold",
      "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:font-medium",
      "sm:text-sm sm:px-3 sm:py-2 sm:flex-1",
      "min-w-[80px] flex-shrink-0",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
))
ScrollSpyTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

interface ScrollSpyTabsContentProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
  onSwipe?: (direction: 'left' | 'right') => void
}

const ScrollSpyTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  ScrollSpyTabsContentProps
>(({ className, onSwipe, ...props }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipe) {
      onSwipe('left')
    }
    if (isRightSwipe && onSwipe) {
      onSwipe('right')
    }
  }

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "touch-pan-y swipe-content", // Allow vertical scrolling but capture horizontal swipes
        className
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      {...props}
    />
  )
})
ScrollSpyTabsContent.displayName = TabsPrimitive.Content.displayName

export { ScrollSpyTabs, ScrollSpyTabsList, ScrollSpyTabsTrigger, ScrollSpyTabsContent }