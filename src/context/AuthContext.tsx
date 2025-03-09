
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthState();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Mock implementation for demo purposes
      if (email && password) {
        // Simulate backend validation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user exists in localStorage (for demo only)
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const matchedUser = storedUsers.find((u: any) => 
          u.email === email && u.password === password // In real app, passwords would be hashed
        );
        
        if (matchedUser) {
          const { password, ...userWithoutPassword } = matchedUser;
          setUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Mock implementation for demo purposes
      if (name && email && password) {
        // Simulate backend processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user already exists (for demo only)
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = storedUsers.some((u: any) => u.email === email);
        
        if (userExists) {
          return false;
        }
        
        // Create new user
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password, // In real app, password would be hashed
        };
        
        // Save to localStorage (for demo only)
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        
        // Log user in
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
