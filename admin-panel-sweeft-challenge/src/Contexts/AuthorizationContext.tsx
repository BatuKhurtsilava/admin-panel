import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthorizationContextType {
  loggedin: boolean | null;
  setLoggedin: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthorizationContext = createContext<
  AuthorizationContextType | undefined
>(undefined);

export const AuthorizationContextProvider: React.FC<any> = ({ children }) => {
  const [loggedin, setLoggedin] = useState<boolean | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const token = storedToken ? storedToken : undefined;
    if (token) setLoggedin(true);
  });

  return (
    <AuthorizationContext.Provider value={{ loggedin, setLoggedin }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorizationContext = () => {
  const context = useContext(AuthorizationContext);
  if (context === undefined) {
    throw new Error(
      "useAuthorizationContext must be used within an AuthorizationContextProvider"
    );
  }
  return context;
};
