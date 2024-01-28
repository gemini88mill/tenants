import { FormType } from "./formConfiguration.types";

export interface Personal {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  occupation: string;
  phone: string;
}

export interface Address {
  streetAddress: string;
  streerAddress2: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  addressType: string;
}

export interface FormData {
  action: "add" | "edit";
  type: FormType;
  data: object;
}

export interface TenantFormData extends FormData {
  type: FormType.Tenant;
  data: {
    personal: Personal;
    address: Address[];
  };
}

export interface OwnerFormData extends FormData {
  type: FormType.Owner;
  data: {
    personal: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    }[];
  };
}