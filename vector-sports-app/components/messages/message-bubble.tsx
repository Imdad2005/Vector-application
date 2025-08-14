"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileText, ImageIcon, Play, Languages } from "lucide-react"

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

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMe = message.senderId === "me"

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Play className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("flex items-start space-x-3", isMe && "flex-row-reverse space-x-reverse")}>
      {!isMe && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
          <AvatarFallback className="text-xs">
            {message.senderName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("flex flex-col space-y-1", isMe ? "items-end" : "items-start")}>
        {!isMe && <span className="text-xs text-muted-foreground font-medium">{message.senderName}</span>}

        <div
          className={cn(
            "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
            isMe ? "bg-blue-600 text-white" : "bg-muted border",
          )}
        >
          {message.type === "text" && (
            <div>
              <p className="text-sm">{message.content}</p>
              {message.isTranslated && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="flex items-center space-x-1 mb-1">
                    <Languages className="h-3 w-3" />
                    <span className="text-xs opacity-75">Translated from {message.originalLanguage}</span>
                  </div>
                  <p className="text-sm opacity-90">{message.translatedContent}</p>
                </div>
              )}
            </div>
          )}

          {message.type === "file" && (
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  isMe ? "bg-white/20" : "bg-blue-100 dark:bg-blue-900",
                )}
              >
                {getFileIcon(message.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{message.fileName}</p>
                <p className={cn("text-xs", isMe ? "text-white/70" : "text-muted-foreground")}>{message.fileSize}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-8 p-0", isMe ? "hover:bg-white/20 text-white" : "hover:bg-muted")}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {message.type === "image" && (
            <div className="space-y-2">
              <div className="bg-muted rounded-lg p-4 text-center">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground">Image preview</p>
              </div>
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>
          )}

          {message.type === "video" && (
            <div className="space-y-2">
              <div className="bg-muted rounded-lg p-4 text-center relative">
                <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs text-muted-foreground">Video preview</p>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
              {message.content && <p className="text-sm">{message.content}</p>}
            </div>
          )}
        </div>

        <span className={cn("text-xs text-muted-foreground", isMe && "text-right")}>{message.timestamp}</span>
      </div>
    </div>
  )
}
