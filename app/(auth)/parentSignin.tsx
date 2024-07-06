import Auth from "@/components/Auth";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useSession } from "@/context/authProvider";

export default function ParentSginIn() {
  const { session } = useSession();

  if (session) return <Redirect href="/parent/(tabs)" />;
  return (
    <SafeAreaView className="h-fullbg-white ">
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="h-full bg-[#3f875c] relative">
          <ImageBackground
            source={require("@/assets/images/hero-bg-parent.jpg")}
            className=" h-[175px] pt-7"
          >
            <View className="flex-row items-center pl-2">
              <Link href={"/"} asChild className="rounded-full bg-white p-2">
                <ArrowLeft size={35} color={"green"} strokeWidth={2} />
              </Link>
              <Text className="text-white -left-3 font-psemibold text-xl text-center grow">
                Login Parent
              </Text>
            </View>
          </ImageBackground>

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
            <Auth role="parent" signup="/parentSignUp" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
