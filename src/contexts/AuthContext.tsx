import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'readonly';
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  isAuthenticated: boolean;
  hasPermission: (requiredRoles: string[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'staff@example.com',
    password: 'staff123',
    name: 'Staff User',
    role: 'staff' as const,
  },
  {
    id: '3',
    email: 'readonly@example.com',
    password: 'readonly123',
    name: 'Readonly User',
    role: 'readonly' as const,
  },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('ptams_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock API call - in a real app, this would be a fetch to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('ptams_user', JSON.stringify(userWithoutPassword));
        toast({
          title: 'Connexion réussie',
          description: `Bienvenue, ${userWithoutPassword.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast({
        title: 'Erreur de connexion',
        description:
          error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock registration - in a real app, this would be a fetch to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser = {
        id: String(MOCK_USERS.length + 1),
        email,
        name,
        role: 'staff' as const,
      };

      setUser(newUser);
      localStorage.setItem('ptams_user', JSON.stringify(newUser));
      toast({
        title: 'Inscription réussie',
        description: `Bienvenue, ${name}!`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description:
          error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ptams_user');
    setUser(null);
    toast({
      title: 'Déconnexion réussie',
    });
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Mock forgot password - in a real app, this would be a fetch to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userExists = MOCK_USERS.some((u) => u.email === email);

      if (!userExists) {
        throw new Error('Email not found');
      }

      toast({
        title: 'Réinitialisation du mot de passe',
        description:
          'Si un compte existe avec cet email, vous recevrez un email avec les instructions.',
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description:
          error instanceof Error ? error.message : "Une erreur s'est produite",
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (requiredRoles: string[]) => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        forgotPassword,
        isAuthenticated: !!user,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
