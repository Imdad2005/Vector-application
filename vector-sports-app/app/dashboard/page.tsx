"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap } from "lucide-react"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { PerformanceCharts } from "@/components/dashboard/performance-charts"
import { HeatMap } from "@/components/dashboard/heat-map"
import { AIInsights } from "@/components/dashboard/ai-insights"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { CoachHeader } from "@/components/coach/coach-header"
import { useSelectedAthlete } from "@/context/selected-athlete-context"
import { MainNav } from "@/components/main-nav"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { selectedAthleteId, isCoach } = useSelectedAthlete()

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <KPICards />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PerformanceCharts />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceCharts />
            <HeatMap />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <HeatMap />
              <PerformanceCharts />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <AIInsights />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
