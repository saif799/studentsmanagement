import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
       
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

function Header() {
  return (
    <View className="px-3">
      <View className="h-[9vh] items-center justify-center">
        <Image
          source={require("@/assets/images/text-logo.png")}
          className="h-auto w-1/4"
          resizeMode="contain"
        />
      </View>
      <View className="rounded-xl overflow-hidden">
        <ImageBackground
          className="h-[20vh] rounded-3xl p-3 "
          source={require("@/assets/images/hero-bg.jpg")}
          resizeMode="cover"
          resizeMethod="auto"
        >
          <Text className="text-white font-pbold text-[20px]">Bienvenue sur Morassalaty!</Text>
          <Text className="text-white text-[17px] font-plight">
            Connectez-vous avec votre école et vos parents et Facilitez la
            communication et la collaboration.
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}
