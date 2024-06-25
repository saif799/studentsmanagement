import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUser } from "./getUser";

type Usertype = {
  role: "parent" | "admin" | "student";
  username: string;
};

const AuthContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const useSession = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authSession, setSession] = useState<Session | null>(null);
  const { setUser } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("role, username")
      .eq("id", authSession?.user.id)
      .then(({ data }) => {
        if (data) {
          const fetchedUser: Usertype = data[0];
          setUser(fetchedUser);
        }
      });
  }, [authSession]);

  return (
    <AuthContext.Provider value={{ session: authSession }}>
      {children}
    </AuthContext.Provider>
  );
}
