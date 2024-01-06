import { supabase } from "./supabase";

export const getAddressTypes = async () => {
  const {data: address_type, error, status} = await supabase
    .from("address_type")
    .select("*");

  if (status >= 200 && status < 300) {
    return address_type;
  }

  return error;
};