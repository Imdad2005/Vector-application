"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, Eye, EyeOff, Users, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const defaultUserType = searchParams.get("type") || "athlete"

  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState(defaultUserType)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Import here to prevent SSR issues
    const { registerUser } = require("@/lib/mock/auth")
    
    // Reset states
    setError("")
    setSuccess(false)
    
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return
    }
    
    // Register user
    const result = registerUser({
      ...formData,
      userType: userType as 'athlete' | 'coach',
    })
    
    if (result.success) {
      setSuccess(true)
      console.log("Registration successful:", result.user)
      // In a real app, you would store the user in a context or state management
      // And redirect to the dashboard or login page
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1500)
    } else {
      setError(result.message)
      console.log("Registration failed:", result.message)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
            <CardTitle className="font-heading text-2xl">Create Your Account</CardTitle>
            <CardDescription>Join Vector and start elevating your performance today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User Type Selection */}
              <div className="space-y-3">
                <Label>I am a:</Label>
                <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="athlete" id="athlete" />
                    <Label htmlFor="athlete" className="flex items-center cursor-pointer flex-1">
                      <User className="h-4 w-4 mr-2" />
                      Athlete
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="coach" id="coach" />
                    <Label htmlFor="coach" className="flex items-center cursor-pointer flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      Coach
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              {error && (
                <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm bg-green-50 border border-green-200 text-green-600 rounded-md">
                  Registration successful! Redirecting to dashboard...
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-sky-500 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-sky-500 transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-sky-500 text-base"
                disabled={!formData.agreeToTerms}
              >
                Create Account
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11 bg-transparent">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 bg-transparent">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                </svg>
                Apple
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-sky-500 font-medium transition-colors">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
