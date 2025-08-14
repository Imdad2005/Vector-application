"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, Languages, Download } from "lucide-react"
import { MessageBubble } from "@/components/messages/message-bubble"
import { FileUploadDialog } from "@/components/messages/file-upload-dialog"
import { TranslationPanel } from "@/components/messages/translation-panel"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  type: "text" | "file" | "image" | "video"
  fileUrl?: string
  fileName?: string
  fileSize?: string
  isTranslated?: boolean
  originalLanguage?: string
  translatedContent?: string
}

const mockMessages: Record<string, Message[]> = {
  "coach-sarah": [
    {
      id: "1",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "/coach-sarah.png",
      content: "Hi! I've reviewed your latest training data. Your consistency has been excellent this week!",
      timestamp: "10:30 AM",
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      senderName: "You",
      content: "Thank you! I've been feeling really good during the runs. The new interval training is working well.",
      timestamp: "10:32 AM",
      type: "text",
    },
    {
      id: "3",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "/coach-sarah.png",
      content: "Here's your updated training plan for next week. Focus on the tempo runs.",
      timestamp: "10:35 AM",
      type: "file",
      fileUrl: "#",
      fileName: "Training_Plan_Week_12.pdf",
      fileSize: "2.4 MB",
    },
    {
      id: "4",
      senderId: "me",
      senderName: "You",
      content:
        "Perfect! I'll review it tonight. Quick question about the recovery runs - should I keep them at the same pace?",
      timestamp: "10:38 AM",
      type: "text",
    },
    {
      id: "5",
      senderId: "sarah",
      senderName: "Sarah Johnson",
      senderAvatar: "/coach-sarah.png",
      content: "Great progress on your 5K time! Let's adjust your training plan for next week.",
      timestamp: "2 minutes ago",
      type: "text",
    },
  ],
}

interface ChatWindowProps {
  chatId: string
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(mockMessages[chatId] || [])
  const [showFileUpload, setShowFileUpload] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages(mockMessages[chatId] || [])
  }, [chatId])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "You",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getChatInfo = () => {
    switch (chatId) {
      case "coach-sarah":
        return {
          name: "Sarah Johnson",
          status: "Online",
          avatar: "/coach-sarah.png",
          type: "Coach",
        }
      case "team-runners":
        return {
          name: "Elite Runners Team",
          status: "5 members",
          type: "Group",
        }
      default:
        return {
          name: "Unknown",
          status: "Offline",
          type: "User",
        }
    }
  }

  const chatInfo = getChatInfo()

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center justify-between bg-card">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chatInfo.avatar || "/placeholder.svg"} alt={chatInfo.name} />
            <AvatarFallback>
              {chatInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{chatInfo.name}</h3>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">{chatInfo.status}</p>
              <Badge variant="secondary" className="text-xs">
                {chatInfo.type}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
            <Languages className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Info className="h-4 w-4 mr-2" />
                  Chat Info
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chat
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Translation Panel */}
      {showTranslation && <TranslationPanel onClose={() => setShowTranslation(false)} />}

      {/* Message Input */}
      <div className="border-t p-4 bg-card">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="sm" onClick={() => setShowFileUpload(true)}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!message.trim()} className="bg-blue-600 hover:bg-blue-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* File Upload Dialog */}
      <FileUploadDialog open={showFileUpload} onOpenChange={setShowFileUpload} />
    </div>
  )
}
