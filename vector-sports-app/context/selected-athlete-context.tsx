"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Athlete {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface SelectedAthleteContextType {
  selectedAthleteId: string | null;
  selectAthlete: (athleteId: string) => void;
  isCoach: boolean;
  currentUserId: string | null;
  setCurrentUserId: (id: string) => void;
}

const SelectedAthleteContext = createContext<SelectedAthleteContextType>({
  selectedAthleteId: null,
  selectAthlete: () => {},
  isCoach: false,
  currentUserId: null,
  setCurrentUserId: () => {},
});

export function SelectedAthleteProvider({ children }: { children: React.ReactNode }) {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isCoach, setIsCoach] = useState(false);

  // Determine if current user is a coach based on ID (in a real app, this would use authentication)
  useEffect(() => {
    if (currentUserId) {
      // Coach IDs from mock data: 2, 3, 4
      setIsCoach(['2', '3', '4'].includes(currentUserId));
      
      // If user is an athlete, they can only see their own data
      if (!['2', '3', '4'].includes(currentUserId)) {
        setSelectedAthleteId(currentUserId);
      }
    }
  }, [currentUserId]);

  const selectAthlete = (athleteId: string) => {
    setSelectedAthleteId(athleteId);
    // In a real app, you might want to update user preferences or session state here
  };

  return (
    <SelectedAthleteContext.Provider 
      value={{ 
        selectedAthleteId, 
        selectAthlete, 
        isCoach,
        currentUserId,
        setCurrentUserId
      }}
    >
      {children}
    </SelectedAthleteContext.Provider>
  );
}

export const useSelectedAthlete = () => useContext(SelectedAthleteContext);
