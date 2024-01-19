import { createContext, useContext, useMemo } from "react";
import { FormConfiguration, FormType } from "../../../types/formConfiguration.types";
import { PersonalInput } from "../molecules/InputGroups/PersonalInput";
import { FormDataContextProvider } from "./FormDataContext";
import { AddressInput } from "../molecules/InputGroups/AddressInput";

type FormContextProviderProps = {
  children: React.ReactNode;
  inputConfig?: FormConfiguration;
};

type FormContextValue = {
  inputGroups: React.ComponentType[];
  formAction?: string;
  formType?: FormType;
};

const getInputGroups = (formType?: FormType) => {
  switch (formType) {
    case FormType.Tenant:
      return [
        PersonalInput,
        AddressInput
      ];
    case FormType.Owner:
      return [];
    case FormType.Property:
      return [];
    case FormType.Schedule:
      return [];
    case FormType.Map:
      return [];
    default:
      return [];
  }
}

/**
 * FormContext, context for the form that will be generated in the SideInputDrawer.
 */
export const FormContext = createContext<FormContextValue | undefined>(undefined);
FormContext.displayName = "FormContext";

/**
 * FormContextProvider, provider for the FormContext.
 */
export const FormContextProvider = ({children, inputConfig}:FormContextProviderProps) => {

  const {formAction, formType} = inputConfig ?? {};
  const inputGroups = useMemo(() => getInputGroups(formType), [formType]);

  const value = useMemo(() => {
    return {
      inputGroups,
      formAction,
      formType
    };
  }, [formAction, formType, inputGroups])


  return (
    <FormContext.Provider value={value}>
      <FormDataContextProvider>
        {children}
      </FormDataContextProvider>  
    </FormContext.Provider>
  )
}

export const useFormContextProvider = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error(
      "useFormContextProvider must be used within a FormContextProvider"
    );
  }
  return context;
};