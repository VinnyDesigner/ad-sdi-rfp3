import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPersona } from '../types';
import { USER_PERSONAS } from '../data/mockData';

interface AuthContextType {
  currentUser: UserPersona;
  setCurrentPersona: (personaKey: string) => void;
  isAuthenticated: boolean;
  loginAs: (personaKey: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserPersona>(() => {
    const saved = localStorage.getItem('adsdi_user_persona');
    return saved && USER_PERSONAS[saved] ? USER_PERSONAS[saved] : USER_PERSONAS.khalid;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('adsdi_authenticated');
    return savedAuth ? JSON.parse(savedAuth) : true; // Default to signed in steward for prototype flow
  });

  useEffect(() => {
    localStorage.setItem('adsdi_user_persona', currentUser.id);
    localStorage.setItem('adsdi_authenticated', JSON.stringify(isAuthenticated));
  }, [currentUser, isAuthenticated]);

  const setCurrentPersona = (personaKey: string) => {
    if (USER_PERSONAS[personaKey]) {
      setCurrentUser(USER_PERSONAS[personaKey]);
      setIsAuthenticated(personaKey !== 'public');
    }
  };

  const loginAs = (personaKey: string) => {
    if (USER_PERSONAS[personaKey]) {
      setCurrentUser(USER_PERSONAS[personaKey]);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setCurrentUser(USER_PERSONAS.public);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentPersona, isAuthenticated, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
