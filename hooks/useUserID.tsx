import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";
import { AuthError } from "@supabase/supabase-js";

const useUserID = () => {
  const [userID, setUserID] = useState<string | null | undefined>("");
  const [sessionError, setSessionError] = useState<AuthError | null>();

  const getUserID = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    setUserID(session?.user?.id);

    setSessionError(error);
  };

  useEffect(() => {
    getUserID();
  }, []);

  return { userID, sessionError };
};

export default useUserID;
