import { supabase } from "./supabase";

type Profile = {
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: Date;
  phoneNumber: string;
  authId: string;
}


/**
 * Using the auth user uid, checks if the authenticated user has a profile, and returns the profile if it exists.
 */
export const checkForUserProfile = async (id?: string) => {
  if(!id) return null;

  const { data, error, status } = await supabase
    .from("profiles")
    .select("auth_id")
    .eq("auth_id", id)
    .single();

  if (status === 404) {
    return null;
  }

  if (error && status >= 400) {
    console.error(error);
    return;
  }

  return data?.auth_id;
};

export const createProfile = async (profile: Profile) => {
  const { data, error } = await supabase
    .from("profile")
    .insert({
      first_name: profile.firstName,
      middle_name: profile.middleName,
      last_name: profile.lastName,
      birth_date: profile.birthDate,
      auth_id: profile.authId,
    })
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}