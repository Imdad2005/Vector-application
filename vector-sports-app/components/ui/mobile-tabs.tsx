"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

const MobileTabs = TabsPrimitive.Root

const MobileTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-auto items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground w-full overflow-x-auto scrollbar-hide mobile-tabs-list",
      "gap-1 grid-cols-2 sm:grid-cols-5 grid",
      className
    )}
    {...props}
  />
))
MobileTabsList.displayName = TabsPrimitive.List.displayName

const MobileTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-3 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mobile-tab-trigger",
      "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:font-semibold",
      "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground data-[state=inactive]:font-medium",
      "sm:text-sm sm:px-3 sm:py-2",
      "min-w-0 flex-1 text-center",
      className
    )}
    {...props}
  >
    {children}
  </TabsPrimitive.Trigger>
))
MobileTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const MobileTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
MobileTabsContent.displayName = TabsPrimitive.Content.displayName

export { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent }