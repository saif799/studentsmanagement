import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";
import FormField from "./FormField";

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

export default function Auth() {
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

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
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
              label="N° d’inscription"
              value={email}
              placeholder="xxxx-xxxx"
              onValueChange={onEmailChange}
            />
          </View>
          <View>
            <FormField
              label="Mot de passe"
              value={password}
              placeholder="Mot de passe"
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
          <Text className="text-neutral-500"> OR </Text>
          <View className="mt-4 h-3 border-t-[0.5px] border-grayBorder grow"></View>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signUpWithEmail()}
          className="w-full py-4 justify-center mt-2 items-center border-[1px] border-disabledGray rounded-lg"
        >
          <Text className=" text-disabledGray font-pbold text-base">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
    width: "100%",
  },
  mt20: {
    marginTop: 20,
  },
});
