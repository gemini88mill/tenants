import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_supabaseUrl,
  import.meta.env.VITE_supabaseKey
);