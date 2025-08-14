"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Heart, Moon, Zap, Brain, Droplets, Scale, CheckCircle } from "lucide-react"

interface WellnessMetric {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  value: number[]
  description: string
  color: string
}

interface DailyCheckInProps {
  onCheckInComplete: () => void
}

export function DailyCheckIn({ onCheckInComplete }: DailyCheckInProps) {
  const [metrics, setMetrics] = useState<WellnessMetric[]>([
    {
      id: "sleep",
      label: "Sleep Quality",
      icon: Moon,
      value: [7],
      description: "How well did you sleep last night?",
      color: "text-purple-600",
    },
    {
      id: "energy",
      label: "Energy Level",
      icon: Zap,
      value: [6],
      description: "How energetic do you feel today?",
      color: "text-yellow-600",
    },
    {
      id: "mood",
      label: "Mood",
      icon: Heart,
      value: [8],
      description: "How is your overall mood?",
      color: "text-pink-600",
    },
    {
      id: "stress",
      label: "Stress Level",
      icon: Brain,
      value: [4],
      description: "How stressed do you feel?",
      color: "text-red-600",
    },
    {
      id: "hydration",
      label: "Hydration",
      icon: Droplets,
      value: [7],
      description: "How well hydrated do you feel?",
      color: "text-blue-600",
    },
    {
      id: "soreness",
      label: "Muscle Soreness",
      icon: Scale,
      value: [3],
      description: "Rate your overall muscle soreness",
      color: "text-orange-600",
    },
  ])

  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateMetric = (id: string, value: number[]) => {
    setMetrics((prev) => prev.map((metric) => (metric.id === id ? { ...metric, value } : metric)))
  }

  const getScoreLabel = (value: number, isReverse = false) => {
    if (isReverse) {
      if (value <= 2) return "Excellent"
      if (value <= 4) return "Good"
      if (value <= 6) return "Fair"
      if (value <= 8) return "Poor"
      return "Very Poor"
    } else {
      if (value <= 2) return "Very Poor"
      if (value <= 4) return "Poor"
      if (value <= 6) return "Fair"
      if (value <= 8) return "Good"
      return "Excellent"
    }
  }

  const getScoreColor = (value: number, isReverse = false) => {
    const score = isReverse ? 10 - value : value
    if (score <= 2) return "text-red-600"
    if (score <= 4) return "text-orange-600"
    if (score <= 6) return "text-yellow-600"
    if (score <= 8) return "text-green-600"
    return "text-emerald-600"
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onCheckInComplete()
  }

  const overallScore = Math.round(
    metrics.reduce((acc, metric) => {
      const value = metric.id === "stress" || metric.id === "soreness" ? 10 - metric.value[0] : metric.value[0]
      return acc + value
    }, 0) / metrics.length,
  )

  return (
    <div className="space-y-6">
      {/* Overall Wellness Score */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Heart className="h-5 w-5 mr-2 text-pink-600" />
            Today's Wellness Check-In
          </CardTitle>
          <CardDescription>Rate how you're feeling across different wellness dimensions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold">{overallScore}/10</div>
              <div className="text-sm text-muted-foreground">Overall Wellness Score</div>
            </div>
            <Badge variant="secondary" className={getScoreColor(overallScore)}>
              {getScoreLabel(overallScore)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isReverse = metric.id === "stress" || metric.id === "soreness"

          return (
            <Card key={metric.id}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Icon className={`h-5 w-5 mr-2 ${metric.color}`} />
                  {metric.label}
                </CardTitle>
                <CardDescription>{metric.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value[0]}/10</span>
                  <Badge variant="outline" className={getScoreColor(metric.value[0], isReverse)}>
                    {getScoreLabel(metric.value[0], isReverse)}
                  </Badge>
                </div>
                <Slider
                  value={metric.value}
                  onValueChange={(value) => updateMetric(metric.id, value)}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{isReverse ? "None" : "Very Poor"}</span>
                  <span>{isReverse ? "Extreme" : "Excellent"}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Additional Notes</CardTitle>
          <CardDescription>Any additional observations about your wellness today?</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="How are you feeling today? Any specific concerns or observations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700 px-8">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving Check-In...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Check-In
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
