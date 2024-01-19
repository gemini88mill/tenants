import { createContext, useCallback, useContext, useState } from "react";

type FormDataContextType = {
  updatePersonal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getPersonal: () => PersonalInput;
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

const FormDataContext = createContext<FormDataContextType>({
  updatePersonal: () => {},
});
FormDataContext.displayName = "FormDataContext";

export const FormDataContextProvider = ({children}: FormDataContextProviderProps) => {
  const [personal, setPersonal] = useState<PersonalInput>({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phone: "",
  });

  const updatePersonal = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonal((prev) => ({...prev, [e.target.name]: e.target.value}));
  }, []);

  const getPersonal = useCallback(() => {
    return personal;
  }, [personal]);

  const value = {
    updatePersonal: updatePersonal,
    getPersonal: getPersonal,
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