import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'caixa';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole) => {
    const users = {
      superadmin: { id: '1', name: 'Super Admin', role: 'superadmin' as const, email: 'super@daora.com' },
      admin: { id: '2', name: 'Admin Loja', role: 'admin' as const, email: 'admin@daora.com' },
      caixa: { id: '3', name: 'Operador Caixa', role: 'caixa' as const, email: 'caixa@daora.com' }
    };
    setUser(users[role]);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
