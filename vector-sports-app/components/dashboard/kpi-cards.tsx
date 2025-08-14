import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Heart, Zap, TrendingUp, TrendingDown, Target, Clock } from "lucide-react"

const kpiData = [
  {
    title: "Training Load",
    value: "847",
    unit: "TSS",
    change: "+12%",
    trend: "up",
    icon: Activity,
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900",
  },
  {
    title: "Recovery Score",
    value: "78",
    unit: "/100",
    change: "+5%",
    trend: "up",
    icon: Heart,
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900",
  },
  {
    title: "Power Output",
    value: "285",
    unit: "W",
    change: "-2%",
    trend: "down",
    icon: Zap,
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900",
  },
  {
    title: "Weekly Goal",
    value: "85",
    unit: "%",
    change: "+18%",
    trend: "up",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900",
  },
  {
    title: "Avg Session",
    value: "1h 24m",
    unit: "",
    change: "+8m",
    trend: "up",
    icon: Clock,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100 dark:bg-cyan-900",
  },
]

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon
        const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-1">
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="text-sm text-muted-foreground">{kpi.unit}</div>
              </div>
              <div className="flex items-center mt-2">
                <Badge variant={kpi.trend === "up" ? "default" : "destructive"} className="text-xs">
                  <TrendIcon className="h-3 w-3 mr-1" />
                  {kpi.change}
                </Badge>
                <span className="text-xs text-muted-foreground ml-2">vs last week</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
