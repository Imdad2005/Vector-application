import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BarChart3, Heart, Smartphone, Users, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading text-xl font-bold">Vector</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-sm font-medium hover:text-blue-600 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-sky-500">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Zap className="h-3 w-3 mr-1" />
              Real-Time Performance Tracking
            </Badge>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Elevate Your Game with <span className="text-blue-600">Real-Time Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Track Performance, Monitor Wellness, and Integrate Devices Seamlessly. Empower your training with precise
              data and stay ahead with personalized monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup?type=athlete">
                <Button size="lg" className="bg-blue-600 hover:bg-sky-500 text-lg px-8">
                  Start as Athlete
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup?type=coach">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Start as Coach
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Excel</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed for athletes and coaches to maximize performance potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Real-Time Dashboard</h3>
                <p className="text-muted-foreground">
                  Monitor KPIs, view responsive charts, and get AI-powered predictions for optimal performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Wellness Monitoring</h3>
                <p className="text-muted-foreground">
                  Daily check-ins and recovery status tracking to maintain peak physical condition.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Device Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly connect with wearables and sync data from your favorite fitness devices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Advanced messaging system with file sharing and AI translation for global teams.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">WCAG AA Compliant</h3>
                <p className="text-muted-foreground">
                  Fully accessible design ensuring everyone can use our platform effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-muted-foreground">
                  Get personalized recommendations and predictive analytics to optimize training.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-8 lg:p-12 text-center text-white">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Performance?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of athletes and coaches who trust Vector to elevate their game.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="font-heading text-xl font-bold">Vector</span>
              </div>
              <p className="text-muted-foreground">Elevating athletic performance through intelligent data insights.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Vector Sports Performance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
