export interface Personal {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  occupation: string;
  phone: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface FormData {
  type: string;
  action: "add" | "edit";
}

export interface TenantFormData extends FormData {
  type: "tenant";
  data?: {
    personal: Personal;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    }[];
  };
}

export interface OwnerFormData extends FormData {
  type: "owner";
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