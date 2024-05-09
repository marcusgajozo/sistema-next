import { checkUserAuthenticated } from "@/shared/functions/check-user-authenticated";
import { apiConfig } from "@/shared/services/api/api-config";
import { setStorageItem } from "@/shared/utils/localStorage";
import { createContext, useEffect, useState } from "react";

type loginCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (credentials: loginCredentials) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (checkUserAuthenticated()) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = ({ email, password }: loginCredentials) => {
    apiConfig()
      .post("/login", { email, password })
      .then((res) => {
        if (res?.data) {
          setStorageItem("token", res?.data?.access_token);
          setIsAuthenticated(true);
        }
      })
      .catch((e) => console.log(e?.message));
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
