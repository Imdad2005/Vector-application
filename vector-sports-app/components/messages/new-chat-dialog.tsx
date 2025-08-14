"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Users, MessageCircle } from "lucide-react"

interface Contact {
  id: string
  name: string
  role: string
  avatar?: string
  isOnline: boolean
}

const contacts: Contact[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    role: "Head Coach",
    avatar: "/coach-sarah.png",
    isOnline: true,
  },
  {
    id: "mike-chen",
    name: "Mike Chen",
    role: "Nutritionist",
    avatar: "/nutritionist-mike.png",
    isOnline: false,
  },
  {
    id: "dr-lisa",
    name: "Dr. Lisa Rodriguez",
    role: "Sports Medicine",
    avatar: "/doctor-lisa.png",
    isOnline: true,
  },
  {
    id: "alex-runner",
    name: "Alex Thompson",
    role: "Training Partner",
    avatar: "/athlete-alex.png",
    isOnline: true,
  },
  {
    id: "emma-coach",
    name: "Emma Wilson",
    role: "Assistant Coach",
    avatar: "/coach-emma.png",
    isOnline: false,
  },
]

interface NewChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewChatDialog({ open, onOpenChange }: NewChatDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [groupName, setGroupName] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactToggle = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleCreateChat = () => {
    // TODO: Implement chat creation logic
    console.log("Creating chat with:", selectedContacts, "Group name:", groupName)
    onOpenChange(false)
    setSelectedContacts([])
    setGroupName("")
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
          <DialogDescription>Create a new chat or group conversation</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="direct" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="direct">Direct Message</TabsTrigger>
            <TabsTrigger value="group">Group Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="direct" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Contact List */}
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactToggle(contact.id)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{contact.name}</h4>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                  <Badge variant={contact.isOnline ? "default" : "secondary"} className="text-xs">
                    {contact.isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateChat}
                disabled={selectedContacts.length !== 1}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="group" className="space-y-4">
            {/* Group Name */}
            <div className="space-y-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="Enter group name..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Selected Contacts */}
            {selectedContacts.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Members ({selectedContacts.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedContacts.map((contactId) => {
                    const contact = contacts.find((c) => c.id === contactId)
                    if (!contact) return null
                    return (
                      <Badge key={contactId} variant="secondary" className="text-xs">
                        {contact.name}
                      </Badge>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Contact List with Checkboxes */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onCheckedChange={() => handleContactToggle(contact.id)}
                  />
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback className="text-xs">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {contact.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 bg-green-500 border border-background rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{contact.name}</h4>
                    <p className="text-xs text-muted-foreground">{contact.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateChat}
                disabled={selectedContacts.length < 2 || !groupName.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
