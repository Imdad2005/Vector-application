"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeviceCard } from "@/components/devices/device-card"
import { AddDeviceDialog } from "@/components/devices/add-device-dialog"
import { SyncStatus } from "@/components/devices/sync-status"
import { DeviceAnalytics } from "@/components/devices/device-analytics"
import { Smartphone, Plus, Wifi, WifiOff, RefreshCw, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"

const connectedDevices = [
  {
    id: "1",
    name: "Vector Band",
    type: "fitness_tracker",
    brand: "Vector",
    status: "connected" as "connected" | "syncing" | "disconnected",
    lastSync: "1 minute ago",
    batteryLevel: 85,
    dataTypes: ["Heart Rate", "Steps", "Sleep", "Workouts", "GPS", "Training Load", "Recovery", "HRV", "Strain", "Blood Oxygen", "Temperature"],
    icon: "⚡",
  }
]

const availableDevices = [
  { name: "Vector Band Pro", brand: "Vector", type: "fitness_tracker", icon: "⚡" }
]

export default function DevicesPage() {
  const [showAddDevice, setShowAddDevice] = useState(false)
  const [syncingAll, setSyncingAll] = useState(false)

  const handleSyncAll = async () => {
    setSyncingAll(true)
    // Simulate sync process
    setTimeout(() => setSyncingAll(false), 3000)
  }

  const connectedCount = connectedDevices.filter((d) => d.status === "connected").length
  const syncingCount = connectedDevices.filter((d) => d.status === "syncing").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">Vector</span>
            </div>

            <MainNav />

            <div className="flex items-center space-x-4">
              {/* Theme toggle is now inside MainNav */}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Device Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vector Band</h1>
              <p className="text-muted-foreground">Monitor and manage your Vector Band device</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Button
              variant="outline"
              onClick={handleSyncAll}
              disabled={syncingAll}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${syncingAll ? "animate-spin" : ""}`} />
              {syncingAll ? "Syncing..." : "Sync All"}
            </Button>
            <Button onClick={() => setShowAddDevice(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                  <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
                </div>
                <Wifi className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Syncing</p>
                  <p className="text-2xl font-bold text-blue-600">{syncingCount}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Offline</p>
                  <p className="text-2xl font-bold text-red-600">1</p>
                </div>
                <WifiOff className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Devices</p>
                  <p className="text-2xl font-bold">{connectedDevices.length}</p>
                </div>
                <Smartphone className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Device */}
            <Card className="overflow-hidden border-2 border-blue-500/20">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent">
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  Vector Band
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {connectedDevices.map((device) => (
                    <DeviceCard key={device.id} device={device} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Device Features and Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Metrics and Data Values</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {connectedDevices[0].dataTypes.map((dataType, index) => {
                    // Generate realistic values for each metric
                    let value = '';
                    let color = 'text-blue-600';
                    
                    switch(dataType) {
                      case 'Heart Rate': 
                        value = '68 bpm'; 
                        color = 'text-red-600';
                        break;
                      case 'Steps': 
                        value = '8,742'; 
                        color = 'text-green-600';
                        break;
                      case 'Sleep': 
                        value = '7h 12m'; 
                        color = 'text-purple-600';
                        break;
                      case 'Workouts': 
                        value = '3 this week'; 
                        color = 'text-orange-600';
                        break;
                      case 'GPS': 
                        value = 'Active'; 
                        color = 'text-blue-600';
                        break;
                      case 'Training Load': 
                        value = '78 (moderate)'; 
                        color = 'text-yellow-600';
                        break;
                      case 'Recovery': 
                        value = '85%'; 
                        color = 'text-green-600';
                        break;
                      case 'HRV': 
                        value = '62 ms'; 
                        color = 'text-blue-600';
                        break;
                      case 'Strain': 
                        value = '12.4'; 
                        color = 'text-orange-600';
                        break;
                      case 'Blood Oxygen': 
                        value = '98%'; 
                        color = 'text-blue-600';
                        break;
                      case 'Temperature': 
                        value = '36.6°C'; 
                        color = 'text-red-600';
                        break;
                      default: 
                        value = 'No data'; 
                        color = 'text-gray-600';
                    }
                    
                    return (
                      <div key={index} className="border rounded-lg p-3 flex flex-col">
                        <span className="text-xs text-muted-foreground mb-1">{dataType}</span>
                        <span className={`text-lg font-medium ${color}`}>{value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            {/* Device Analytics */}
            <DeviceAnalytics />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SyncStatus />

            {/* Available Upgrades */}
            <Card>
              <CardHeader>
                <CardTitle>Available Upgrades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableDevices.map((device, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    onClick={() => setShowAddDevice(true)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{device.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{device.name}</p>
                        <p className="text-xs text-muted-foreground">{device.brand}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Upgrade
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddDeviceDialog open={showAddDevice} onOpenChange={setShowAddDevice} />
    </div>
  )
}
