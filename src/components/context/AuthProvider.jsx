import { createContext, useState } from "react";

const AuthContext = createContext({
  auth: {}, // Provide a default value for auth
  setAuth: () => {}, // Provide a default value for setAuth
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
