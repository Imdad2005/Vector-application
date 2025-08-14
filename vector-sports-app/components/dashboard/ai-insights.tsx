import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Clock, Target, Lightbulb, ArrowRight } from "lucide-react"

const insights = [
  {
    type: "recommendation",
    priority: "high",
    icon: Brain,
    title: "Optimize Recovery Window",
    description:
      "Your heart rate variability suggests you need 2-3 additional recovery hours between high-intensity sessions.",
    action: "Adjust Schedule",
    confidence: 92,
  },
  {
    type: "prediction",
    priority: "medium",
    icon: TrendingUp,
    title: "Performance Peak Forecast",
    description: "Based on current trends, you're likely to achieve a new power output PR within the next 10-14 days.",
    action: "View Details",
    confidence: 87,
  },
  {
    type: "warning",
    priority: "high",
    icon: AlertTriangle,
    title: "Overtraining Risk Detected",
    description: "Training load has increased 23% over the past week. Consider reducing intensity to prevent burnout.",
    action: "Modify Plan",
    confidence: 95,
  },
  {
    type: "achievement",
    priority: "low",
    icon: CheckCircle,
    title: "Consistency Milestone",
    description: "You've maintained your training schedule for 4 consecutive weeks. Great job staying on track!",
    action: "Share Progress",
    confidence: 100,
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "recommendation":
      return Brain
    case "prediction":
      return TrendingUp
    case "warning":
      return AlertTriangle
    case "achievement":
      return CheckCircle
    default:
      return Lightbulb
  }
}

export function AIInsights() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
          <CardDescription>Personalized recommendations and predictions based on your performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {insights.map((insight, index) => {
              const Icon = getTypeIcon(insight.type)

              return (
                <Card key={index} className="border-l-4 border-l-blue-600">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-sm">{insight.title}</h4>
                            <Badge variant="secondary" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                              {insight.priority}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            {insight.action}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance Predictions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-600" />
              Goal Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">5K Personal Best</div>
                <div className="text-xs text-muted-foreground">Current: 22:45</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">21:58</div>
                <div className="text-xs text-muted-foreground">in 3-4 weeks</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">FTP Threshold</div>
                <div className="text-xs text-muted-foreground">Current: 285W</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">295W</div>
                <div className="text-xs text-muted-foreground">in 2-3 weeks</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Marathon Goal</div>
                <div className="text-xs text-muted-foreground">Target: 3:30:00</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-orange-600">3:28:15</div>
                <div className="text-xs text-muted-foreground">in 8-10 weeks</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-600" />
              Optimal Training Times
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Intensity</span>
                <Badge variant="secondary">6:00 - 8:00 AM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Endurance</span>
                <Badge variant="secondary">4:00 - 6:00 PM</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recovery</span>
                <Badge variant="secondary">7:00 - 9:00 PM</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-xs text-muted-foreground mb-2">
                Based on your circadian rhythm and performance data
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs">89% accuracy over last 30 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
