import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, validateSessionToken } from "../api/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { TOKEN_KEY, IS_DATASET_USER_KEY } from "../utils/constants";
import { useAppDispatch } from "../storeRedux/store";
import { resetRecommendations } from "../storeRedux/reducers/recommendationsSlice";


/**
 * Type definition for the authentication context.
 */
type AuthContextType = {
  token: string | null;
  isDatasetUser: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onLogout: () => void;
  onRegister: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


/**
 * Provides an authentication context for child components.
 */
export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [isDatasetUser, setIsDatasetUser] = useState<boolean>(JSON.parse(localStorage.getItem(IS_DATASET_USER_KEY) ?? "false"));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Authenticate the user when the component mounts.
  useEffect(() => {
    const validateUser = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedIsDatasetUser = localStorage.getItem(IS_DATASET_USER_KEY);

      if (storedToken && storedIsDatasetUser !== null) {
        try {
          const data = await validateSessionToken(storedToken); // replace with your API endpoint
          if (data.isAuthenticated) {
            setToken(storedToken);
            setIsDatasetUser(JSON.parse(storedIsDatasetUser))
          } else {
            logout();
            navigate("/login");
          }
        } catch (error: any) {
          if (error.response && error.response.status == 401) {
            console.error("Error during user validation", error);
            logout();
            navigate("/login");
          } else {
            navigate("/server-error");
          }
        }
      }
      setIsLoading(false);
    };

    validateUser();
  }, [navigate]); // ensure it has the latest function instance.

  // Log in the user and update the context state.
  const login = async (username: string, password: string) => {
    const response = await loginUser({
      username: username,
      password: password,
    });
    localStorage.setItem(TOKEN_KEY, response.access_token);
    setToken(response.access_token);
    localStorage.setItem(IS_DATASET_USER_KEY,  JSON.stringify(response.is_dataset_user));
    setIsDatasetUser(response.is_dataset_user);

  };

  // Register a new user and update the context state.
  const register = async (username: string, password: string) => {
    const response = await registerUser({
      username: username,
      password: password,
    });
    localStorage.setItem(TOKEN_KEY, response.access_token);
    setToken(response.access_token);
    localStorage.setItem(IS_DATASET_USER_KEY, JSON.stringify(false));
    setIsDatasetUser(false);
  };

  // Log out the user and clear the context state.
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(IS_DATASET_USER_KEY);
    setToken(null);
    setIsDatasetUser(false);
    dispatch(resetRecommendations());
  };

  // Value to be passed to the context's Provider.
  const value = {
    token,
    isDatasetUser,
    onLogin: login,
    onLogout: logout,
    onRegister: register,
  };

  // Return the Provider with the context value, wrapping the children.
  return <AuthContext.Provider value={value}>{isLoading ? <div>Loading...</div> : children}</AuthContext.Provider>;
};


/**
 * Custom hook to use the authentication context.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
