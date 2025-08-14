"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Languages, ArrowRight, Copy, Volume2, X } from "lucide-react"

interface TranslationPanelProps {
  onClose: () => void
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
]

export function TranslationPanel({ onClose }: TranslationPanelProps) {
  const [sourceLanguage, setSourceLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)
    // Simulate translation API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock translation
    const mockTranslations: Record<string, string> = {
      "Hello, how are you?": "Hola, ¿cómo estás?",
      "Great job on your training today!": "¡Excelente trabajo en tu entrenamiento hoy!",
      "Let's schedule a meeting for tomorrow.": "Programemos una reunión para mañana.",
    }

    setTranslatedText(mockTranslations[sourceText] || "Translation would appear here...")
    setIsTranslating(false)
  }

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSpeak = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="border-t bg-muted/30">
      <Card className="border-0 rounded-none">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">AI Translation</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Translate messages in real-time to communicate with your global team</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="ghost" size="sm" onClick={handleSwapLanguages}>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center space-x-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Translation Interface */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Source Text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{languages.find((l) => l.code === sourceLanguage)?.name}</label>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak(sourceText, sourceLanguage)}
                    disabled={!sourceText}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(sourceText)} disabled={!sourceText}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={4}
              />
            </div>

            {/* Translated Text */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">{languages.find((l) => l.code === targetLanguage)?.name}</label>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSpeak(translatedText, targetLanguage)}
                    disabled={!translatedText}
                  >
                    <Volume2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(translatedText)}
                    disabled={!translatedText}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Translation will appear here..."
                value={translatedText}
                readOnly
                rows={4}
                className="bg-muted/50"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Languages className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
              <span className="text-xs text-muted-foreground">Translations are powered by advanced AI</span>
            </div>
            <Button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isTranslating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Translating...
                </>
              ) : (
                <>
                  <Languages className="h-4 w-4 mr-2" />
                  Translate
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
