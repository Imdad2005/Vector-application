"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, TrendingDown, Heart, Moon, Zap, Brain } from "lucide-react"

const wellnessTrendData = [
  { date: "Mon", sleep: 7, energy: 6, mood: 8, stress: 4, recovery: 75 },
  { date: "Tue", sleep: 8, energy: 7, mood: 7, stress: 3, recovery: 82 },
  { date: "Wed", sleep: 6, energy: 5, mood: 6, stress: 6, recovery: 68 },
  { date: "Thu", sleep: 7, energy: 6, mood: 7, stress: 4, recovery: 74 },
  { date: "Fri", sleep: 8, energy: 8, mood: 9, stress: 2, recovery: 88 },
  { date: "Sat", sleep: 9, energy: 9, mood: 9, stress: 1, recovery: 92 },
  { date: "Sun", sleep: 8, energy: 7, mood: 8, stress: 3, recovery: 85 },
]

const radarData = [
  { metric: "Sleep", current: 8, baseline: 7 },
  { metric: "Energy", current: 7, baseline: 6 },
  { metric: "Mood", current: 8, baseline: 7 },
  { metric: "Recovery", current: 85, baseline: 75 },
  { metric: "Hydration", current: 7, baseline: 6 },
  { metric: "Soreness", current: 3, baseline: 4 },
]

const weeklyStats = [
  {
    metric: "Average Sleep",
    value: "7.6h",
    change: "+0.4h",
    trend: "up",
    icon: Moon,
    color: "text-purple-600",
  },
  {
    metric: "Energy Level",
    value: "7.1/10",
    change: "+0.8",
    trend: "up",
    icon: Zap,
    color: "text-yellow-600",
  },
  {
    metric: "Mood Score",
    value: "7.7/10",
    change: "+0.3",
    trend: "up",
    icon: Heart,
    color: "text-pink-600",
  },
  {
    metric: "Stress Level",
    value: "3.3/10",
    change: "-0.7",
    trend: "up",
    icon: Brain,
    color: "text-red-600",
  },
]

export function WellnessTrends() {
  return (
    <div className="space-y-6">
      {/* Weekly Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {weeklyStats.map((stat, index) => {
          const Icon = stat.icon
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.metric}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Wellness Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">7-Day Wellness Trends</CardTitle>
          <CardDescription>Track your wellness metrics over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              sleep: {
                label: "Sleep Quality",
                color: "hsl(var(--chart-1))",
              },
              energy: {
                label: "Energy Level",
                color: "hsl(var(--chart-2))",
              },
              mood: {
                label: "Mood",
                color: "hsl(var(--chart-3))",
              },
              stress: {
                label: "Stress Level",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellnessTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                <YAxis domain={[0, 10]} className="text-xs fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recovery Score Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Recovery Score Trend</CardTitle>
            <CardDescription>Your recovery progression over the week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                recovery: {
                  label: "Recovery Score",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={wellnessTrendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                  <YAxis domain={[0, 100]} className="text-xs fill-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="recovery"
                    stroke="hsl(var(--chart-5))"
                    fill="hsl(var(--chart-5))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Wellness Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Wellness Profile</CardTitle>
            <CardDescription>Current vs baseline wellness metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                current: {
                  label: "Current",
                  color: "hsl(var(--chart-1))",
                },
                baseline: {
                  label: "Baseline",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" className="text-xs fill-muted-foreground" />
                  <PolarRadiusAxis domain={[0, 10]} className="text-xs fill-muted-foreground" />
                  <Radar
                    name="Current"
                    dataKey="current"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Baseline"
                    dataKey="baseline"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
