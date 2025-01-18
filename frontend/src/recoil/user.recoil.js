import { atom } from 'recoil';

// Atom for current user data
export const currentUserState = atom({
  key: "currentUserState", // More specific key
  default: null, // Use null or {} if user data is an object
});

// Atom for authentication status
export const isUserLoggedIn = atom({
  key: "isUserLoggedIn", // Simplified key
  default: false,
});