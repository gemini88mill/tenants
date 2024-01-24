import { createContext, useCallback, useContext, useState } from "react";
import { FormData } from "../../../types/formData.types";

type DrawerFormContextProviderProps<T> = {
  children: React.ReactNode;
  data: T;
};

type DrawerFormContextValue<T> = {
  state: T;
  actions: {
    updateData: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      key: string
    ) => void;
    clearData: () => void;
    getData: () => T;
    saveData: () => void;
  };
  constants: object;
};

const DrawerFormContext = createContext<DrawerFormContextValue<FormData> | undefined>(undefined);
DrawerFormContext.displayName = "DrawerFormContext";

/**
 * Type examples:
 * Tenant Type: Personal, Address, Contact, Emergency Contact, Vehicle, Pet, Lease, Payment, Note
 * Owner Type: Personal, Address, Contact
 * Property Type: Address, Contact, Note
 *
 */

export const DrawerFormContextProvider = <T extends FormData>({
  children,
  data: initData,
}: DrawerFormContextProviderProps<T>) => {
  const [data, setData] = useState<T>(initData);

  const updateData = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      key: string
    ) => {
      setData((prevData) => ({ ...prevData, [key]: e.target.value }));
    },
    []
  );

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
    <DrawerFormContext.Provider
      value={{
        state: data,
        actions: { updateData, clearData, getData, saveData },
        constants: {},
      }}
    >
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
