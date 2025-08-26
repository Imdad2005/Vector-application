"use client"

import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Lazy load heavy chart components
export const LazyPerformanceCharts = lazy(() => 
  import('@/components/dashboard/performance-charts').then(module => ({
    default: module.PerformanceCharts
  }))
)

export const LazyDeviceAnalytics = lazy(() => 
  import('@/components/devices/device-analytics').then(module => ({
    default: module.DeviceAnalytics
  }))
)

export const LazySleepAnalysis = lazy(() => 
  import('@/components/wellness/sleep-analysis').then(module => ({
    default: module.SleepAnalysis
  }))
)

// Wrapper components with proper loading states
export function PerformanceChartsWithSuspense() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <Skeleton className="h-[400px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    }>
      <LazyPerformanceCharts />
    </Suspense>
  )
}

export function DeviceAnalyticsWithSuspense() {
  return (
    <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
      <LazyDeviceAnalytics />
    </Suspense>
  )
}

export function SleepAnalysisWithSuspense() {
  return (
    <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
      <LazySleepAnalysis />
    </Suspense>
  )
}
