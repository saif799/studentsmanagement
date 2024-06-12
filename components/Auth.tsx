import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Input } from "@rneui/base";
import { router } from "expo-router";

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

  return (
    <View className="p-3">
      <View>
        <View className=" gap-3 pr-2">
          <View>
            <Text className="font-semibold text-lg pb-3">N° d’inscription</Text>

            <View className="w-full h-16 px-4 border-[1px] border-neutral-300 rounded-xl items-start">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full"
                value={email}
                placeholder="xxxx-xxxx"
                placeholderTextColor={"gray"}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
          </View>
          <View>
            <Text className="font-semibold pb-3 text-lg">Mot de passe</Text>
            <View className="w-full h-16 px-4 border-[1px] border-neutral-300 rounded-xl items-start">
              <TextInput
                className=" flex-1 text-base text-black  caret-black w-full"
                value={password}
                placeholder="Mot de passe"
                placeholderTextColor={"gray"}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.verticallySpaced}>
              <Text className="font-semibold pb-3 text-lg">Mot de passe</Text>

              {/* <Input
                style={{
                  // borderColor: "#000",

                  borderWidth: 0.5,
                  padding: 16,
                  borderRadius: 10,
                  width: "100%",
                  borderColor: "black",
                }}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                placeholder="Mot de passe"
                autoCapitalize={"none"}
              /> */}
            </View>
          </View>
        </View>
      </View>

      <View className="pt-8">
        <TouchableOpacity
          disabled={loading}
          onPress={() => signInWithEmail()}
          className="w-full h-12 justify-center items-center bg-primary rounded-lg"
        >
          <Text className=" text-white font-bold text-base">Sign in</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <View className="mt-4 h-3 border-t-[0.5px] grow border-neutral-400"></View>
          <Text className="text-neutral-500"> OR </Text>
          <View className="mt-4 h-3 border-t-[0.5px] border-neutral-400 grow"></View>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => signUpWithEmail()}
          className="w-full h-12 justify-center mt-2 items-center border-[1px] border-neutral-500 rounded-lg"
        >
          <Text className=" text-black font-bold text-base">Sign up</Text>
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

{
  /* <View style={styles.verticallySpaced}>
        <Input
          label="Mot de passe"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Mot de passe"
          autoCapitalize={"none"}
        />
      </View> */
}
