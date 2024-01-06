import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Session } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { checkForUserProfile } from "./clients/profiles";
import { Dashboard } from "./components/organisms/Dashboard/Dashboard";
import { SignUp } from "./components/organisms/SignUp/Signup";
import { supabase } from "./clients/supabase";

export const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [hasUserProfile, setHasUserProfile] = useState<boolean>(false);

  const getHasUserProfile = useCallback(async () => {
    return await checkForUserProfile(session?.user?.id);
  }, [session?.user?.id]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [session]);

  useEffect(() => {
    if (session?.user?.id) {
      getHasUserProfile().then((hasUserProfile) => {
        setHasUserProfile(hasUserProfile);
      });
    }
  }, [getHasUserProfile, hasUserProfile, session?.user?.id]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            input: {
              color: "white",
            },
          },
        }}
        localization={{
          variables: {
            sign_in: {
              email_input_placeholder: "user@example.com",
            },
            sign_up: {
              button_label: "Create Account",
            },
          },
        }}
      />
    );
  } else {
    return hasUserProfile ? (
      <Dashboard />
    ) : (
      <SignUp {...session?.user} />
    );
  }
};
