import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Usertype = { username: string; role: string };

const AuthContext = createContext<{
  session: Session | null;

  user: Usertype | null;
}>({
  session: null,

  user: null,
});

export const useSession = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authSession, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<Usertype | null>(null);

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
    <AuthContext.Provider value={{ session: authSession, user }}>
      {children}
    </AuthContext.Provider>
  );
}
