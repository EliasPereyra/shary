import { createContext, useContext, useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { getCurrentUser } from "@/services/appwrite";

interface UserContext {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userAccount: Models.Document | null;
  setUserAccount: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  isLoading: boolean;
}

const UserContext = createContext<UserContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userAccount: null,
  setUserAccount: () => {},
  isLoading: true,
});

export const UserAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUserAccount(res);
          setIsLoggedIn(true);
        } else {
          setUserAccount(null);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userAccount,
        setUserAccount,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
