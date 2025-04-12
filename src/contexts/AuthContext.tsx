import React, { createContext, useContext,  } from "react";
import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/services/authenticationApi";
import { getToken } from "@/util/tokenUtil";
import { User } from "@/types/User";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = typeof window !== "undefined" ? getToken() : null;
  const skipQuery = !token;

  const {
    data: user,
    isLoading,
    refetch,
  } = useGetCurrentUserQuery(undefined, {
    skip: skipQuery, // <- Don’t call if token is missing
  });
  const [loginMutation] = useLoginMutation();
  const [logoutMutation, isLogoutSuccess] = useLogoutMutation();
  const [registerMutation] = useRegisterMutation();

  const login = async (email: string, password: string) => {
    try {
      await loginMutation({ email, password }).unwrap();
      refetch(); // <- Ensure updated user info
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    try {
      await registerMutation({ email, password, firstName, lastName }).unwrap();
      refetch(); // <- Ensure updated user info
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // useEffect(() => {
  //   if (isLogoutSuccess) {
  //     clearToken();
  //   }
  // }, [isLogoutSuccess]);


  const isAdmin = () => {
    return user?.role === "ADMIN";
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        logout,
        register,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
