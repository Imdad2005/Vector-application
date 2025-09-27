"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarGrid } from "@/components/calendar/calendar-grid"
import { EventDialog } from "@/components/calendar/event-dialog"
import { EventList } from "@/components/calendar/event-list"
import { CalendarIcon, Plus, Filter, ChevronLeft, ChevronRight, X, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"

const eventTypes = [
  { id: "training", label: "Training", color: "bg-blue-500", count: 12 },
  { id: "competition", label: "Competition", color: "bg-red-500", count: 3 },
  { id: "recovery", label: "Recovery", color: "bg-green-500", count: 8 },
  { id: "meeting", label: "Meeting", color: "bg-purple-500", count: 5 },
]

export default function CalendarPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const toggleFilter = (eventType: string) => {
    setSelectedFilters((prev) =>
      prev.includes(eventType) ? prev.filter((f) => f !== eventType) : [...prev, eventType],
    )
  }

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

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
              <Button 
                variant="destructive" 
                onClick={() => router.push('/dashboard')}
                size="sm"
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <CalendarIcon className="h-6 w-6  bg-blue-600 rounded-lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Calendar & Scheduling</h1>
              <p className="text-muted-foreground">Manage your training schedule and events</p>
            </div>
          </div>
          
          <div className="flex gap-2 items-center">
            <Button onClick={() => setShowEventDialog(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Event Type Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Event Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {eventTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedFilters.includes(type.id) ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleFilter(type.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${type.color}`} />
                      <span className="text-sm font-medium">{type.label}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {type.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <EventList />
          </div>

          {/* Main Calendar */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h2 className="text-xl font-semibold min-w-[200px] text-center">{monthYear}</h2>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {(["month", "week", "day"] as const).map((viewType) => (
                      <Button
                        key={viewType}
                        variant={view === viewType ? "default" : "outline"}
                        size="sm"
                        onClick={() => setView(viewType)}
                        className={view === viewType ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CalendarGrid
                  currentDate={currentDate}
                  view={view}
                  selectedFilters={selectedFilters}
                  onEventClick={() => setShowEventDialog(true)}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <EventDialog open={showEventDialog} onOpenChange={setShowEventDialog} />
    </div>
  )
}
