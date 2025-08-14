"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Moon, Clock, TrendingUp, AlertCircle } from "lucide-react"

const sleepData = [
  { date: "Mon", duration: 7.2, deep: 1.8, rem: 1.4, light: 4.0, quality: 75 },
  { date: "Tue", duration: 8.1, deep: 2.1, rem: 1.6, light: 4.4, quality: 85 },
  { date: "Wed", duration: 6.5, deep: 1.3, rem: 1.1, light: 4.1, quality: 65 },
  { date: "Thu", duration: 7.8, deep: 1.9, rem: 1.5, light: 4.4, quality: 80 },
  { date: "Fri", duration: 8.3, deep: 2.2, rem: 1.7, light: 4.4, quality: 88 },
  { date: "Sat", duration: 9.1, deep: 2.4, rem: 1.8, light: 4.9, quality: 92 },
  { date: "Sun", duration: 8.0, deep: 2.0, rem: 1.6, light: 4.4, quality: 82 },
]

const lastNightSleep = {
  bedtime: "22:30",
  wakeTime: "06:30",
  duration: 8.0,
  efficiency: 87,
  phases: [
    { name: "Deep Sleep", value: 2.0, color: "#3b82f6", percentage: 25 },
    { name: "REM Sleep", value: 1.6, color: "#8b5cf6", percentage: 20 },
    { name: "Light Sleep", value: 4.4, color: "#06b6d4", percentage: 55 },
  ],
  insights: [
    {
      type: "positive",
      title: "Excellent Deep Sleep",
      description: "You achieved 25% deep sleep, which is above the recommended 20-25%",
    },
    {
      type: "neutral",
      title: "Consistent Bedtime",
      description: "You've maintained a consistent bedtime for 5 consecutive days",
    },
    {
      type: "warning",
      title: "Late Weekend Sleep",
      description: "Weekend sleep schedule shifted by 1.5 hours - try to maintain consistency",
    },
  ],
}

const sleepGoals = [
  { metric: "Duration", current: 8.0, target: 8.0, unit: "hours" },
  { metric: "Efficiency", current: 87, target: 85, unit: "%" },
  { metric: "Deep Sleep", current: 25, target: 22, unit: "%" },
  { metric: "Consistency", current: 78, target: 85, unit: "%" },
]

export function SleepAnalysis() {
  return (
    <div className="space-y-6">
      {/* Last Night Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Moon className="h-5 w-5 mr-2 text-purple-600" />
            Last Night's Sleep
          </CardTitle>
          <CardDescription>
            {lastNightSleep.bedtime} - {lastNightSleep.wakeTime} • {lastNightSleep.duration} hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sleep Phases Pie Chart */}
            <div>
              <h4 className="font-medium mb-4">Sleep Phases</h4>
              <ChartContainer
                config={{
                  deep: { label: "Deep Sleep", color: "#3b82f6" },
                  rem: { label: "REM Sleep", color: "#8b5cf6" },
                  light: { label: "Light Sleep", color: "#06b6d4" },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={lastNightSleep.phases}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {lastNightSleep.phases.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            {/* Sleep Metrics */}
            <div className="space-y-4">
              {lastNightSleep.phases.map((phase, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: phase.color }} />
                    <span className="text-sm font-medium">{phase.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{phase.value}h</div>
                    <div className="text-xs text-muted-foreground">{phase.percentage}%</div>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sleep Efficiency</span>
                  <span className="text-sm font-semibold">{lastNightSleep.efficiency}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Sleep Goals</CardTitle>
          <CardDescription>Track your progress towards optimal sleep metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {sleepGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{goal.metric}</span>
                  <span className="text-sm text-muted-foreground">
                    {goal.current}
                    {goal.unit} / {goal.target}
                    {goal.unit}
                  </span>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Target: {goal.target}
                    {goal.unit}
                  </span>
                  <Badge variant={goal.current >= goal.target ? "default" : "secondary"}>
                    {goal.current >= goal.target ? "Goal Met" : "In Progress"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Sleep Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">7-Day Sleep Pattern</CardTitle>
          <CardDescription>Sleep duration and quality over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              duration: {
                label: "Sleep Duration (hours)",
                color: "hsl(var(--chart-1))",
              },
              quality: {
                label: "Sleep Quality (%)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs fill-muted-foreground" />
                <YAxis yAxisId="left" className="text-xs fill-muted-foreground" />
                <YAxis yAxisId="right" orientation="right" className="text-xs fill-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar yAxisId="left" dataKey="duration" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="quality" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Sleep Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Sleep Insights</CardTitle>
          <CardDescription>Personalized recommendations based on your sleep patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lastNightSleep.insights.map((insight, index) => {
              const getIcon = () => {
                switch (insight.type) {
                  case "positive":
                    return <TrendingUp className="h-4 w-4 text-green-600" />
                  case "warning":
                    return <AlertCircle className="h-4 w-4 text-yellow-600" />
                  default:
                    return <Clock className="h-4 w-4 text-blue-600" />
                }
              }

              const getBgColor = () => {
                switch (insight.type) {
                  case "positive":
                    return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                  case "warning":
                    return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800"
                  default:
                    return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
                }
              }

              return (
                <div key={index} className={`p-4 rounded-lg border ${getBgColor()}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
