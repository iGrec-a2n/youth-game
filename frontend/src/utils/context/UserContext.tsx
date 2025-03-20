import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  user_id: string;
  username: string;
  country: string;
}

interface UserContextType {
  user?: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Charger l'utilisateur depuis localStorage au démarrage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Stocker dans localStorage
    } else {
      localStorage.removeItem("user"); // Supprimer si déconnexion
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte utilisateur
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
