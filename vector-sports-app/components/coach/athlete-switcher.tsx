"use client"

import { useState, useEffect } from "react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown, Users } from "lucide-react"
import { getCoachAthletes } from "@/lib/mock/coach-athletes"

interface AthleteSwitcherProps {
  coachId: string;
  onAthleteChange: (athleteId: string) => void;
  currentAthleteId?: string;
}

interface Athlete {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export function AthleteSwitcher({ coachId, onAthleteChange, currentAthleteId }: AthleteSwitcherProps) {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  // Fetch athletes when component mounts
  useEffect(() => {
    const coachAthletes = getCoachAthletes(coachId) as Athlete[];
    setAthletes(coachAthletes);
    
    // Set initially selected athlete
    if (currentAthleteId && coachAthletes.length > 0) {
      const current = coachAthletes.find(athlete => athlete.id === currentAthleteId);
      if (current) {
        setSelectedAthlete(current);
      } else {
        setSelectedAthlete(coachAthletes[0]);
        onAthleteChange(coachAthletes[0].id);
      }
    } else if (coachAthletes.length > 0) {
      setSelectedAthlete(coachAthletes[0]);
      onAthleteChange(coachAthletes[0].id);
    }
  }, [coachId, currentAthleteId, onAthleteChange]);

  const handleAthleteSelect = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    onAthleteChange(athlete.id);
  };

  if (athletes.length === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        No athletes assigned
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between md:w-auto">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={selectedAthlete?.avatar || "/placeholder-user.jpg"} alt={selectedAthlete?.firstName} />
              <AvatarFallback>{selectedAthlete?.firstName?.charAt(0)}{selectedAthlete?.lastName?.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">
              {selectedAthlete ? `${selectedAthlete.firstName} ${selectedAthlete.lastName}` : "Select Athlete"}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {athletes.map((athlete) => (
          <DropdownMenuItem
            key={athlete.id}
            onClick={() => handleAthleteSelect(athlete)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={athlete.avatar || "/placeholder-user.jpg"} alt={athlete.firstName} />
                <AvatarFallback>{athlete.firstName.charAt(0)}{athlete.lastName.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{athlete.firstName} {athlete.lastName}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
