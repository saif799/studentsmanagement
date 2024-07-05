import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "@/lib/supabase";
import FormField from "@/components/FormField";
import { Link } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth({
  role,
  signup,
}: {
  role: string;
  signup: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message, " this is not working");
    setLoading(false);
  }

  const onPasswordChange = (text: string) => setPassword(text);
  const onEmailChange = (text: string) => setEmail(text);
  return (
    <View className="p-3">
      <View>
        <View className=" gap-3 pr-2">
          <View>
            <FormField
              label="Email"
              value={email}
              placeholder="exemple@domain.com"
              onValueChange={onEmailChange}
            />
          </View>
          <View>
            <FormField
              label="Mot de passe"
              value={password}
              placeholder="mot de passe ici"
              secureTextEntry
              onValueChange={onPasswordChange}
            />
          </View>
        </View>
      </View>

      <View className="pt-8">
        <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          className="w-full py-4 justify-center items-center bg-primary rounded-lg"
        >
          <Text className=" text-white font-pbold text-base">Sign in</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <View className="mt-4 h-3 border-t-[0.5px] grow border-grayBorder"></View>
          <Text className="text-neutral-500"> Ou </Text>
          <View className="mt-4 h-3 border-t-[0.5px] border-grayBorder grow"></View>
        </View>

        <Link href={signup} asChild>
          <TouchableOpacity
            disabled={loading}
            className="w-full py-4 justify-center items-center border border-primary rounded-lg"
          >
            <Text className=" text-primary font-pbold text-base">
              Créer un compte
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
