import { createContext, useCallback, useContext } from "react";
import { usePersonal } from "../hooks/usePersonal";

type FormDataContextType = {
  updatePersonal: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key:string) => void;
  getPersonal: () => PersonalInput;
  saveDataContext: () => void;
  clearPersonal: () => void;
};

type FormDataContextProviderProps = {
  children: React.ReactNode;
};

type PersonalInput = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  email: string;
  phone: string;
};

const FormDataContext = createContext<FormDataContextType | undefined>(undefined);
FormDataContext.displayName = "FormDataContext";

export const FormDataContextProvider = ({children}: FormDataContextProviderProps) => {
  const {personal, clearPersonal, getPersonal, updatePersonal} = usePersonal();

  const saveDataContext = useCallback(() => {
    // Save data to the database
    console.log(personal);
  }, [personal]);

  const value = {
    updatePersonal: updatePersonal,
    getPersonal: getPersonal,
    saveDataContext: saveDataContext,
    clearPersonal: clearPersonal,
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