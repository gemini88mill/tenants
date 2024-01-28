import { createContext, useCallback, useContext, useState } from "react";
import { FormData } from "../../../types/formData.types";

type DrawerInputContextType<T> = {
  state: T;
  actions: {
    updateItem: (item: Partial<T>) => void;
  };
};

const DrawerInputContext = createContext<DrawerInputContextType<any> | undefined>(undefined);
DrawerInputContext.displayName = "DrawerInputContext";

type DrawerInputContextProviderProps<T> = {
  children: React.ReactNode;
  data: T;
};

export const DrawerInputContextProvider = <T extends FormData, > ({children, data}: DrawerInputContextProviderProps<T>) => {
  const [state, setState] = useState<T>(data);

  const updateItem = useCallback((item: Partial<T>) => {
    setState((prevState) => {
      return {
        ...prevState,
        ...item,
      };
    });
  }, []);

  return (
    <DrawerInputContext.Provider value={{
      state,
      actions: {
        updateItem,
      }
    }}>
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