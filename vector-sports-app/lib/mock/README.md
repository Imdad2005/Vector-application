# Mock Authentication System for Vector Sports App

This folder contains mock user data and authentication functions for development and testing purposes.

## Predefined Test Accounts

You can use the following accounts to test the login functionality:

### Athlete Account
- **Email**: athlete.alex@example.com
- **Password**: TestAthlete123!

### Coach Accounts
- **Email**: coach.emma@example.com
- **Password**: TestCoach123!

- **Email**: coach.sarah@example.com
- **Password**: CoachPass456!

- **Email**: nutritionist.mike@example.com
- **Password**: Nutrition789!

## How It Works

The mock authentication system is implemented in two files:

1. `users.ts` - Contains the mock user data
2. `auth.ts` - Contains authentication functions (login and registration)

### Implementation Details

- User data is stored in memory and will reset when the page is refreshed
- Passwords are stored in plain text (in a real app, they would be hashed)
- New user registrations are added to the in-memory array

## Next Steps for Production

In a real production environment, you would replace this mock system with:

1. A proper backend API with secure authentication
2. Password hashing and salting
3. JWT or session-based authentication
4. Database storage for user data
5. Email verification
6. Password reset functionality
