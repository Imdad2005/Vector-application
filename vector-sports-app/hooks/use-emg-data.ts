"use client"

import { useState, useEffect, useCallback } from 'react'

export interface EMGGestureInfo {
  name: string
  description: string
  color: string
}

export interface EMGData {
  gesture: string
  gestureInfo: EMGGestureInfo
  timestamp: number
  envelope1?: number
  envelope2?: number
}

export interface EMGConnectionStatus {
  arduino: boolean
  port?: string
  error?: string
  lastData?: number
}

interface UseEMGDataReturn {
  currentGesture: string | null
  gestureInfo: EMGGestureInfo | null
  connectionStatus: EMGConnectionStatus
  error: string | null
  history: EMGData[]
  isConnected: boolean
  reconnect: () => void
  gestureStats: Record<string, number>
  envelope1: number
  envelope2: number
  disconnect: () => void
}

export function useEMGData(): UseEMGDataReturn {
  const [currentGesture, setCurrentGesture] = useState<string | null>(null)
  const [gestureInfo, setGestureInfo] = useState<EMGGestureInfo | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<EMGConnectionStatus>({
    arduino: false
  })
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<EMGData[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [gestureStats, setGestureStats] = useState<Record<string, number>>({})
  const [envelope1, setEnvelope1] = useState<number>(0)
  const [envelope2, setEnvelope2] = useState<number>(0)
  const [isDemo, setIsDemo] = useState<boolean>(false)
  const [demoInterval, setDemoInterval] = useState<NodeJS.Timeout | null>(null)

  // Gesture mapping for demo mode
  const getGestureInfo = useCallback((gesture: string): EMGGestureInfo => {
    const gestureMap: Record<string, EMGGestureInfo> = {
      '0': { name: 'Rest', description: 'Muscle at rest', color: '#6b7280' },
      '1': { name: 'Fist', description: 'Making a fist', color: '#ef4444' },
      '2': { name: 'Open Hand', description: 'Open palm', color: '#3b82f6' },
      '3': { name: 'Pinch', description: 'Thumb and finger pinch', color: '#10b981' },
      '4': { name: 'Point', description: 'Pointing gesture', color: '#f59e0b' },
      '5': { name: 'Wave', description: 'Waving motion', color: '#8b5cf6' }
    }
    return gestureMap[gesture] || gestureMap['0']
  }, [])

  // Demo mode for realistic human EMG values
  const startDemoMode = useCallback(() => {
    if (demoInterval) return
    
    setIsDemo(true)
    setError(null)
    setConnectionStatus({ arduino: true, port: 'DEMO_MODE' })
    
    let gestureIndex = 0
    const humanGestures = ['0', '1', '2', '3', '4', '5']
    
    const interval = setInterval(() => {
      const gesture = humanGestures[gestureIndex]
      const info = getGestureInfo(gesture)
      
      // Realistic human EMG envelope values
      const baseEnv1 = Math.random() * 20 + 10 // 10-30 baseline
      const baseEnv2 = Math.random() * 20 + 10
      
      let env1 = baseEnv1
      let env2 = baseEnv2
      
      // Gesture-specific envelope patterns
      switch (gesture) {
        case '1': env1 += Math.random() * 50 + 30; break // Fist
        case '2': env2 += Math.random() * 40 + 25; break // Open
        case '3': env1 += Math.random() * 30 + 20; env2 += Math.random() * 30 + 15; break // Pinch
        case '4': env1 += Math.random() * 35 + 25; break // Point
        case '5': env1 += Math.random() * 25 + 15; env2 += Math.random() * 25 + 15; break // Wave
      }
      
      setCurrentGesture(gesture)
      setGestureInfo(info)
      setEnvelope1(Math.round(env1))
      setEnvelope2(Math.round(env2))
      
      // Add to history
      setHistory(prev => {
        const newEntry = {
          gesture,
          gestureInfo: info,
          timestamp: Date.now(),
          envelope1: Math.round(env1),
          envelope2: Math.round(env2)
        }
        const updated = [...prev, newEntry]
        return updated.slice(-100) // Keep last 100 entries
      })
      
      // Update stats
      setGestureStats(prev => ({
        ...prev,
        [gesture]: (prev[gesture] || 0) + 1
      }))
      
      gestureIndex = (gestureIndex + 1) % humanGestures.length
    }, 1500) // Change gesture every 1.5 seconds
    
    setDemoInterval(interval)
  }, [demoInterval, getGestureInfo])

  const stopDemoMode = useCallback(() => {
    if (demoInterval) {
      clearInterval(demoInterval)
      setDemoInterval(null)
    }
    setIsDemo(false)
    setCurrentGesture(null)
    setGestureInfo(null)
    setEnvelope1(0)
    setEnvelope2(0)
    setConnectionStatus({ arduino: false })
  }, [demoInterval])

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close()
      setWs(null)
    }
    stopDemoMode()
    setError(null)
  }, [ws, stopDemoMode])

  const connect = useCallback(() => {
    try {
      const websocket = new WebSocket('ws://localhost:3001')
      
      websocket.onopen = () => {
        console.log('Connected to EMG WebSocket server')
        setError(null)
        stopDemoMode()
      }
      
      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          
          if (message.type === 'connection_status') {
            setConnectionStatus({
              arduino: message.arduino,
              port: message.port,
              error: message.error
            })
            
            if (!message.arduino && message.error) {
              setError(`Arduino connection error: ${message.error}`)
            } else if (message.arduino) {
              setError(null)
            }
          }
          
          if (message.type === 'emg_data') {
            setCurrentGesture(message.gesture)
            setGestureInfo(message.gestureInfo)
            setEnvelope1(message.envelope1 || 0)
            setEnvelope2(message.envelope2 || 0)
            
            // Update history
            if (message.history) {
              setHistory(message.history)
            }
            
            // Update gesture statistics
            setGestureStats(prev => ({
              ...prev,
              [message.gesture]: (prev[message.gesture] || 0) + 1
            }))
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err)
          setError('Error parsing data from server')
        }
      }
      
      websocket.onclose = () => {
        console.log('EMG WebSocket disconnected')
        setConnectionStatus(prev => ({ ...prev, arduino: false }))
        
        // Start demo mode if connection fails
        setTimeout(() => {
          if (!websocket || websocket.readyState === WebSocket.CLOSED) {
            console.log('Starting demo mode after connection failure')
            startDemoMode()
          }
        }, 1000)
      }
      
      websocket.onerror = (err) => {
        console.error('EMG WebSocket error:', err)
        setError('WebSocket connection error. Starting demo mode.')
        setConnectionStatus(prev => ({ ...prev, arduino: false }))
        
        // Start demo mode if WebSocket fails
        setTimeout(startDemoMode, 1000)
      }
      
      setWs(websocket)
      
    } catch (err) {
      setError('Failed to connect to EMG server. Starting demo mode.')
      console.error('Connection error:', err)
      setTimeout(startDemoMode, 1000)
    }
  }, [stopDemoMode, startDemoMode])

  const reconnect = useCallback(() => {
    disconnect()
    setTimeout(connect, 1000)
  }, [disconnect, connect])

  useEffect(() => {
    connect()
    
    return () => {
      disconnect()
    }
  }, [])

  // Calculate connection status
  const isConnected = connectionStatus.arduino && !error

  return {
    currentGesture,
    gestureInfo,
    connectionStatus,
    error,
    history,
    isConnected,
    reconnect,
    gestureStats,
    envelope1,
    envelope2,
    disconnect
  }
}