"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Users, MessageCircle } from "lucide-react"

interface Chat {
  id: string
  name: string
  type: "direct" | "group"
  avatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  participants?: string[]
}

const chats: Chat[] = [
  {
    id: "coach-sarah",
    name: "Sarah Johnson",
    type: "direct",
    avatar: "/coach-sarah.png",
    lastMessage: "Great progress on your 5K time! Let's adjust your training plan for next week.",
    lastMessageTime: "2m ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "team-runners",
    name: "Elite Runners Team",
    type: "group",
    lastMessage: "Alex: Anyone up for a long run this weekend?",
    lastMessageTime: "15m ago",
    unreadCount: 5,
    isOnline: false,
    participants: ["Alex", "Maria", "John", "+3"],
  },
  {
    id: "nutritionist-mike",
    name: "Mike Chen",
    type: "direct",
    avatar: "/nutritionist-mike.png",
    lastMessage: "Here's your updated meal plan for the competition prep phase.",
    lastMessageTime: "1h ago",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "physio-team",
    name: "Recovery & Physio",
    type: "group",
    lastMessage: "Dr. Lisa: Remember to do your mobility exercises daily.",
    lastMessageTime: "3h ago",
    unreadCount: 1,
    isOnline: false,
    participants: ["Dr. Lisa", "Tom", "Sarah"],
  },
  {
    id: "training-partners",
    name: "Training Partners",
    type: "group",
    lastMessage: "Emma: Tomorrow's track session is confirmed for 6 AM.",
    lastMessageTime: "5h ago",
    unreadCount: 0,
    isOnline: false,
    participants: ["Emma", "David", "Lisa", "+2"],
  },
  {
    id: "sports-psychologist",
    name: "Dr. Amanda White",
    type: "direct",
    avatar: "/sports-psychologist-session.png",
    lastMessage: "How are you feeling about the upcoming competition?",
    lastMessageTime: "1d ago",
    unreadCount: 0,
    isOnline: true,
  },
]

interface ChatSidebarProps {
  selectedChat: string
  onSelectChat: (chatId: string) => void
  searchQuery: string
}

export function ChatSidebar({ selectedChat, onSelectChat, searchQuery }: ChatSidebarProps) {
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-1 p-2">
      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={cn(
            "flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50",
            selectedChat === chat.id && "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800",
          )}
        >
          {/* Avatar */}
          <div className="relative">
            {chat.type === "direct" ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                <AvatarFallback>
                  {chat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
            )}
            {chat.isOnline && chat.type === "direct" && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>

          {/* Chat Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-medium text-sm truncate">{chat.name}</h4>
              <div className="flex items-center space-x-2">
                {chat.unreadCount > 0 && (
                  <Badge variant="default" className="h-5 min-w-5 text-xs bg-blue-600">
                    {chat.unreadCount}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
              {chat.type === "group" && (
                <div className="flex items-center text-xs text-muted-foreground ml-2">
                  <Users className="h-3 w-3 mr-1" />
                  {chat.participants?.length}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {filteredChats.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No conversations found</p>
        </div>
      )}
    </div>
  )
}
