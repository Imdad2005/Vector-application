"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter, Download, Heart, Moon, Zap, Brain } from "lucide-react"
import { format } from "date-fns"

const wellnessHistory = [
  {
    date: "2024-01-15",
    overallScore: 8.2,
    sleep: 8,
    energy: 7,
    mood: 9,
    stress: 2,
    notes: "Great training day, felt very energetic and motivated",
    recovery: 85,
  },
  {
    date: "2024-01-14",
    overallScore: 7.5,
    sleep: 7,
    energy: 8,
    mood: 8,
    stress: 3,
    notes: "Good sleep quality, ready for tomorrow's workout",
    recovery: 78,
  },
  {
    date: "2024-01-13",
    overallScore: 6.8,
    sleep: 6,
    energy: 6,
    mood: 7,
    stress: 5,
    notes: "Feeling a bit tired, might need extra recovery time",
    recovery: 72,
  },
  {
    date: "2024-01-12",
    overallScore: 7.8,
    sleep: 8,
    energy: 7,
    mood: 8,
    stress: 3,
    notes: "Solid day overall, good balance of training and rest",
    recovery: 82,
  },
  {
    date: "2024-01-11",
    overallScore: 9.1,
    sleep: 9,
    energy: 9,
    mood: 9,
    stress: 1,
    notes: "Perfect day! Felt amazing, great workout and recovery",
    recovery: 92,
  },
  {
    date: "2024-01-10",
    overallScore: 7.2,
    sleep: 7,
    energy: 7,
    mood: 7,
    stress: 4,
    notes: "Average day, some work stress but managed well",
    recovery: 75,
  },
  {
    date: "2024-01-09",
    overallScore: 6.5,
    sleep: 6,
    energy: 5,
    mood: 6,
    stress: 6,
    notes: "Tough day, didn't sleep well and felt low energy",
    recovery: 68,
  },
]

const getScoreColor = (score: number) => {
  if (score >= 8.5) return "text-emerald-600 bg-emerald-100 dark:bg-emerald-900"
  if (score >= 7.5) return "text-green-600 bg-green-100 dark:bg-green-900"
  if (score >= 6.5) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900"
  if (score >= 5.5) return "text-orange-600 bg-orange-100 dark:bg-orange-900"
  return "text-red-600 bg-red-100 dark:bg-red-900"
}

const getScoreLabel = (score: number) => {
  if (score >= 8.5) return "Excellent"
  if (score >= 7.5) return "Good"
  if (score >= 6.5) return "Fair"
  if (score >= 5.5) return "Poor"
  return "Very Poor"
}

export function WellnessHistory() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [filteredData, setFilteredData] = useState(wellnessHistory)

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Exporting wellness data...")
  }

  return (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Wellness History</CardTitle>
          <CardDescription>View and analyze your historical wellness check-ins</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Button variant="outline" onClick={handleExport} className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Timeline */}
      <div className="space-y-4">
        {filteredData.map((entry, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{format(new Date(entry.date), "EEEE, MMMM d")}</h3>
                    <Badge variant="secondary" className={getScoreColor(entry.overallScore)}>
                      {entry.overallScore}/10 • {getScoreLabel(entry.overallScore)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">Recovery Score: {entry.recovery}%</div>
                </div>
                <div className="text-sm text-muted-foreground">{format(new Date(entry.date), "MMM d, yyyy")}</div>
              </div>

              {/* Wellness Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Moon className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium">Sleep</div>
                    <div className="text-xs text-muted-foreground">{entry.sleep}/10</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <div>
                    <div className="text-sm font-medium">Energy</div>
                    <div className="text-xs text-muted-foreground">{entry.energy}/10</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-pink-600" />
                  <div>
                    <div className="text-sm font-medium">Mood</div>
                    <div className="text-xs text-muted-foreground">{entry.mood}/10</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-sm font-medium">Stress</div>
                    <div className="text-xs text-muted-foreground">{entry.stress}/10</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {entry.notes && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="text-sm font-medium mb-1">Notes</div>
                  <div className="text-sm text-muted-foreground">{entry.notes}</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="bg-transparent">
          Load More Entries
        </Button>
      </div>
    </div>
  )
}
