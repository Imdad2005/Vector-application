"use client"

import { useState } from "react"

interface Event {
  id: string
  title: string
  type: "training" | "competition" | "recovery" | "meeting"
  time: string
  duration?: string
  location?: string
}

interface CalendarGridProps {
  currentDate: Date
  view: "month" | "week" | "day"
  selectedFilters: string[]
  onEventClick: (event?: Event) => void
}

const mockEvents: Record<string, Event[]> = {
  "2024-01-15": [
    { id: "1", title: "Morning Training", type: "training", time: "08:00", duration: "2h", location: "Gym A" },
    { id: "2", title: "Recovery Session", type: "recovery", time: "14:00", duration: "1h" },
  ],
  "2024-01-16": [{ id: "3", title: "Team Meeting", type: "meeting", time: "10:00", duration: "1h" }],
  "2024-01-18": [{ id: "4", title: "Competition Prep", type: "training", time: "09:00", duration: "3h" }],
  "2024-01-20": [
    {
      id: "5",
      title: "Regional Championship",
      type: "competition",
      time: "14:00",
      duration: "4h",
      location: "Sports Complex",
    },
  ],
  "2024-01-22": [
    { id: "6", title: "Strength Training", type: "training", time: "07:00", duration: "1.5h" },
    { id: "7", title: "Nutrition Consultation", type: "meeting", time: "16:00", duration: "45min" },
  ],
}

const eventTypeColors = {
  training: "bg-blue-500 text-white",
  competition: "bg-red-500 text-white",
  recovery: "bg-green-500 text-white",
  meeting: "bg-purple-500 text-white",
}

export function CalendarGrid({ currentDate, view, selectedFilters, onEventClick }: CalendarGridProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getEventsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    const events = mockEvents[dateKey] || []

    if (selectedFilters.length === 0) return events
    return events.filter((event) => selectedFilters.includes(event.type))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }

  if (view === "month") {
    const days = getDaysInMonth(currentDate)
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="space-y-4">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => (
            <div
              key={index}
              className={`min-h-[100px] p-2 border rounded-lg cursor-pointer transition-colors ${
                date
                  ? isToday(date)
                    ? "bg-blue-50 border-blue-200"
                    : isSelected(date)
                      ? "bg-gray-100 border-gray-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  : "bg-gray-50 border-gray-100"
              }`}
              onClick={() => date && setSelectedDate(date)}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium mb-1 ${isToday(date) ? "text-blue-600" : "text-gray-900"}`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {getEventsForDate(date)
                      .slice(0, 2)
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-2 py-1 rounded text-center cursor-pointer ${
                            eventTypeColors[event.type]
                          }`}
                          onClick={(e) => {
                            e.stopPropagation()
                            onEventClick(event)
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                    {getEventsForDate(date).length > 2 && (
                      <div className="text-xs text-gray-500 text-center">+{getEventsForDate(date).length - 2} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Week and Day views would be implemented similarly
  return (
    <div className="text-center py-8 text-gray-500">
      {view.charAt(0).toUpperCase() + view.slice(1)} view coming soon
    </div>
  )
}
