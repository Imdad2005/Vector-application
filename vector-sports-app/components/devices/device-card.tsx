import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, Battery, Wifi, WifiOff, RefreshCw, Settings, Clock, Calendar, AlertTriangle, ShieldCheck } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

interface Device {
  id: string
  name: string
  type: string
  brand: string
  status: "connected" | "syncing" | "disconnected"
  lastSync: string
  batteryLevel: number
  dataTypes: string[]
  icon: string
}

interface DeviceCardProps {
  device: Device
}

const statusConfig = {
  connected: { color: "bg-green-500", text: "Connected", icon: Wifi },
  syncing: { color: "bg-blue-500", text: "Syncing", icon: RefreshCw },
  disconnected: { color: "bg-red-500", text: "Disconnected", icon: WifiOff },
}

export function DeviceCard({ device }: DeviceCardProps) {
  const { theme } = useTheme();
  const status = statusConfig[device.status]
  const StatusIcon = status.icon

  const getBatteryColor = (level: number) => {
    if (level > 50) return theme === "dark" ? "text-green-500" : "text-green-600"
    if (level > 20) return theme === "dark" ? "text-yellow-500" : "text-yellow-600"
    return theme === "dark" ? "text-red-500" : "text-red-600"
  }

  // Enhanced device details
  const deviceDetails = {
    serial: "VB-2023-8472X",
    firmware: "v4.2.1",
    lastUpdate: "2 days ago",
    warranty: "Valid until Dec 2024",
    syncsToday: 8,
    totalDataPoints: "24,789",
    syncSchedule: "Every 2 hours"
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{device.icon}</span>
            <div>
              <h3 className="font-semibold text-sm">{device.name}</h3>
              <div className="flex items-center gap-1">
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{device.brand}</p>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Active</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Device Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Now
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Update Firmware
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-sm font-medium">{status.text}</span>
            <StatusIcon className={`h-3 w-3 ${device.status === "syncing" ? "animate-spin" : ""}`} />
          </div>
          <div className="text-xs text-muted-foreground">
            {deviceDetails.serial}
          </div>
        </div>

        {/* Battery */}
        <div className="flex items-center gap-2 mb-3">
          <Battery className={`h-4 w-4 ${getBatteryColor(device.batteryLevel)}`} />
          <Progress value={device.batteryLevel} className="flex-1 h-2" />
          <span className={`text-xs font-medium ${getBatteryColor(device.batteryLevel)}`}>{device.batteryLevel}%</span>
        </div>

        {/* Firmware and updates */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Firmware:</span>
            <span className="font-medium">{deviceDetails.firmware}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">Updated:</span>
            <span className="font-medium">{deviceDetails.lastUpdate}</span>
          </div>
        </div>

        {/* Sync Info */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Syncs today:</span>
            <span className="font-medium">{deviceDetails.syncsToday}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Schedule:</span>
            <span className="font-medium">{deviceDetails.syncSchedule}</span>
          </div>
        </div>

        {/* Data Types - showing just a few to save space */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Primary data types:</p>
          <div className="flex flex-wrap gap-1">
            {device.dataTypes.slice(0, 5).map((type) => (
              <Badge key={type} variant="secondary" className="text-xs">
                {type}
              </Badge>
            ))}
            {device.dataTypes.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{device.dataTypes.length - 5} more
              </Badge>
            )}
          </div>
        </div>

        {/* Last Sync */}
        <div className="mt-3 pt-3 border-t flex justify-between items-center">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Last sync: <span className="font-medium">{device.lastSync}</span>
          </p>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            <RefreshCw className="h-3 w-3 mr-1" />
            Sync
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
