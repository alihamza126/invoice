// AuthContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Firebase config and auth instance
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Firebase Authentication State on Page Load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser(firebaseUser);
        // console.log(firebaseUser)
        localStorage.setItem("jwt", "true"); // Storing session state in localStorage
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // console.log("user not login")
        localStorage.removeItem("jwt");
      }
      setIsLoading(false); // Set loading to false after auth check completes
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential+"userCredential")
      setIsAuthenticated(true);
      setUser(userCredential.user);
      localStorage.setItem("jwt", "true");
    } catch (error) {
      console.error("Error during login:", error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("jwt");
      return error.message || "An unexpected error occurred.";
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("jwt");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook for easy access in components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
