import { QueryData } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { PersonalInput } from "../components/hooks/usePersonal";

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

export const addTenant = async (personal: PersonalInput) => {
  // grabs current session from supabase to add to audit info. 
  const {data: sessionData, error: sessionError} = await supabase.auth.getSession();

  if (sessionError || sessionData.session == null) throw sessionError;

  //creates audit data for the new tenant
  const { data: auditData, error: auditError } = await supabase.from('audit_info').insert({
    created_by: sessionData?.session.user?.id,
    created_at: new Date().toISOString(),
  }).select('id').single();

  if (auditError) throw auditError;

  // creates the new tenant profile
  const { data, error } = await supabase.from('profiles').insert({
    first_name: personal.firstName,
    middle_name: personal.middleName,
    last_name: personal.lastName,
    birth_date: isNaN(Date.parse(personal.birthDate)) ? null : personal.birthDate,
    audit_key: auditData?.id,
    auth_id: crypto.randomUUID(),
  }).single();

  if (error) throw error;

  return data;
};

export const getTenants = async ():Promise<Tenants> => {
  const { data, error } = await tenants

  if (error) throw error;

  return data;
};
