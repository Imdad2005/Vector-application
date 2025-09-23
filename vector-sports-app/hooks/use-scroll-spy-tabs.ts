"use client"

import { useState, useCallback, useEffect } from 'react'

interface UseScrollSpyTabsProps {
  tabs: string[]
  defaultTab?: string
}

export function useScrollSpyTabs({ tabs, defaultTab }: UseScrollSpyTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])
  
  const currentIndex = tabs.indexOf(activeTab)
  
  const goToNextTab = useCallback(() => {
    const nextIndex = (currentIndex + 1) % tabs.length
    setActiveTab(tabs[nextIndex])
  }, [currentIndex, tabs])
  
  const goToPrevTab = useCallback(() => {
    const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
    setActiveTab(tabs[prevIndex])
  }, [currentIndex, tabs])
  
  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left') {
      goToNextTab()
    } else if (direction === 'right') {
      goToPrevTab()
    }
  }, [goToNextTab, goToPrevTab])
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goToPrevTab()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goToNextTab()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevTab, goToNextTab])
  
  return {
    activeTab,
    setActiveTab,
    handleSwipe,
    currentIndex,
    totalTabs: tabs.length,
    isFirstTab: currentIndex === 0,
    isLastTab: currentIndex === tabs.length - 1,
    goToNextTab,
    goToPrevTab
  }
}