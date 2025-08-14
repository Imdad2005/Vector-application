// This file provides authentication-related utility functions using mock data

import { mockUsers, User } from './users';

export interface AuthResult {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

/**
 * Authenticates a user with email and password
 */
export function authenticateUser(email: string, password: string): AuthResult {
  // Find user with matching email
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  // User not found
  if (!user) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  
  // Password doesn't match
  if (user.password !== password) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }
  
  // Authentication successful
  const { password: _, ...userWithoutPassword } = user;
  return {
    success: true,
    message: 'Authentication successful',
    user: userWithoutPassword,
  };
}

/**
 * Registers a new user
 */
export function registerUser(userData: Omit<User, 'id' | 'createdAt'>): AuthResult {
  // Check if email already exists
  const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
  
  if (existingUser) {
    return {
      success: false,
      message: 'Email already in use',
    };
  }
  
  // Create new user (in a real app, you would add to database)
  const newUser: User = {
    ...userData,
    id: (mockUsers.length + 1).toString(),
    createdAt: new Date(),
  };
  
  // Add to mock users array (this won't persist after page refresh in this implementation)
  mockUsers.push(newUser);
  
  // Return success
  const { password: _, ...userWithoutPassword } = newUser;
  return {
    success: true,
    message: 'Registration successful',
    user: userWithoutPassword,
  };
}
