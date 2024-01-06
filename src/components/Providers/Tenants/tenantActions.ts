import { TenantContextState } from "./tenantTypes";


export const tenantActions = {
  updatePersonal: (state: TenantContextState, payload:TenantContextState["tenant"]["personal"]):TenantContextState => {
    return {
      ...state,
      tenant: {
        ...state.tenant,
        personal: {
          ...state.tenant.personal,
          ...payload
        }
      } 
    };
  },
  updateContact: (state: TenantContextState, payload:TenantContextState["tenant"]["contact"]):TenantContextState => {
    return {
      ...state,
      tenant: {
        ...state.tenant,
        contact: {
          ...state.tenant.contact,
          ...payload
        }
      } 
    };
  },
  updateAddress: (state: TenantContextState, payload:TenantContextState["tenant"]["address"]):TenantContextState => {
    return {
      ...state,
      tenant: {
        ...state.tenant,
        address: state.tenant.address.filter((address) => address.id !== payload.id).concat(payload)
      } 
    };
  }
};