import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, MapPin, Zap, Heart, Target } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    type: "run",
    title: "Morning Run",
    duration: "45m 32s",
    distance: "8.2 km",
    location: "Central Park",
    intensity: "moderate",
    time: "2 hours ago",
    stats: {
      avgPace: "5:32/km",
      avgHR: "152 bpm",
      calories: 420,
    },
  },
  {
    id: 2,
    type: "strength",
    title: "Upper Body Strength",
    duration: "1h 15m",
    location: "Home Gym",
    intensity: "high",
    time: "Yesterday",
    stats: {
      sets: 12,
      reps: 180,
      weight: "2,450 kg",
    },
  },
  {
    id: 3,
    type: "bike",
    title: "Interval Training",
    duration: "1h 8m",
    distance: "32.5 km",
    location: "Riverside Trail",
    intensity: "high",
    time: "2 days ago",
    stats: {
      avgPower: "285W",
      maxPower: "420W",
      calories: 680,
    },
  },
  {
    id: 4,
    type: "recovery",
    title: "Active Recovery",
    duration: "30m",
    location: "Home",
    intensity: "low",
    time: "3 days ago",
    stats: {
      stretching: "15m",
      meditation: "10m",
      mobility: "5m",
    },
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "run":
      return Activity
    case "bike":
      return Zap
    case "strength":
      return Target
    case "recovery":
      return Heart
    default:
      return Activity
  }
}

const getIntensityColor = (intensity: string) => {
  switch (intensity) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "moderate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Recent Activities</CardTitle>
        <CardDescription>Your latest training sessions and workouts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const Icon = getActivityIcon(activity.type)

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <Badge variant="secondary" className={`text-xs ${getIntensityColor(activity.intensity)}`}>
                      {activity.intensity}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.duration}
                    </div>
                    {activity.distance && <div>{activity.distance}</div>}
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {activity.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs">
                      {Object.entries(activity.stats).map(([key, value], index) => (
                        <span key={index} className="text-muted-foreground">
                          <span className="font-medium">{value}</span> {key}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
