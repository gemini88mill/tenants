import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { getAddressTypes } from "../../../clients/addressTypes";
import { PostgrestError } from "@supabase/supabase-js";
import { tenantActions } from "./tenantActions";
import { TenantContextAction, TenantContextState, TenantContextType } from "./tenantTypes";







const TenantContext = createContext<TenantContextType | undefined>(undefined);
TenantContext.displayName = "TenantContext";

const initialState = {
  tenant: {
    personal: {
      firstName: "",
      lastName: "",
      birthDate: new Date().toISOString().split("T")[0],
      middleName: "",
    },
    contact: {
      email: "",
      phone: {
        number: "",
        type: "",
      },
    },
    address: [{
      type: {id: 0, name: ""},
      street: "",
      city: "",
      state: "",
      zip: "",
    }],
    emergencyContact: {
      name: "",
      phoneNumber: "",
    },
    emergencyContactRelationship: "",
    lease: {
      startDate: new Date(),
      endDate: new Date(),
      rentAmount: 0,
    },
  },
};

const tenantReducer = (state: TenantContextState, action: TenantContextAction) => {
  return tenantActions[action.type](state, action.payload);
};

export const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(tenantReducer, initialState);
  const [addressTypes, setAddressTypes] = useState<Array<{id: number; address_type: string;}> | PostgrestError | null>(null);

  const getAddressTypesAsync = async () => {
    const response = await getAddressTypes();
    setAddressTypes(response);
  };

  useEffect(() => {
    getAddressTypesAsync();
  }, []);

  const constants = useMemo(() => ({ addressTypes }), [addressTypes]);

  const value = useMemo(() => ({ 
    state, 
    dispatch, 
    constants 
  }), [state, dispatch, constants]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export const useTenantProvider = () => {
  const context = useContext(TenantContext);

  if (context === undefined) {
    throw new Error("useTenantProvider must be used within a TenantProvider");
  }

  return context;
};