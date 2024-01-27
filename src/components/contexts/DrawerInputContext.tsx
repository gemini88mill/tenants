import { createContext, useContext } from "react";

const DrawerInputContext = createContext({});
DrawerInputContext.displayName = "DrawerInputContext";

type DrawerInputContextProviderProps = {
  children: React.ReactNode;
  formType: string;
  formAction: string;
};

export const DrawerInputContextProvider = ({children, formAction, formType}: DrawerInputContextProviderProps) => {
  return (
    <DrawerInputContext.Provider value={{}}>
      {children}
    </DrawerInputContext.Provider>
  );
}

export const useDrawerInputContext = () => {
  const context = useContext(DrawerInputContext);
  if (context === undefined) {
    throw new Error(
      "useDrawerInputContext must be used within a DrawerInputContextProvider"
    );
  }

  return context;
};