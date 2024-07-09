import React, { useState } from "react";
import { Alert, View, AppState, Text, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import FormField from "@/components/FormField";
import { Link } from "expo-router";
import { useSignupModal } from "@/context/useSignupModal";

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

export default function SignUpAuth({
  role,
  signIn,
}: {
  role: string;
  signIn: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  const { change } = useSignupModal();

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: userName,
          role,
        },
      },
    });
    if (error) Alert.alert(error.message);

    setLoading(false);
  }
  const onUserNameChange = (text: string) => setUserName(text);
  const onPasswordChange = (text: string) => setPassword(text);
  const onEmailChange = (text: string) => setEmail(text);
  return (
    <View className="p-3">
      <View>
        <View className=" gap-3 pr-2">
          <View>
            <FormField
              label="Nom"
              value={userName}
              placeholder="nom ici"
              onValueChange={onUserNameChange}
            />
          </View>
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
              placeholder="**********"
              secureTextEntry
              onValueChange={onPasswordChange}
            />
          </View>
        </View>
      </View>

      <View className="pt-8">
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            signUpWithEmail();
            change();
          }}
          className="w-full py-4 justify-center items-center bg-primary rounded-lg"
        >
          <Text className=" text-white font-pbold text-base">
            Créer un compte
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <View className="mt-4 h-3 border-t-[0.5px] grow border-grayBorder"></View>
          <Text className="text-neutral-500"> Ou </Text>
          <View className="mt-4 h-3 border-t-[0.5px] border-grayBorder grow"></View>
        </View>
        <Link href={signIn} asChild>
          <TouchableOpacity
            disabled={loading}
            className="w-full py-4 justify-center items-center border border-primary rounded-lg"
          >
            <Text className=" text-primary font-pbold text-base">
              Connecter
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
export function AdminSignUpAuth({
  role,
  signIn,
}: {
  role: string;
  signIn: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: userName,
          role,
        },
      },
    });
    if (error) Alert.alert(error.message);

    setLoading(false);
  }
  const onUserNameChange = (text: string) => setUserName(text);
  const onPasswordChange = (text: string) => setPassword(text);
  const onEmailChange = (text: string) => setEmail(text);
  return (
    <View className="p-3">
      <View>
        <View className=" gap-3 pr-2">
          <View>
            <FormField
              label="Nom d'établissement"
              value={userName}
              placeholder="Nom d'établissement ici"
              onValueChange={onUserNameChange}
            />
          </View>
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
              placeholder="**********"
              secureTextEntry
              onValueChange={onPasswordChange}
            />
          </View>
        </View>
      </View>

      <View className="pt-8">
        <TouchableOpacity
          disabled={loading}
          onPress={() => signUpWithEmail()}
          className="w-full py-4 justify-center items-center bg-primary rounded-lg"
        >
          <Text className=" text-white font-pbold text-base">
            Créer un compte
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <View className="mt-4 h-3 border-t-[0.5px] grow border-grayBorder"></View>
          <Text className="text-neutral-500"> Ou </Text>
          <View className="mt-4 h-3 border-t-[0.5px] border-grayBorder grow"></View>
        </View>
        <Link href={signIn} asChild>
          <TouchableOpacity
            disabled={loading}
            className="w-full py-4 justify-center items-center border border-primary rounded-lg"
          >
            <Text className=" text-primary font-pbold text-base">
              Connecter
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
