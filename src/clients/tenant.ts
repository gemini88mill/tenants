import { QueryData } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const tenants = supabase
  .from('tenants')
  .select(`
    tenant_id,
    lease_start_date,
    lease_end_date,
    profiles (
      profile_id,
      first_name,
      middle_name,
      last_name,
      birth_date,
      occupation,
      addresses (
        address_id,
        street_address,
        city,
        state_province,
        postal_code,
        country,
        address_type (
          address_type
        )
      )
    ),
    addresses (
      address_id,
      street_address,
      city,
      state_province,
      postal_code,
      country,
      address_type (
        address_type
      )
    )
  `);
export type Tenants = QueryData<typeof tenants>;
export type Tenant = Tenants[number];


export const getTenants = async ():Promise<Tenants> => {
  const { data, error } = await tenants

  if (error) throw error;

  return data;
};
