"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Heart, Activity, Moon, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from "lucide-react"

const recoveryData = {
  overallScore: 78,
  status: "Good",
  recommendation: "Ready for moderate intensity training",
  factors: [
    {
      name: "Heart Rate Variability",
      value: 82,
      status: "excellent",
      trend: "up",
      description: "HRV is above your baseline, indicating good recovery",
    },
    {
      name: "Resting Heart Rate",
      value: 65,
      status: "good",
      trend: "stable",
      description: "RHR is within normal range for your fitness level",
    },
    {
      name: "Sleep Quality",
      value: 75,
      status: "good",
      trend: "up",
      description: "7.5 hours of quality sleep with good deep sleep phases",
    },
    {
      name: "Stress Level",
      value: 45,
      status: "moderate",
      trend: "down",
      description: "Slightly elevated stress may impact recovery",
    },
  ],
  recommendations: [
    {
      type: "training",
      icon: Activity,
      title: "Training Recommendation",
      description: "You're ready for moderate to high intensity training today",
      action: "View Training Plan",
    },
    {
      type: "recovery",
      icon: Heart,
      title: "Recovery Focus",
      description: "Consider 15-20 minutes of light stretching or yoga",
      action: "Start Recovery Session",
    },
    {
      type: "sleep",
      icon: Moon,
      title: "Sleep Optimization",
      description: "Aim for 8+ hours tonight to maintain recovery momentum",
      action: "Set Sleep Reminder",
    },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "text-emerald-600 bg-emerald-100 dark:bg-emerald-900"
    case "good":
      return "text-green-600 bg-green-100 dark:bg-green-900"
    case "moderate":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900"
    case "poor":
      return "text-red-600 bg-red-100 dark:bg-red-900"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900"
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-3 w-3 text-green-600" />
    case "down":
      return <TrendingDown className="h-3 w-3 text-red-600" />
    default:
      return <div className="h-3 w-3 rounded-full bg-gray-400" />
  }
}

export function RecoveryStatus() {
  return (
    <div className="space-y-6">
      {/* Overall Recovery Score */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-600" />
            Recovery Status
          </CardTitle>
          <CardDescription>Your current recovery state based on physiological and wellness data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-4xl font-bold">{recoveryData.overallScore}%</div>
              <div className="text-sm text-muted-foreground">Recovery Score</div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900 mb-2">
                {recoveryData.status}
              </Badge>
              <div className="text-sm text-muted-foreground">{recoveryData.recommendation}</div>
            </div>
          </div>
          <Progress value={recoveryData.overallScore} className="h-3" />
        </CardContent>
      </Card>

      {/* Recovery Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Recovery Factors</CardTitle>
          <CardDescription>Key metrics contributing to your recovery score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recoveryData.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium">{factor.name}</h4>
                    <Badge variant="outline" className={getStatusColor(factor.status)}>
                      {factor.status}
                    </Badge>
                    {getTrendIcon(factor.trend)}
                  </div>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-semibold">{factor.value}</div>
                  <div className="text-xs text-muted-foreground">
                    {factor.name === "Stress Level"
                      ? "stress index"
                      : factor.name === "Resting Heart Rate"
                        ? "bpm"
                        : "score"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="grid md:grid-cols-3 gap-6">
        {recoveryData.recommendations.map((rec, index) => {
          const Icon = rec.icon

          return (
            <Card key={index}>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center">
                  <Icon className="h-5 w-5 mr-2 text-blue-600" />
                  {rec.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  {rec.action}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recovery Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Recovery Timeline
          </CardTitle>
          <CardDescription>Predicted recovery progression over the next 24-48 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Now - Ready for Training</div>
                <div className="text-sm text-muted-foreground">
                  Current recovery state is good for moderate intensity
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Now</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Post-Training Recovery</div>
                <div className="text-sm text-muted-foreground">Recovery score may drop to 60-65% after training</div>
              </div>
              <div className="text-sm text-muted-foreground">+2-4h</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Moon className="h-4 w-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Overnight Recovery</div>
                <div className="text-sm text-muted-foreground">
                  With quality sleep, expect 85-90% recovery by morning
                </div>
              </div>
              <div className="text-sm text-muted-foreground">+12-16h</div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Monitor Stress Levels</div>
                <div className="text-sm text-muted-foreground">
                  Keep stress management practices to maintain recovery
                </div>
              </div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
