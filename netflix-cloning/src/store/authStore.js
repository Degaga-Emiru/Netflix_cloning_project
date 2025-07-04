import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      myList: [],

      // Login action
      login: (userData) => {
        set({ 
          user: userData,
          isAuthenticated: true,
          myList: userData.myList || [] // Initialize with saved list if available
        });
      },

      // Logout action
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          myList: [] 
        });
      },

      // Add to watchlist
      addToList: (movie) => {
        if (!get().isAuthenticated) return;
        set((state) => ({ 
          myList: [...state.myList, movie] 
        }));
      },

      // Remove from watchlist
      removeFromList: (movieId) => {
        set((state) => ({
          myList: state.myList.filter(item => item.id !== movieId)
        }));
      },

      // Initialize from storage
      initialize: () => {
        // Already handled by persist middleware
      }
    }),
    {
      name: 'netflix-auth-storage', // Unique name for localStorage
      getStorage: () => localStorage,
    }
  )
);