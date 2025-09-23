"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollSpyTabs, ScrollSpyTabsList, ScrollSpyTabsTrigger, ScrollSpyTabsContent } from "@/components/ui/scroll-spy-tabs"
import { SwipeIndicator } from "@/components/ui/swipe-indicator"
import { useScrollSpyTabs } from "@/hooks/use-scroll-spy-tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { CoachHeader } from "@/components/coach/coach-header"
import { useSelectedAthlete } from "@/context/selected-athlete-context"
import { MainNav } from "@/components/main-nav"
import { EMGDashboard } from "@/components/emg/emg-dashboard"

// Dynamically import heavy components
const PerformanceCharts = dynamic(
  () => import("@/components/dashboard/performance-charts").then(mod => ({ default: mod.PerformanceCharts })),
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

const HeatMap = dynamic(
  () => import("@/components/dashboard/heat-map").then(mod => ({ default: mod.HeatMap })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)

const AIInsights = dynamic(
  () => import("@/components/dashboard/ai-insights").then(mod => ({ default: mod.AIInsights })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />
  }
)

const RecentActivity = dynamic(
  () => import("@/components/dashboard/recent-activity").then(mod => ({ default: mod.RecentActivity })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)

const WeeklyGoalChart = dynamic(
  () => import("@/components/dashboard/weekly-goal-chart").then(mod => ({ default: mod.WeeklyGoalChart })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)

export default function DashboardPage() {
  const { selectedAthleteId, isCoach } = useSelectedAthlete()
  
  // Define tab order for scroll spy
  const tabOrder = ['overview', 'emg', 'performance', 'analytics', 'insights']
  
  const {
    activeTab,
    setActiveTab,
    handleSwipe,
    currentIndex,
    totalTabs,
    isFirstTab,
    isLastTab
  } = useScrollSpyTabs({
    tabs: tabOrder,
    defaultTab: 'overview'
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Display CoachHeader for coaches, standard MainNav for athletes */}
      {isCoach ? <CoachHeader /> : <MainNav />}

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold mb-2">Performance Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress, monitor key metrics, and get AI-powered insights to optimize your training.
          </p>
        </div>

        {/* Mobile: Show navigation arrows and indicator */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSwipe('right')}
            disabled={isFirstTab}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalTabs}
            </div>
            {/* Dot indicators */}
            <div className="flex gap-1">
              {tabOrder.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSwipe('left')}
            disabled={isLastTab}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <ScrollSpyTabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <ScrollSpyTabsList>
            <ScrollSpyTabsTrigger value="overview">
              <span className="hidden sm:inline">Overview</span>
              <span className="sm:hidden">Home</span>
            </ScrollSpyTabsTrigger>
            <ScrollSpyTabsTrigger value="emg">
              <span className="hidden sm:inline">EMG Sensor</span>
              <span className="sm:hidden">EMG</span>
            </ScrollSpyTabsTrigger>
            <ScrollSpyTabsTrigger value="performance">
              <span className="hidden sm:inline">Performance</span>
              <span className="sm:hidden">Perf</span>
            </ScrollSpyTabsTrigger>
            <ScrollSpyTabsTrigger value="analytics">
              <span className="hidden sm:inline">Analytics</span>
              <span className="sm:hidden">Stats</span>
            </ScrollSpyTabsTrigger>
            <ScrollSpyTabsTrigger value="insights">
              <span className="hidden sm:inline">AI Insights</span>
              <span className="sm:hidden">AI</span>
            </ScrollSpyTabsTrigger>
          </ScrollSpyTabsList>

          <ScrollSpyTabsContent value="overview" onSwipe={handleSwipe} className="space-y-6">
            <KPICards />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left side - Weekly Goal Progress Chart */}
              <div className="lg:col-span-5">
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <WeeklyGoalChart />
                </Suspense>
              </div>
              
              {/* Right side - Recent Activity and other content */}
              <div className="lg:col-span-7 space-y-6">
                <RecentActivity />
                
                {/* Performance metrics cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground">This Week</h3>
                      <div className="text-2xl font-bold">7 Sessions</div>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <span className="text-xs">↗</span>
                        +2 from last week
                      </p>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm text-muted-foreground">Average Load</h3>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-sm text-blue-600 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Optimal range
                      </p>
                    </div>
                  </Card>
                </div>

                {/* Quick actions */}
                <Card className="p-4">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-3">Quick Actions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Start Session
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      View Report
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Sync Devices
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </ScrollSpyTabsContent>

          <ScrollSpyTabsContent value="emg" onSwipe={handleSwipe} className="space-y-6">
            <EMGDashboard />
          </ScrollSpyTabsContent>

          <ScrollSpyTabsContent value="analytics" onSwipe={handleSwipe} className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="order-2 xl:order-1">
                <HeatMap />
              </div>
              <div className="order-1 xl:order-2">
                <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
                  <WeeklyGoalChart />
                </Suspense>
              </div>
            </div>
            <div className="mt-6">
              <PerformanceCharts />
            </div>
          </ScrollSpyTabsContent>

          <ScrollSpyTabsContent value="insights" onSwipe={handleSwipe} className="space-y-6">
            <AIInsights />
          </ScrollSpyTabsContent>
        </ScrollSpyTabs>

        {/* Swipe indicator for first-time users */}
        <SwipeIndicator show={currentIndex === 0} />
      </main>
    </div>
  )
}
