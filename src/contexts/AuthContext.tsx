import React, {
  useReducer,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";

interface Children {
  children: any;
}

interface AuthContextType {
  loading: boolean;
  token: string | null;
  user: any;
}

const initialState: AuthContextType = {
  loading: true,
  token: null,
  user: null,
};

const AuthContext = createContext<any>(initialState);

const reducer = (state: AuthContextType, action: any) => {
  if (typeof window === undefined) {
    return state;
  }

  const user = localStorage.getItem("USER") || "";

  switch (action.type) {
    case "GET-CREDENTIALS":
      return {
        ...state,
        token: localStorage.getItem("TOKEN"),
        user: user ? JSON.parse(user) : user,
        loading: false,
      };
    case "SET-TOKEN":
      localStorage.setItem("TOKEN", action.payload);
      break;
    case "SET-USER":
      localStorage.setItem("USER", JSON.stringify(action.payload));
      break;
    case "LOGOUT":
      localStorage.clear();
      break;
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: Children): JSX.Element => {
  const [state, dispatch]: any = useReducer<any>(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET-CREDENTIALS" });
  }, [state?.loading, state?.token]);

  const contextValues: Record<string, any> = useMemo(() => {
    return {
      loading: state?.loading,
      token: state?.token,
      user: state?.user,
      getCredentials: () => dispatch({ type: "GET-CREDENTIALS" }),
      setToken: (payload: string) => dispatch({ type: "SET-TOKEN", payload }),
      setAuthUser: (payload: Record<string, any>) =>
        dispatch({ type: "SET-USER", payload }),
      logout: () => dispatch({ type: "LOGOUT" }),
    };
  }, [state]);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
