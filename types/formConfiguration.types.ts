import { useAddresses } from "../src/components/hooks/useAddresses";
import { usePersonal } from "../src/components/hooks/usePersonal";

export enum FormType {
  Tenant = 'Tenant',
  Owner = 'Owner',
  Property = 'Property',
  Schedule = 'Schedule',
  Map = 'Map',
  None = 'None',
}

export enum FormAction {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export interface FormConfiguration {
  formType: FormType;
  formAction: FormAction;
  additionalInputs?: string[];
}

export interface TenantFormConfiguration extends FormConfiguration {
  inputGroups: string[];
}

interface FormDataBase {
  action: FormAction;
}

export interface FormDataType extends FormDataBase {
  type: "none";
}

export interface TenantDataType extends FormDataBase {
  personal: typeof usePersonal;
  address: typeof useAddresses;
  type: "tenant";
}

export interface TenantDrawerData {
  type: "tenant";

}