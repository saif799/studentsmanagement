import Auth from "../../components/Auth";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { useSession } from "@/context/authProvider";
import { ArrowLeft } from "lucide-react-native";

import { Image } from "react-native";
import { useAssets } from "expo-asset";

export default function SginIn() {
  // const [assets, error] = useAssets([
  //   require("@/assets/images/StudentImage.png"),
  // ]);

  const auth = useSession();

  if (auth.session) return <Redirect href="/(tabs)" />;
  // if (assets)
  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        // contentContainerStyle={{ height: "100%" }}
      >
        <View className="h-full bg-black relative">
          <ImageBackground
            source={require("@/assets/images/studentImage.jpg")}
            className=" h-[175px] pt-7"
          >
            <View className="flex-row items-center pl-2">
              <Link
                href={"/"}
                asChild
                className="rounded-full bg-white p-2"
              >
                    <ArrowLeft size={35} color={"green"} strokeWidth={2} />
              </Link>
              <Text className="text-white -left-3 font-psemibold text-xl text-center grow">
                Login étudiant
              </Text>
            </View>
          </ImageBackground>

          {/* <Image source={assets[0]} className=" h-[301px] w-full" /> */}
          <View className="bg-white rounded-t-[30px] grow">
            <View className=" items-center justify-center py-6 ">
              <Text className=" text-3xl font-pextrabold">Bienvenue sur</Text>
              <Text className="pb-5 text-3xl font-pextrabold text-primary">
                مُراسَلتِي
              </Text>
              <Text className=" text-lg font-plight text-darkestGray px-4 text-center">
                Connecter les étudiants, les parents et les écoles pour un
                avenir meilleur.
              </Text>
            </View>
            <Auth />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
