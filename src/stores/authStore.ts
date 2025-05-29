
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  organizationId?: string;
  preferences: {
    theme: 'light' | 'dark';
    colorPalette: 'default' | 'purple' | 'green' | 'orange' | 'red';
    notifications: boolean;
    language: string;
    timezone: string;
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  applyTheme: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          preferences: {
            theme: 'light',
            colorPalette: 'default',
            notifications: true,
            language: 'en',
            timezone: 'UTC'
          }
        };
        
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          preferences: {
            theme: 'light',
            colorPalette: 'default',
            notifications: true,
            language: 'en',
            timezone: 'UTC'
          }
        };
        
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...userData } });
        }
      },

      updatePreferences: (preferences: Partial<User['preferences']>) => {
        const { user } = get();
        if (user) {
          const updatedUser = {
            ...user,
            preferences: { ...user.preferences, ...preferences }
          };
          set({ user: updatedUser });
          get().applyTheme();
        }
      },

      applyTheme: () => {
        const { user } = get();
        if (user) {
          // Apply theme
          if (user.preferences.theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          
          // Apply color palette
          document.documentElement.setAttribute('data-color-palette', user.preferences.colorPalette);
        }
      },
    }),
    {
      name: 'hirelytics-auth',
    }
  )
);
