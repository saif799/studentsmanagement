import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import Avatar from "./Avatar";
export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [UserFamilyName, setUserFamilyName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [UserTown, setUserTown] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [level, setlevel] = useState("");
  const [Class, setClass] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username, avatar_url, birthDate, class, level, city, familyName`
        )
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setClass(data.class);
        setlevel(data.level);
        setUserFamilyName(data.familyName);
        setUserTown(data.city);
        setbirthDate(data.birthDate);
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
    website,
    avatar_url,
    familyName,
    city,
  }: {
    username: string;
    website?: string;
    avatar_url?: string;
    familyName: string;
    level: string;
    city: string;
    Class: string;
    birthDate: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        // website,
        avatar_url,
        familyName,
        class: Class,
        birthDate,
        level,
        city,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      Alert.alert("You data got updated successfully");

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

  function handle(text: string) {}

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.container}
      className="bg-white h-full pb-10"
    >
      <View className="items-center ">
        <Text className=" font-pbold text-xl pb-5">Profile d’élève</Text>
        {/* <Image
          source={require("@/assets/images/wakil.jpg")}
          className="h-[30vw] rounded-full w-[30vw]"
          resizeMode="contain"
        /> */}
        <Avatar
          size={120}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({
              username,
              // website,
              avatar_url: url,
              birthDate,
              city: UserTown,
              Class,
              familyName: UserFamilyName,
              level,
            });
          }}
        />
      </View>

      <View className="flex-row justify-between pt-6">
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">Nom</Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={UserFamilyName}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setUserFamilyName(e)}
            />
          </View>
        </View>
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">Prenom</Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={username}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setUsername(e)}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-between pt-6">
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">
            Date naissance
          </Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={birthDate}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setbirthDate(e)}
            />
          </View>
        </View>
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">
            ville de naissance
          </Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={UserTown}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setUserTown(e)}
            />
          </View>
        </View>
      </View>
      <View className="flex-row justify-between pt-6">
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">Niveau</Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={level}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setlevel(e)}
            />
          </View>
        </View>
        <View>
          <Text className="pl-2 font-pmedium pb-2 text-base">Classe</Text>
          <View className="w-[45vw] h-16 border-[1px] border-neutral-300 rounded-xl items-start ">
            <TextInput
              className=" flex-1 text-base text-black  caret-black w-full px-3 focus:caret-black"
              value={Class}
              placeholder={"xxxx-xxxx"}
              placeholderTextColor={"gray"}
              onChangeText={(e) => setClass(e)}
            />
          </View>
        </View>
      </View>

      <View className="pt-5 flex-row gap-3">
        <TouchableOpacity
          disabled={loading}
          onPress={() =>
            updateProfile({
              username,
              // website: UserFamilyName,
              // avatar_url: Class,
              familyName: UserFamilyName,
              birthDate,
              Class,
              city: UserTown,
              level,
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
          onPress={() => supabase.auth.signOut()}
          className="w-[45vw] py-4 justify-center items-center border-[1px] border-red-500 bg-white rounded-lg"
        >
          <Text className=" text-red-500  font-pbold text-base">Log out</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={() => {
            supabase.auth.signOut();
          }}
        />
      </View>
      <View>
       
      </View>
      {username ? (
        <View style={styles.qrstyle}>
          <QRCode value={username} />
        </View>
      ) : null} */}
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
