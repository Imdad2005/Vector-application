"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Search, Plus } from "lucide-react"
import { ChatSidebar } from "@/components/messages/chat-sidebar"
import { ChatWindow } from "@/components/messages/chat-window"
import { NewChatDialog } from "@/components/messages/new-chat-dialog"
import { ThemeToggle } from "@/components/theme-toggle"
import { MainNav } from "@/components/main-nav"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("coach-sarah")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewChatDialog, setShowNewChatDialog] = useState(false)

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

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-80 border-r bg-card flex flex-col">
          {/* Search and New Chat */}
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold">Messages</h2>
              <Button size="sm" onClick={() => setShowNewChatDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            <ChatSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} searchQuery={searchQuery} />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          <ChatWindow chatId={selectedChat} />
        </div>
      </div>

      {/* New Chat Dialog */}
      <NewChatDialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog} />
    </div>
  )
}
