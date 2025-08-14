// This file contains mock athlete-coach relationship data
// In a real application, this would be stored in a database

import { mockUsers } from './users';

export interface CoachAthleteRelationship {
  id: string;
  coachId: string;
  athleteId: string;
  startDate: Date;
  status: 'active' | 'paused' | 'ended';
}

// Create relationships between coaches and athletes
export const mockRelationships: CoachAthleteRelationship[] = [
  {
    id: '1',
    coachId: '2', // Emma Williams
    athleteId: '1', // Alex Johnson
    startDate: new Date('2023-03-15'),
    status: 'active',
  },
  {
    id: '2',
    coachId: '3', // Sarah Johnson
    athleteId: '1', // Alex Johnson
    startDate: new Date('2023-05-20'),
    status: 'active',
  },
  {
    id: '3',
    coachId: '4', // Mike Chen (Nutritionist)
    athleteId: '1', // Alex Johnson
    startDate: new Date('2023-04-10'),
    status: 'active',
  },
];

// Add more mock athletes for coaches to work with
export const mockAthletes = [
  {
    id: '5',
    firstName: 'Jordan',
    lastName: 'Miller',
    email: 'jordan.miller@example.com',
    password: 'AthleteJordan123!',
    userType: 'athlete' as const,
    avatar: '/placeholder-user.jpg',
    createdAt: new Date('2023-01-20'),
  },
  {
    id: '6',
    firstName: 'Taylor',
    lastName: 'Smith',
    email: 'taylor.smith@example.com',
    password: 'AthleteSmith456!',
    userType: 'athlete' as const,
    avatar: '/placeholder-user.jpg',
    createdAt: new Date('2023-02-12'),
  },
  {
    id: '7',
    firstName: 'Morgan',
    lastName: 'Davis',
    email: 'morgan.davis@example.com',
    password: 'AthleteDavis789!',
    userType: 'athlete' as const,
    avatar: '/placeholder-user.jpg',
    createdAt: new Date('2023-03-05'),
  },
];

// Function to get all athletes assigned to a coach
export function getCoachAthletes(coachId: string) {
  const relationships = mockRelationships.filter(
    rel => rel.coachId === coachId && rel.status === 'active'
  );
  
  // Get the athlete details for each relationship
  return relationships.map(rel => {
    const athlete = [...mockUsers, ...mockAthletes].find(user => user.id === rel.athleteId);
    if (!athlete) return null;
    
    // Don't expose password
    const { password, ...athleteData } = athlete;
    return {
      ...athleteData,
      relationshipId: rel.id,
      relationshipStartDate: rel.startDate,
    };
  }).filter(Boolean); // Remove any null values
}

// Add the new athletes to the mockUsers array
mockUsers.push(...mockAthletes);
