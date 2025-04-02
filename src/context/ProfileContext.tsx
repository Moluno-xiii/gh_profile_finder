/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

const api_key = import.meta.env.VITE_GH_PERSONAL_TOKEN;
const api_url = import.meta.env.VITE_API_URL;

if (!api_key || !api_url) {
  throw new Error("API key or URL is missing from environment variables.");
}

interface ContextValues {
  data: any;
  repositoryData: any;
  errorMessage: string;
  isLoading: boolean;
  fetchUserData: (event: React.FormEvent<HTMLFormElement>) => void;
  fetchRepositoryData: (userName: string) => void;
}

const ProfileContext = createContext<ContextValues>({
  data: {},
  repositoryData: [],
  fetchUserData: () => {},
  fetchRepositoryData: () => {},
  errorMessage: "",
  isLoading: false,
});

interface State {
  errorMessage: string;
  isLoading: boolean;
  data: any;
  repositoryData: any;
}

type Actions =
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER_DATA"; payload: boolean }
  | { type: "SET_REPO_DATA"; payload: any };

const initialState: State = {
  errorMessage: "",
  isLoading: false,
  data: {},
  repositoryData: null,
};

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER_DATA":
      return {
        ...state,
        data: action.payload,
        repositoryData: null,
      };
    case "SET_REPO_DATA":
      return {
        ...state,
        repositoryData: action.payload,
      };
    default:
      return state;
  }
}

const ProfileContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [{ errorMessage, isLoading, data, repositoryData }, dispatch] =
    useReducer(reducer, initialState);

  async function fetchUserData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObj = Object.fromEntries(formData);
    const userName = dataObj.userName;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: "" });

    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${api_key}`,
        },
      };

      const response = await fetch(
        `${api_url}/users/${userName}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      dispatch({ type: "SET_USER_DATA", payload: data });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function fetchRepositoryData(userName: string) {
    const requestOptions = {
      method: "GET",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${api_key}`,
      },
    };

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: "" });

    try {
      const response = await fetch(
        `${api_url}/users/${userName}/repos`,
        requestOptions
      );
      if (!response.ok) {
        dispatch({ type: "SET_ERROR", payload: response.statusText });
        throw new Error(response.statusText);
      }
      const repositoryData = await response.json();
      dispatch({ type: "SET_REPO_DATA", payload: repositoryData });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        fetchUserData,
        fetchRepositoryData,
        data,
        repositoryData,
        errorMessage,
        isLoading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("ProfileContext was used outside of its scope");
  return context;
};
