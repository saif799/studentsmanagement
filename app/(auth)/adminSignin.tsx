import Auth from "@/components/Auth";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useUser } from "@/context/useUser";

export default function AdminSginIn() {
  const { user } = useUser();

  if (user && user.role === "admin") return <Redirect href="/admin/(tabs)" />;
  if (user && user.role !== "admin") return <Redirect href="/" />;

  return (
    <SafeAreaView className="h-full bg-white ">
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View className="h-full bg-green-950 relative">
          <ImageBackground
            source={require("@/assets/images/hero-bg-school.jpg")}
            className=" h-[175px] pt-7"
          >
            <View className="flex-row items-center pl-2">
              <Link href={"/"} asChild className="rounded-full bg-white p-2">
                <ArrowLeft size={35} color={"green"} strokeWidth={2} />
              </Link>
              <Text className="text-white -left-3 font-psemibold text-xl text-center grow">
                Login Admin
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
            <Auth role="admin" signup="/adminSignUp" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
