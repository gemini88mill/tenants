import { createContext, useCallback, useContext } from "react";
import { PersonalInput, usePersonal } from "../hooks/usePersonal";
import { addTenant } from "../../clients/tenant";
import { AddressInput, useAddresses } from "../hooks/useAddresses";

type FormDataContextType = {
  personal: {
    updatePersonal: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => void;
    getPersonal: () => PersonalInput;
    clearPersonal: () => void;
  },
  address: {
    addAddress: () => void;
    updateAddress: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string, index:number) => void;
    removeAddress: (index: number) => void;
    clearAddresses: () => void;
    getAddresses: () => AddressInput[];
    getAddress: (index: number) => AddressInput;
    addressTypes: Array<{id: number; address_type: string;}>;
  },
  saveDataContext: () => void;
};

type FormDataContextProviderProps = {
  children: React.ReactNode;
};

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);
FormDataContext.displayName = "FormDataContext";

export const FormDataContextProvider = ({children}: FormDataContextProviderProps) => {
  const { personal, clearPersonal, getPersonal, updatePersonal} = usePersonal();
  const { addAddress, updateAddress, removeAddress, clearAddresses, getAddresses, getAddress, addressTypes } = useAddresses();

  /**
   * todo: add address function to saveDataContext
   * todo: give address functions to Provider return
   * todo: 
   */

  const saveDataContext = useCallback(() => {
    addTenant({
      ...personal
    });
  }, [personal]);

  const value = {
    personal: {
      updatePersonal,
      getPersonal,
      clearPersonal,
    },
    address: {
      addAddress,
      updateAddress,
      removeAddress,
      clearAddresses,
      getAddresses,
      getAddress,
      addressTypes
    },
    saveDataContext
  };

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContextProvider = () => {
  const context = useContext(FormDataContext);
  if (context === undefined) {
    throw new Error(
      "useFormDataContextProvider must be used within a FormDataContextProvider"
    );
  }
  return context;
};