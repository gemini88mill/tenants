import { createContext, useCallback, useContext, useState } from "react";
import { FormAction, FormType } from "../../../types/formConfiguration.types";

const DrawerFormContext = createContext({});
DrawerFormContext.displayName = "DrawerFormContext";

type DrawerFormContextProviderProps<T, K> = {
  children: React.ReactNode;
  formAction: FormAction;
  formType: FormType;
  data: T;
  property: K;
};

/**
 * Type examples: 
 * Tenant Type: Personal, Address, Contact, Emergency Contact, Vehicle, Pet, Lease, Payment, Note
 * Owner Type: Personal, Address, Contact
 * Property Type: Address, Contact, Note
 * 
 */

/**
 * todo: add K to denote any key inside T. This will be used to update the data in the context.
 * todo: provide a function that will set the configuration of the data within the drawer. 
 */

export const DrawerFormContextProvider = <T extends object, K extends keyof T>({ children }:DrawerFormContextProviderProps<T, K>) => {
  const [data, setData] = useState<T>({} as T);

  const updateData = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
    setData((prevData) => ({ ...prevData, [key]: e.target.value }));
  }, []);

  const clearData = useCallback(() => {
    setData({} as T);
  }, []);

  const getData = useCallback(() => {
    return data;
  }, [data]);

  const saveData = useCallback(() => {
    console.log("saveData");
  }, []);

  return (
    <DrawerFormContext.Provider value={{
      state: data,
      actions: {updateData, clearData, getData, saveData},
      constants: {}
    }}>
      {children}
    </DrawerFormContext.Provider>
  );
};

export const useDrawerFormContextProvider = () => {
  const context = useContext(DrawerFormContext);
  if (context === undefined) {
    throw new Error(
      "useDrawerFormContextProvider must be used within a DrawerFormContextProvider"
    );
  }
  return context;
};