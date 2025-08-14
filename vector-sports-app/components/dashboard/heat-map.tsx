"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const heatMapData = [
  { day: "Mon", hours: [0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 0] },
  { day: "Tue", hours: [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0] },
  { day: "Wed", hours: [0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0] },
  { day: "Thu", hours: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 0, 0, 0] },
  { day: "Fri", hours: [0, 0, 0, 0, 0, 0, 2, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0] },
  { day: "Sat", hours: [0, 0, 0, 0, 0, 0, 0, 1, 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0] },
  { day: "Sun", hours: [0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
]

const getIntensityColor = (value: number) => {
  if (value === 0) return "bg-muted"
  if (value === 1) return "bg-green-200 dark:bg-green-900"
  if (value === 2) return "bg-green-400 dark:bg-green-700"
  if (value === 3) return "bg-green-600 dark:bg-green-500"
  return "bg-muted"
}

const getIntensityLabel = (value: number) => {
  if (value === 0) return "No activity"
  if (value === 1) return "Light activity"
  if (value === 2) return "Moderate activity"
  if (value === 3) return "High intensity"
  return "No activity"
}

export function HeatMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Activity Heat Map</CardTitle>
        <CardDescription>Training intensity patterns throughout the week (hourly breakdown)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Less</span>
            <div className="flex items-center space-x-1">
              {[0, 1, 2, 3].map((intensity) => (
                <div
                  key={intensity}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)}`}
                  title={getIntensityLabel(intensity)}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">More</span>
          </div>

          {/* Heat Map Grid */}
          <div className="space-y-1">
            {heatMapData.map((dayData, dayIndex) => (
              <div key={dayData.day} className="flex items-center space-x-2">
                <div className="w-12 text-xs text-muted-foreground font-medium">{dayData.day}</div>
                <div className="flex space-x-1">
                  {dayData.hours.map((intensity, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)} hover:ring-2 hover:ring-blue-500 cursor-pointer transition-all`}
                      title={`${dayData.day} ${hourIndex}:00 - ${getIntensityLabel(intensity)}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Time Labels */}
          <div className="flex items-center space-x-2">
            <div className="w-12"></div>
            <div className="flex justify-between text-xs text-muted-foreground w-full">
              <span>0</span>
              <span>6</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">28</div>
              <div className="text-xs text-muted-foreground">Active Hours</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">6.2</div>
              <div className="text-xs text-muted-foreground">Avg Intensity</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">85%</div>
              <div className="text-xs text-muted-foreground">Consistency</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
