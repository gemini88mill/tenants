import { useAddresses } from "../src/components/hooks/useAddresses";
import { usePersonal } from "../src/components/hooks/usePersonal";

export enum FormType {
  Tenant = 'tenant',
  Owner = 'owner',
  Property = 'property',
  Schedule = 'schedule',
  Map = 'map',
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

export interface FormDataType {
  type: FormType;
  action: FormAction;
}

export interface TenantDataType extends FormDataType {
  personal: typeof usePersonal;
  address: typeof useAddresses;
}