import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import QRCode from "react-native-qrcode-svg";
const student = {
  id: "200334045205",
  name: "Djari",
  fName: "Abdelbasset",
  pOfBirth: "Setif",
  dBirth: "10/01/2004",
  image : require("@/assets/images/wakil.jpg"),
};
export default function TabTwoScreen() {
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
    <View className="grow pb-[9vh] bg-white items-center  px-2">
      <ImageBackground
        source={require("@/assets/images/student-card-bg-dark.jpg")}
        className="flex-1 relative  w-[60vh] -rotate-90 bg-white"
        resizeMode="contain"
      >
        <View className="absolute flex-row justify-around  px-3 items-center   w-full top-[37vh]">
          <View className="w-1/4 h-full bg-white p-1">
            <Image
              source={student.image}
              className="h-full w-full "
            />
          </View>
          <View>
            <Text className="font-ltfLight">Nom</Text>
            <Text className="font-ltfBold">{student.fName}</Text>
            <Text className="font-ltfLight">Prénom</Text>
            <Text className="font-ltfBold">{student.name}</Text>
            <Text className="font-ltfLight">Date et ville de naissance</Text>
            <Text className="font-ltfBold">
              {student.dBirth} - {student.pOfBirth}
            </Text>
          </View>
          <View className="bg-white  p-1 w-fit">
            <QRCode value={student.id} />
          </View>
        </View>
        <Text className="absolute bottom-[30%] self-end right-[10%] text-base font-ltfLight">
          {student.id}
        </Text>
      </ImageBackground>
    </View>
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
