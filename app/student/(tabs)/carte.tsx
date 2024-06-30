import {
  StyleSheet,
  Image,
  View,
  Text,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useFonts } from "expo-font";
import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";
import { useSession } from "@/context/authProvider";
import { supabase } from "@/lib/supabase";
const student = {
  id: "200334045205",
  name: "Djari",
  fName: "Abdelbasset",
  pOfBirth: "Setif",
  dBirth: "10/01/2004",
  image: require("@/assets/images/wakil.jpg"),
};
export default function TabTwoScreen() {
  const [loading, setLoading] = useState(false);
  const [isViewingCard, setIsViewingCard] = useState(true);
  const [username, setUsername] = useState("");
  // const [userId, setUserId] = useState("");
  const [UserFamilyName, setUserFamilyName] = useState("");
  const [UserTown, setUserTown] = useState("");
  const [birthDate, setbirthDate] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  false;
  const session = useSession();
  useEffect(() => {
    if (session.session) getProfile();
  }, [session]);

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }
  async function getProfile() {
    try {
      setLoading(true);
      if (!session.session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username, avatar_url, birthDate, class, level, city, familyName`
        )
        .eq("id", session?.session.user.id)
        .single();
      if (error && status !== 406) {
        console.log(error);
        Alert.alert(error.message);
        throw error;
      }

      if (data) {
        setUsername(data.username);
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
  const [fontsLoaded, error] = useFonts({
    "Lateef-Bold": require("../../../assets/fonts/Lateef-Bold.ttf"),

    "Lateef-Light": require("../../../assets/fonts/Lateef-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => setIsViewingCard(!isViewingCard)}
      className="grow pb-[8vh] bg-white items-center  px-2"
    >
      {isViewingCard ? (
        <ImageBackground
          source={require("@/assets/images/student-card-bg-dark.jpg")}
          className="flex-1 relative  w-[60vh] -rotate-90 bg-white"
          resizeMode="contain"
        >
          <View className="absolute flex-row justify-around  px-3 items-center  w-full top-[37vh]">
            <View className="w-1/4 h-full bg-white p-1">
              <Image
                source={
                  avatarUrl
                    ? { uri: avatarUrl }
                    : require("@/assets/images/no_profile_pic.webp")
                }
                className="h-full w-full "
              />
            </View>
            <View>
              <Text className="font-ltfLight">Nom</Text>
              <Text className="font-ltfBold">{username}</Text>
              <Text className="font-ltfLight">Prénom</Text>
              <Text className="font-ltfBold">{UserFamilyName}</Text>
              <Text className="font-ltfLight">Date et ville de naissance</Text>
              <Text className="font-ltfBold">
                {birthDate} - {UserTown}
              </Text>
            </View>
            <View className="bg-white  p-1 w-fit">
              <QRCode value={session.session?.user.id} />
            </View>
          </View>
          <Text className="absolute bottom-[30%] self-end right-[10%] text-base font-ltfLight">
            {session.session?.user.id}
          </Text>
        </ImageBackground>
      ) : (
        <TouchableOpacity
          onPress={() => setIsViewingCard(!isViewingCard)}
          className="flex-1 h-full items-center justify-center  w-[60vh] bg-white p-1"
        >
          <Text className="text-darkestGray font-pmedium text-xl p-4">Qr étudiant</Text>
          <QRCode value={session.session?.user.id} size={250}/>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
