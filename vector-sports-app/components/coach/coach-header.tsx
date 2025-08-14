"use client"

import { AthleteSwitcher } from "@/components/coach/athlete-switcher"
import { MainNav } from "@/components/main-nav"
import { useSelectedAthlete } from "@/context/selected-athlete-context"
import { useEffect } from "react"

interface CoachHeaderProps {
  title?: string
  subtitle?: string
  icon?: React.ReactNode
}

export function CoachHeader({ title, subtitle, icon }: CoachHeaderProps) {
  const { currentUserId, selectAthlete, isCoach } = useSelectedAthlete()
  
  if (!isCoach || !currentUserId) return null
  
  return (
    <MainNav title={title} subtitle={subtitle} icon={icon}>
      <div className="ml-2 border-l pl-2">
        <AthleteSwitcher 
          coachId={currentUserId} 
          onAthleteChange={selectAthlete}
        />
      </div>
    </MainNav>
  )
}
