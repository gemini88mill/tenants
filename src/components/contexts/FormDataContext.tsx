import { createContext, useCallback, useContext, useMemo } from "react";
import { addTenant } from "../../clients/tenant";
import { AddressInput, useAddresses } from "../hooks/useAddresses";
import { PersonalInput, usePersonal } from "../hooks/usePersonal";

type FormDataContextType = {
  personal: {
    updatePersonal: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      key: string
    ) => void;
    getPersonal: () => PersonalInput;
    clearPersonal: () => void;
  };
  address: {
    addAddress: () => void;
    updateAddress: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      key: string,
      index: number
    ) => void;
    removeAddress: (index: number) => void;
    clearAddresses: () => void;
    getAddresses: () => AddressInput[];
    getAddress: (index: number) => AddressInput;
    addressTypes: Array<{ id: number; address_type: string }>;
  };
  saveDataContext: () => void;
};

type FormDataContextProviderProps = {
  children: React.ReactNode;
};

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);
FormDataContext.displayName = "FormDataContext";

//todo: make FormDataContextProvider generic
//todo: the generic will be the type of the data that will be saved using the hooks given in the context

/**
 * Notes: T should denote the type of data that the context will be saving. For example if T is a tenant type, then the
 * form data context should be able to have all the functions to save a tenant.
 */

export const FormDataContextProvider = ({
  children,
}: FormDataContextProviderProps) => {
  const { personal, clearPersonal, getPersonal, updatePersonal } = 
    usePersonal();
  const {
    addAddress,
    updateAddress,
    removeAddress,
    clearAddresses,
    getAddresses,
    getAddress,
    addressTypes,
  } = useAddresses();

  

  const saveDataContext = useCallback(() => {
    addTenant({
      ...personal,
    });
  }, [personal]);

  const value = useMemo(
    () => ({
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
        addressTypes,
      },
      saveDataContext,
    }),
    [
      addAddress,
      addressTypes,
      clearAddresses,
      clearPersonal,
      getAddress,
      getAddresses,
      getPersonal,
      removeAddress,
      saveDataContext,
      updateAddress,
      updatePersonal,
    ]
  );

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
