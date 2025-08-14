"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Users, Repeat } from "lucide-react"

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  event?: any
}

export function EventDialog({ open, onOpenChange, event }: EventDialogProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    type: event?.type || "training",
    date: event?.date || "",
    time: event?.time || "",
    duration: event?.duration || "",
    location: event?.location || "",
    description: event?.description || "",
    participants: event?.participants || "",
    recurring: event?.recurring || "none",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Event data:", formData)
    onOpenChange(false)
  }

  const eventTypes = [
    { value: "training", label: "Training Session", icon: "🏋️" },
    { value: "competition", label: "Competition", icon: "🏆" },
    { value: "recovery", label: "Recovery Session", icon: "🧘" },
    { value: "meeting", label: "Team Meeting", icon: "👥" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            {event ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                required
              />
            </div>

            <div>
              <Label htmlFor="type">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 2h, 90min"
              />
            </div>
          </div>

          {/* Location and Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
              />
            </div>

            <div>
              <Label htmlFor="participants" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants
              </Label>
              <Input
                id="participants"
                value={formData.participants}
                onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                placeholder="Add participants"
              />
            </div>
          </div>

          {/* Recurring */}
          <div>
            <Label htmlFor="recurring" className="flex items-center gap-2">
              <Repeat className="h-4 w-4" />
              Recurring
            </Label>
            <Select
              value={formData.recurring}
              onValueChange={(value) => setFormData({ ...formData, recurring: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select recurrence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No repeat</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add event description, notes, or instructions"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {event ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
