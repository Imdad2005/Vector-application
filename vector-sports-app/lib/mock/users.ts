// This file contains mock user data for testing and development purposes
// In a real application, this would be stored in a database

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // In a real app, this would be hashed
  userType: 'athlete' | 'coach';
  avatar?: string;
  createdAt: Date;
}

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'athlete.alex@example.com',
    password: 'TestAthlete123!', // In a real app, this would be hashed
    userType: 'athlete',
    avatar: '/athlete-alex.png',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    firstName: 'Emma',
    lastName: 'Williams',
    email: 'coach.emma@example.com',
    password: 'TestCoach123!', // In a real app, this would be hashed
    userType: 'coach',
    avatar: '/coach-emma.png',
    createdAt: new Date('2022-11-10'),
  },
  {
    id: '3',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'coach.sarah@example.com',
    password: 'CoachPass456!', // In a real app, this would be hashed
    userType: 'coach',
    avatar: '/coach-sarah.png',
    createdAt: new Date('2022-10-05'),
  },
  {
    id: '4',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'nutritionist.mike@example.com',
    password: 'Nutrition789!', // In a real app, this would be hashed
    userType: 'coach',
    avatar: '/nutritionist-mike.png',
    createdAt: new Date('2022-12-20'),
  },
];
