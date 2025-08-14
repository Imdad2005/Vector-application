"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password reset logic
    console.log("Password reset request for:", email)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Theme Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="font-heading text-2xl font-bold">Vector</span>
          </div>
          <ThemeToggle />
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">
              {isSubmitted ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription>
              {isSubmitted
                ? "We've sent a password reset link to your email address"
                : "Enter your email address and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="athlete@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-sky-500 text-base">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">
                  If an account with <strong>{email}</strong> exists, you'll receive a password reset email shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full h-11">
                  Try Another Email
                </Button>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-sky-500 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
