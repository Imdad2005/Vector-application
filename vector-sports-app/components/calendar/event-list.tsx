import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar } from "lucide-react"

const upcomingEvents = [
  {
    id: "1",
    title: "Morning Training",
    type: "training",
    date: "Today",
    time: "08:00",
    location: "Gym A",
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "Recovery Session",
    type: "recovery",
    date: "Today",
    time: "14:00",
    location: "Recovery Room",
    color: "bg-green-500",
  },
  {
    id: "3",
    title: "Team Meeting",
    type: "meeting",
    date: "Tomorrow",
    time: "10:00",
    location: "Conference Room",
    color: "bg-purple-500",
  },
  {
    id: "4",
    title: "Competition Prep",
    type: "training",
    date: "Jan 18",
    time: "09:00",
    location: "Main Gym",
    color: "bg-blue-500",
  },
  {
    id: "5",
    title: "Regional Championship",
    type: "competition",
    date: "Jan 20",
    time: "14:00",
    location: "Sports Complex",
    color: "bg-red-500",
  },
]

export function EventList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <div className={`w-2 h-2 rounded-full ${event.color}`} />
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
          View All Events
        </Button>
      </CardContent>
    </Card>
  )
}
