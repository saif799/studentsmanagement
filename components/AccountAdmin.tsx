import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import Avatar from "@/components/Avatar";
import { queryClient } from "@/app/_layout";
import { LoadingAnimationComp } from "./LoadingComp";
import { useUser } from "@/context/useUser";

export default function AccountAdmin({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [UserTown, setUserTown] = useState("");
  const { setUser } = useUser();

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url, city`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);

        setUserTown(data.city);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    avatar_url,
    city,
  }: {
    username: string;
    avatar_url?: string;
    city: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        avatar_url,
        city,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      Alert.alert("Votre profil a été mis à jour avec succès");

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingAnimationComp />;
  }

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
      className="bg-white h-full overflow-visible"
    >
      <View className="items-center ">
        <Text className=" font-pmedium text-darkestGray text-xl pb-5">
          Profile établissement
        </Text>
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({
              username,
              avatar_url: url,
              city: UserTown,
            });
          }}
        />
      </View>

      <View className="flex-row pt-6">
        <View className="w-full">
          <Text className="pl-2 font-pmedium pb-2 text-base">
            Nom d'établissement
          </Text>
          <View className="w-full h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={username}
              placeholder={"prénom"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setUsername(e)}
            />
          </View>
        </View>
      </View>
      <View className="flex-row pt-6">
        <View className="w-full">
          <Text className="pl-2 font-pmedium pb-2 text-base">Ville</Text>
          <View className="w-full h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={UserTown}
              placeholder={"ville"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setUserTown(e)}
            />
          </View>
        </View>
      </View>

      <View className="pt-5 flex-row gap-3 pb-10">
        <TouchableOpacity
          disabled={loading}
          onPress={() =>
            updateProfile({
              username,
              city: UserTown,
            })
          }
          className="py-4 w-[45vw] justify-center items-center bg-primary rounded-lg"
        >
          <Text className=" text-white font-pbold text-base">
            {!loading ? "Enregistrer" : "Updating"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            supabase.auth.signOut();
            // queryClient.clear();
            // setUser(null);
          }}
          className="w-[45vw] py-4 justify-center items-center border-[1px] border-red-500 bg-white rounded-lg"
        >
          <Text className=" text-red-500  font-pbold text-base">
            Déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  qrstyle: {
    marginTop: 5,
    alignSelf: "center",
  },
});
