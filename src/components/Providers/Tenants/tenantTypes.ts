import { PostgrestError } from "@supabase/supabase-js";
import { tenantActions } from "./tenantActions";

export type TenantContextState = {
  tenant: {
    personal: {
      firstName: string;
      middleName: string;
      lastName: string;
      birthDate: string;
      phoneNumber?: string;
    },
    contact: {
      email: string;
      phone: {
        number: string;
        type: string;
      };
    },
    address: Array<{
      type: {id: number; name: string;}
      street: string;
      city: string;
      state: string;
      zip: string;
    }>,
    emergencyContact: {
      name: string;
      phoneNumber: string;
    },
    emergencyContactRelationship: string;
    emergencyContactEmail?: string;
    emergencyContactAddress?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    },
    lease: {
      startDate: Date;
      endDate: Date;
      rentAmount: number;
    }
  }
};

export type TenantContextAction = {
  type: keyof typeof tenantActions;
  payload: any;
};

export type TenantContextType = {
  state: TenantContextState;
  dispatch: React.Dispatch<TenantContextAction>;
  constants: {
    addressTypes: Array<{id: number; address_type: string;}> | PostgrestError | null,
  }
};