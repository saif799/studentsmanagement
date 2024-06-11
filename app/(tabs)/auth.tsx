import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Auth from "../../components/Auth";
import Account from "../../components/Account";
import { View } from "react-native";
import { Session } from "@supabase/supabase-js";
import { useSession } from "@/context/authProvider";
import { Redirect } from "expo-router";

export default function App() {
  const auth = useSession();
  if (!auth.session) return <Redirect href="/signin" />;
  return (
    <View>
      <Account key={auth.session?.user.id} session={auth.session} />
    </View>
  );
}
