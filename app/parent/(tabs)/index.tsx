import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";

import { FeatureCard } from "@/components/FeatureCard";
import {
  CalendarClockIcon,
  ClipboardCheck,
  MailIcon,
  MessageSquareText,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import ChangeSelectChildComp from "@/components/changeSelectChildComp";
import { useSession } from "@/context/authProvider";
import { getChildren } from "@/hooks/getChildren";

export type parentshipType = { parentId: string; childId: string };

export type studentToSelectType = {
  id: string;
  username: string;
  familyName: string;
  avatar_url: string;
};

export default function HomeScreen() {
  const parent = useSession();

  const { isLoading, data } = getChildren(parent.session?.user.id);

  if (isLoading) return <Text className="pt-5">it should be loading</Text>;

  const iconSize = 45;
  const strokeWidth = 1.4;

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="bg-white">
        <HeroSec />
        <View className="px-2 w-full pt-4">
          <ChangeSelectChildComp />
        </View>

        <View className="gap-3 mt-1 px-2 pb-[14vh]">
          <View
            className="flex-row  justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              from="parent"
              pathTo="planning"
              title="Emploi du temps"
              icon={
                <CalendarClockIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Consultez les plannings rapidement."
            />
            <FeatureCard
              from="parent"
              pathTo="justification"
              title="Justifier et consulter la présence"
              icon={
                <ClipboardCheck
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
            />
          </View>

          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              from="parent"
              pathTo=""
              title="Consulter les Note"
              icon={
                <MessageSquareText
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Voir les notes de votre
                          fils / fille"
            />
            <FeatureCard
              from="parent"
              pathTo="chat"
              title="Vos Convocations"
              icon={
                <MailIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Consulter les vos convocation"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Card: {
    gap: 10,
  },
});

export function Header() {
  return (
    <View className="h-[9vh] border-b-grayBorder border border-t-0 border-x-0 top-6 sticky items-center justify-center bg-white z-50">
      <Image
        source={require("@/assets/images/text-logo.png")}
        className="h-auto w-1/4"
        resizeMode="contain"
      />
    </View>
  );
}
function HeroSec() {
  return (
    <View className="px-3">
      <View className="rounded-xl overflow-hidden">
        <ImageBackground
          className="h-[20vh] rounded-3xl p-3 "
          source={require("@/assets/images/hero-bg.jpg")}
          resizeMode="cover"
          resizeMethod="auto"
        >
          <Text className="text-white font-pbold text-[20px]">
            Bienvenue sur Morassalaty!
          </Text>
          <Text className="text-white text-[17px] font-plight">
            Connectez-vous avec votre école et vos parents et Facilitez la
            communication et la collaboration.
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}
