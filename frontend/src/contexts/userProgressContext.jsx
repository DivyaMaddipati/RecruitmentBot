import { createContext, useContext, useState } from "react";

const UserProgressContext = createContext();

export function useUserProgress() {
  return useContext(UserProgressContext);
}

export function UserProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState(0);

  function changeUserProgress(num) {
    setUserProgress(num);
  }

  return (
    <UserProgressContext.Provider value={{ userProgress, changeUserProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
}
