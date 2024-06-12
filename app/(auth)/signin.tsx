import Auth from "../../components/Auth";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useSession } from "@/context/authProvider";
import { Image } from "react-native";
import { useAssets } from "expo-asset";

export default function SginIn() {
  // const [assets, error] = useAssets([
  //   require("@/assets/images/StudentImage.png"),
  // ]);

  const auth = useSession();

  if (auth.session) return <Redirect href="/" />;
  // if (assets)
  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        // contentContainerStyle={{ height: "100%" }}
      >
        <View className="h-full bg-primary">
          <View className=" h-[170px]"></View>

          {/* <Image source={assets[0]} className=" h-[301px] w-full" /> */}
          <View className="bg-white rounded-t-[30px] grow">
            <View className=" items-center justify-center py-6 ">
              <Text className=" text-3xl font-extrabold">Bienvenue sur</Text>
              <Text className="pb-5 text-3xl font-extrabold text-primary">
                مُراسَلتِي
              </Text>
              <Text className=" text-lg font-light text-neutral-600 px-4 ">
                Connecter les étudiants, les parents et
              </Text>
              <Text className=" text-lg text-neutral-600 px-4 font-light">
                les écoles pour un avenir meilleur.
              </Text>
            </View>
            <Auth />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
