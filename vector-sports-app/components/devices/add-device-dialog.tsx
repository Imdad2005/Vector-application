"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Bluetooth, Smartphone } from "lucide-react"

interface AddDeviceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const deviceCategories = [
  {
    name: "Smartwatches",
    devices: [
      { name: "Apple Watch Series 9", brand: "Apple", icon: "⌚", popular: true },
      { name: "Samsung Galaxy Watch 6", brand: "Samsung", icon: "⌚", popular: true },
      { name: "Garmin Venu 3", brand: "Garmin", icon: "⌚", popular: false },
      { name: "Fitbit Versa 4", brand: "Fitbit", icon: "⌚", popular: true },
    ],
  },
  {
    name: "Fitness Trackers",
    devices: [
      { name: "Fitbit Charge 6", brand: "Fitbit", icon: "📊", popular: true },
      { name: "WHOOP 4.0", brand: "WHOOP", icon: "📊", popular: true },
      { name: "Amazfit Band 7", brand: "Amazfit", icon: "📊", popular: false },
      { name: "Garmin Vivosmart 5", brand: "Garmin", icon: "📊", popular: false },
    ],
  },
  {
    name: "Heart Rate Monitors",
    devices: [
      { name: "Polar H10", brand: "Polar", icon: "❤️", popular: true },
      { name: "Garmin HRM-Pro Plus", brand: "Garmin", icon: "❤️", popular: true },
      { name: "Wahoo TICKR X", brand: "Wahoo", icon: "❤️", popular: false },
    ],
  },
  {
    name: "Smart Rings",
    devices: [
      { name: "Oura Ring Gen3", brand: "Oura", icon: "💍", popular: true },
      { name: "Samsung Galaxy Ring", brand: "Samsung", icon: "💍", popular: false },
    ],
  },
]

export function AddDeviceDialog({ open, onOpenChange }: AddDeviceDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [connectionStep, setConnectionStep] = useState<"select" | "connect" | "success">("select")
  const [selectedDevice, setSelectedDevice] = useState<any>(null)

  const filteredDevices = deviceCategories.flatMap((category) =>
    category.devices
      .filter(
        (device) =>
          device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          device.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((device) => ({ ...device, category: category.name })),
  )

  const handleDeviceSelect = (device: any) => {
    setSelectedDevice(device)
    setConnectionStep("connect")
  }

  const handleConnect = () => {
    // Simulate connection process
    setTimeout(() => {
      setConnectionStep("success")
      setTimeout(() => {
        onOpenChange(false)
        setConnectionStep("select")
        setSelectedDevice(null)
      }, 2000)
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-blue-600" />
            Add New Device
          </DialogTitle>
        </DialogHeader>

        {connectionStep === "select" && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Device Categories */}
            <div className="space-y-6">
              {deviceCategories.map((category) => {
                const categoryDevices = category.devices.filter(
                  (device) =>
                    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    device.brand.toLowerCase().includes(searchQuery.toLowerCase()),
                )

                if (categoryDevices.length === 0 && searchQuery) return null

                return (
                  <div key={category.name}>
                    <h3 className="font-semibold mb-3">{category.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categoryDevices.map((device, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleDeviceSelect(device)}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{device.icon}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{device.name}</p>
                                {device.popular && (
                                  <Badge variant="secondary" className="text-xs">
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600">{device.brand}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {connectionStep === "connect" && selectedDevice && (
          <div className="text-center space-y-6 py-8">
            <div className="text-4xl mb-4">{selectedDevice.icon}</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Connect {selectedDevice.name}</h3>
              <p className="text-gray-600 mb-6">Follow these steps to connect your device:</p>
            </div>

            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Enable Bluetooth</p>
                  <p className="text-sm text-gray-600">Make sure Bluetooth is enabled on your device</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Put device in pairing mode</p>
                  <p className="text-sm text-gray-600">Follow your device's instructions to enable pairing</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Click connect below</p>
                  <p className="text-sm text-gray-600">We'll automatically detect and connect your device</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Button variant="outline" onClick={() => setConnectionStep("select")}>
                Back
              </Button>
              <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700">
                <Bluetooth className="h-4 w-4 mr-2" />
                Connect Device
              </Button>
            </div>
          </div>
        )}

        {connectionStep === "success" && selectedDevice && (
          <div className="text-center space-y-6 py-8">
            <div className="text-6xl text-green-600 mb-4">✅</div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Successfully Connected!</h3>
              <p className="text-gray-600">Your {selectedDevice.name} is now connected and syncing data.</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
