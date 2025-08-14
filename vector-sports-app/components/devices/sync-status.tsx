import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RefreshCw, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { useTheme } from "next-themes"

type SyncActivityType = {
  name: string;
  progress: number;
  status: "completed" | "syncing" | "failed";
  device: string;
  timestamp: string;
  dataSize: string;
}

const syncActivities: SyncActivityType[] = [
  { 
    name: "Heart Rate Data", 
    progress: 100, 
    status: "completed", 
    device: "Vector Band", 
    timestamp: "10:45 AM",
    dataSize: "2.5 MB"
  },
  { 
    name: "Sleep Analysis", 
    progress: 75, 
    status: "syncing", 
    device: "Vector Band", 
    timestamp: "In progress",
    dataSize: "5.2 MB"
  },
  { 
    name: "Workout Sessions", 
    progress: 100, 
    status: "completed", 
    device: "Vector Band", 
    timestamp: "9:30 AM",
    dataSize: "8.1 MB"
  },
  { 
    name: "Recovery Metrics", 
    progress: 45, 
    status: "syncing", 
    device: "Vector Band", 
    timestamp: "In progress",
    dataSize: "3.7 MB"
  },
  { 
    name: "Daily Steps", 
    progress: 0, 
    status: "failed", 
    device: "Vector Band", 
    timestamp: "11:15 AM (Failed)",
    dataSize: "1.8 MB"
  },
]

export function SyncStatus() {
  const { theme } = useTheme()
  // Theme-aware colors
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';
  const textColorSubtle = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
  
  // Add timestamps and data values to make it more meaningful
  const getStatusDetails = (status: "completed" | "syncing" | "failed", progress: number): string => {
    if (status === "completed") return "Completed successfully";
    if (status === "syncing") return `Syncing ${progress}% - ${Math.round(progress/10)} MB of data`;
    if (status === "failed") return "Failed - Retry scheduled";
    return "";
  };
  
  // Calculate estimated time remaining for syncing items
  const getETA = (progress: number, dataSize: string): string => {
    const totalSize = parseFloat(dataSize);
    const remainingPercent = 100 - progress;
    const estimatedMinutes = Math.round((remainingPercent / 100) * (totalSize / 0.5)); // Estimate based on size
    return estimatedMinutes <= 1 ? "< 1 min" : `${estimatedMinutes} min`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {syncActivities.map((activity, index) => (
          <div key={index} className="space-y-2 border-b pb-3 last:border-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{activity.name}</p>
                <div className="flex items-center gap-2">
                  <p className={`text-xs ${textColor}`}>{activity.device}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className={`text-xs ${textColorSubtle}`}>{activity.dataSize}</p>
                </div>
                <p className={`text-xs ${textColorSubtle} mt-1 flex items-center gap-1`}>
                  <Clock className="h-3 w-3" />
                  {activity.timestamp}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {activity.status === "completed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                {activity.status === "syncing" && <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />}
                {activity.status === "failed" && <AlertCircle className="h-4 w-4 text-red-600" />}
              </div>
            </div>
            <Progress value={activity.progress} className="h-2" />
            <div className="flex justify-between text-xs">
              <span className={textColorSubtle}>{getStatusDetails(activity.status, activity.progress)}</span>
              {activity.status === "syncing" && (
                <span className="text-blue-600 font-medium">ETA: {getETA(activity.progress, activity.dataSize)}</span>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Last Sync</span>
            <span className="font-medium">Today, 11:15 AM</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-muted-foreground">Next Auto-Sync</span>
            <span className="font-medium">Today, 2:00 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
