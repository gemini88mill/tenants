import { createContext, useCallback, useContext } from "react";
import { PersonalInput, usePersonal } from "../hooks/usePersonal";
import { addTenant } from "../../clients/tenant";
import { useAddresses } from "../hooks/useAddresses";

type FormDataContextType = {
  personal: {
    updatePersonal: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => void;
    getPersonal: () => PersonalInput;
    clearPersonal: () => void;
  }
  saveDataContext: () => void;
};

type FormDataContextProviderProps = {
  children: React.ReactNode;
};

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);
FormDataContext.displayName = "FormDataContext";

export const FormDataContextProvider = ({children}: FormDataContextProviderProps) => {
  const {personal, clearPersonal, getPersonal, updatePersonal} = usePersonal();
  const { addAddress, updateAddress, removeAddress, clearAddresses, getAddresses, getAddress } = useAddresses();

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