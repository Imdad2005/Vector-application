'use client'

import { Activity, Heart, MessageSquare, CalendarIcon, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Bell, Settings, User } from 'lucide-react'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  isActive: boolean
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'hover:text-blue-600 transition-colors'}`}
    >
      {children}
    </Link>
  )
}

interface MainNavProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
  badgeText?: string
  badgeIcon?: React.ReactNode
  showActions?: boolean
  children?: React.ReactNode
}

export function MainNav({
  title,
  subtitle,
  icon,
  badgeText,
  badgeIcon,
  showActions = true,
  children
}: MainNavProps) {
  const pathname = usePathname()

  // Get icon based on current path
  const getIcon = () => {
    if (icon) return icon

    switch (pathname) {
      case '/dashboard':
        return <Activity className="h-6 w-6 text-white" />
      case '/wellness':
        return <Heart className="h-6 w-6 text-white" />
      case '/messages':
        return <MessageSquare className="h-6 w-6 text-white" />
      case '/calendar':
        return <CalendarIcon className="h-6 w-6 text-white" />
      case '/devices':
        return <Smartphone className="h-6 w-6 text-white" />
      default:
        return <Activity className="h-6 w-6 text-white" />
    }
  }

  // Get badge text based on current path
  const getBadgeText = () => {
    if (badgeText) return badgeText

    switch (pathname) {
      case '/dashboard':
        return 'Live Dashboard'
      case '/wellness':
        return 'Wellness Center'
      case '/messages':
        return 'Messages'
      case '/calendar':
        return 'Calendar'
      case '/devices':
        return 'Device'
      default:
        return ''
    }
  }

  // Get badge icon based on current path
  const getBadgeIcon = () => {
    if (badgeIcon) return badgeIcon

    switch (pathname) {
      case '/dashboard':
        return <Activity className="h-3 w-3 mr-1" />
      case '/wellness':
        return <Heart className="h-3 w-3 mr-1" />
      case '/messages':
        return <MessageSquare className="h-3 w-3 mr-1" />
      case '/calendar':
        return <CalendarIcon className="h-3 w-3 mr-1" />
      case '/devices':
        return <Smartphone className="h-3 w-3 mr-1" />
      default:
        return <Activity className="h-3 w-3 mr-1" />
    }
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                {getIcon()}
              </div>
              <span className="font-heading text-xl font-bold">Vector</span>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex ml-3">
              {getBadgeIcon()}
              {getBadgeText()}
            </Badge>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/dashboard" isActive={pathname === '/dashboard'}>
              Dashboard
            </NavLink>
            <NavLink href="/wellness" isActive={pathname === '/wellness'}>
              Wellness
            </NavLink>
            <NavLink href="/messages" isActive={pathname === '/messages'}>
              Messages
            </NavLink>
            <NavLink href="/calendar" isActive={pathname === '/calendar'}>
              Calendar
            </NavLink>
            <NavLink href="/devices" isActive={pathname === '/devices'}>
              Device
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            {showActions && (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </>
            )}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
            {/* Children allows for insertion of custom elements like athlete switcher */}
            {children}
          </div>
        </div>
      </div>
    </header>
  )
}
