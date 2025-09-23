"use client"

import { useEMGData } from '@/hooks/use-emg-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, Zap, ZapOff, Activity, TrendingUp, Target, Gauge, Power, PowerOff } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function EMGDashboard() {
  const { 
    currentGesture, 
    gestureInfo, 
    connectionStatus, 
    error, 
    history, 
    isConnected, 
    reconnect,
    gestureStats,
    envelope1,
    envelope2
  } = useEMGData()
  
  // Get disconnect function separately
  const { disconnect } = useEMGData()

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  // Prepare chart data
  const gestureHistoryChart = history.map((item, index) => ({
    index,
    gesture: parseInt(item.gesture),
    timestamp: item.timestamp,
    time: formatTime(item.timestamp)
  }))

  // Prepare pie chart data for gesture distribution
  const gestureDistribution = Object.entries(gestureStats).map(([gesture, count]) => ({
    gesture: `Gesture ${gesture}`,
    count,
    percentage: ((count / Object.values(gestureStats).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
  }))

  const COLORS = ['#6b7280', '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Zap className="h-5 w-5 text-green-500" />
              ) : (
                <ZapOff className="h-5 w-5 text-red-500" />
              )}
              <CardTitle className="text-lg">EMG Sensor Status</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <>
                  <Badge variant="default">Connected</Badge>
                  <Button variant="outline" size="sm" onClick={disconnect}>
                    <PowerOff className="h-4 w-4 mr-1" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={reconnect}>
                  <Power className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {connectionStatus.port && (
              <p>
                {connectionStatus.port === 'DEMO_MODE' ? (
                  <span className="text-blue-500 font-medium">Demo Mode: Showing realistic human EMG data</span>
                ) : (
                  <>Arduino Port: <span className="font-mono">{connectionStatus.port}</span></>
                )}
              </p>
            )}
            {error && (
              <p className="text-amber-500">{error}</p>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* EMG Envelope Data */}
      {isConnected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Channel 1 Envelope */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Channel 1 (A0)</CardTitle>
              <Gauge className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{envelope1}</div>
              <div className="mt-2">
                <Progress value={envelope1} max={100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  EMG Envelope Value
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Channel 2 Envelope */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Channel 2 (A2)</CardTitle>
              <Gauge className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{envelope2}</div>
              <div className="mt-2">
                <Progress value={envelope2} max={100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  EMG Envelope Value
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Signal Strength */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Signal Strength</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(envelope1, envelope2)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Peak envelope value
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Average/Baseline Values */}
      {isConnected && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>EMG Statistics</span>
            </CardTitle>
            <CardDescription>Average and baseline muscle activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {history.length > 0 ? 
                    Math.round(history.reduce((sum, item) => sum + (item.envelope1 || 0), 0) / history.length) : 
                    Math.round((envelope1 + envelope2) / 2)
                  }
                </div>
                <p className="text-sm text-muted-foreground">Average Activity</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {history.length > 5 ? 
                    Math.round(Math.min(...history.slice(-10).map(item => item.envelope1 || 0))) :
                    Math.round(Math.max(10, Math.min(envelope1, envelope2) * 0.3))
                  }
                </div>
                <p className="text-sm text-muted-foreground">Baseline Level</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {history.length > 5 ? 
                    Math.round(Math.max(...history.slice(-10).map(item => Math.max(item.envelope1 || 0, item.envelope2 || 0)))) :
                    Math.round(Math.max(envelope1, envelope2) * 1.2)
                  }
                </div>
                <p className="text-sm text-muted-foreground">Peak Activity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Gesture Statistics */}
      {Object.keys(gestureStats).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(gestureStats).map(([gesture, count]) => {
            const total = Object.values(gestureStats).reduce((a, b) => a + b, 0)
            const percentage = ((count / total) * 100)
            
            return (
              <Card key={gesture}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Gesture {gesture}</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="mt-2">
                    <Progress value={percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {percentage.toFixed(1)}% of total
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Real-Time Charts */}
      {history.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gesture Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Gesture Timeline</span>
              </CardTitle>
              <CardDescription>Real-time gesture detection over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gestureHistoryChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="index"
                    label={{ value: 'Time Sequence', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    domain={[0, 5]}
                    label={{ value: 'Gesture', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    labelFormatter={(value) => `Reading #${value}`}
                    formatter={(value, name) => [`Gesture ${value}`, 'Gesture']}
                  />
                  <Line 
                    type="stepAfter" 
                    dataKey="gesture" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gesture Distribution */}
          {gestureDistribution.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Gesture Distribution</CardTitle>
                <CardDescription>Frequency of each gesture detected</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gestureDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ gesture, percentage }) => `${gesture}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gestureDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Raw Data Stream */}
      {history.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Live Data Stream</CardTitle>
            <CardDescription>
              Last 10 gesture readings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.slice(-10).reverse().map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded border-l-4"
                  style={{ borderLeftColor: item.gestureInfo.color }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: item.gestureInfo.color }}
                    >
                      {item.gesture}
                    </div>
                    <div>
                      <p className="font-medium">{item.gestureInfo.name}</p>
                      <p className="text-sm text-muted-foreground">{item.gestureInfo.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono">{formatTime(item.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {!isConnected && (
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <ZapOff className="h-12 w-12 text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">EMG Sensor Not Connected</h3>
                <p className="text-muted-foreground">
                  Connect to view realistic human EMG data simulation
                </p>
              </div>
              <Button onClick={reconnect} className="mt-4">
                <Power className="h-4 w-4 mr-2" />
                Connect to Demo Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}