"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSelectedAthlete } from "@/context/selected-athlete-context"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { currentUserId, setCurrentUserId } = useSelectedAthlete()
  const router = useRouter()
  const pathname = usePathname()
  
  useEffect(() => {
    // If no userId and not on login or signup pages, redirect to login
    const publicPages = ['/login', '/signup', '/forgot-password']
    
    if (!currentUserId && !publicPages.includes(pathname)) {
      router.push('/login')
      return
    }
    
  }, [currentUserId, pathname, router])

  return <>{children}</>
}
