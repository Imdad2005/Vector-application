"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap, Plus } from "lucide-react"
import { DailyCheckIn } from "@/components/wellness/daily-check-in"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"

// Dynamically import heavy wellness components
const WellnessTrends = dynamic(
  () => import("@/components/wellness/wellness-trends").then(mod => ({ default: mod.WellnessTrends })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />
  }
)

const RecoveryStatus = dynamic(
  () => import("@/components/wellness/recovery-status").then(mod => ({ default: mod.RecoveryStatus })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[250px] w-full" />
  }
)

const WellnessHistory = dynamic(
  () => import("@/components/wellness/wellness-history").then(mod => ({ default: mod.WellnessHistory })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)

const SleepAnalysis = dynamic(
  () => import("@/components/wellness/sleep-analysis").then(mod => ({ default: mod.SleepAnalysis })),
  { 
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />
  }
)

export default function WellnessPage() {
  const [activeTab, setActiveTab] = useState("checkin")
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">Vector</span>
            </div>

            <MainNav />

            <div className="flex items-center space-x-4">
              {/* Theme toggle is now inside MainNav */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold mb-2">Wellness Center</h1>
              <p className="text-muted-foreground">
                Monitor your recovery, track daily wellness metrics, and optimize your training readiness.
              </p>
            </div>
            {!hasCheckedInToday && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Daily Check-In
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="checkin">Check-In</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="checkin" className="space-y-6">
            <DailyCheckIn onCheckInComplete={() => setHasCheckedInToday(true)} />
          </TabsContent>

          <TabsContent value="recovery" className="space-y-6">
            <RecoveryStatus />
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <WellnessTrends />
          </TabsContent>

          <TabsContent value="sleep" className="space-y-6">
            <SleepAnalysis />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <WellnessHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
