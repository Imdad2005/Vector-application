"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, FileText, Video, Paperclip } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSend = () => {
    // TODO: Implement file upload logic
    console.log("Uploading file:", selectedFile, "with message:", message)
    onOpenChange(false)
    setSelectedFile(null)
    setMessage("")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8" />
    if (file.type.startsWith("video/")) return <Video className="h-8 w-8" />
    return <FileText className="h-8 w-8" />
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share File</DialogTitle>
          <DialogDescription>Upload and share files with your team</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload File</TabsTrigger>
            <TabsTrigger value="link">Share Link</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-muted-foreground/25"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {selectedFile ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-blue-600">{getFileIcon(selectedFile)}</div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Drag and drop a file here, or click to select</p>
                  <Input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                  />
                  <Label htmlFor="file-upload">
                    <Button variant="outline" size="sm" asChild>
                      <span>Choose File</span>
                    </Button>
                  </Label>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a message with your file..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>

            {/* Send Button */}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSend} disabled={!selectedFile} className="bg-blue-600 hover:bg-blue-700">
                <Paperclip className="h-4 w-4 mr-2" />
                Send File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link">Share Link</Label>
              <Input id="link" placeholder="https://example.com/document" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link-message">Message</Label>
              <Textarea id="link-message" placeholder="Add a message with your link..." rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Share Link</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
