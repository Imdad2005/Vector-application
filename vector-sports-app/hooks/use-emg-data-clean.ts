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

  const connect = useCallback(() => {
    try {
      const websocket = new WebSocket('ws://localhost:3001')
      
      websocket.onopen = () => {
        console.log('Connected to EMG WebSocket server')
        setError(null)
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
        
        // Auto-reconnect after 3 seconds
        setTimeout(() => {
          if (!websocket || websocket.readyState === WebSocket.CLOSED) {
            connect()
          }
        }, 3000)
      }
      
      websocket.onerror = (err) => {
        console.error('EMG WebSocket error:', err)
        setError('WebSocket connection error. Make sure the EMG server is running.')
        setConnectionStatus(prev => ({ ...prev, arduino: false }))
      }
      
      setWs(websocket)
      
    } catch (err) {
      setError('Failed to connect to EMG server. Please start the server.')
      console.error('Connection error:', err)
    }
  }, [])

  const reconnect = useCallback(() => {
    if (ws) {
      ws.close()
    }
    setWs(null)
    setError(null)
    connect()
  }, [ws, connect])

  useEffect(() => {
    connect()
    
    return () => {
      if (ws) {
        ws.close()
      }
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
    envelope2
  }
}