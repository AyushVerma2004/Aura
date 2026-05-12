import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import axios from "axios";

// API CLIENT
const authAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ATTACH TOKEN TO EVERY REQUEST
authAPI.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // RESTORE SESSION
  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (!token) {
      setLoading(false);
      return;
    }

    authAPI
      .get("/auth/me")
      .then(({ data }) => {

        // IMPORTANT
        // backend should return user object
        setUser(data.user || data);

      })
      .catch((err) => {

        console.error("Session restore failed:", err);

        localStorage.removeItem("accessToken");

        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  // SAVE AUTH DATA
  const saveAuth = ({ accessToken, user }) => {

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    // OPTIONAL
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    setUser(user);
  };

  // REGISTER
  const register = useCallback(async (payload) => {

    const { data } = await authAPI.post(
      "/auth/register",
      payload
    );

    saveAuth(data);

    return data;

  }, []);

  // LOGIN
  const login = useCallback(async (payload) => {

    const { data } = await authAPI.post(
      "/auth/login",
      payload
    );

    saveAuth(data);

    return data;

  }, []);

  // GOOGLE LOGIN
  const googleLogin = useCallback(async (credential) => {

    const { data } = await authAPI.post(
      "/auth/google",
      { credential }
    );

    saveAuth(data);

    return data;

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// CUSTOM HOOK
export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used inside <AuthProvider>"
    );
  }

  return ctx;
}