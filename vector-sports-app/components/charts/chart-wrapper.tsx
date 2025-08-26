"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import heavy chart components
export const PerformanceCharts = dynamic(
  () => import("@/components/dashboard/performance-charts-heavy").then(mod => ({
    default: mod.PerformanceCharts
  })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-6">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[250px] w-full" />
        <Skeleton className="h-[250px] w-full" />
      </div>
    )
  }
)

export const DeviceAnalytics = dynamic(
  () => import("@/components/devices/device-analytics-heavy").then(mod => ({
    default: mod.DeviceAnalytics
  })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />
  }
)

export const SleepAnalysis = dynamic(
  () => import("@/components/wellness/sleep-analysis-heavy").then(mod => ({
    default: mod.SleepAnalysis
  })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)
