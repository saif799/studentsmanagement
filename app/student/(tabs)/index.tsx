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
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  MailIcon,
  Scale,
  SheetIcon,
  TablePropertiesIcon,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Link } from "expo-router";
export default function HomeScreen() {
  const iconSize = 45;
  const strokeWidth = 1.2;
  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="bg-white">
        <HeroSec />
        <View className="gap-3 mt-1 px-2 pb-[14vh]">
          <View
            className="flex-row  justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              title="Emploi du temps"
              icon={
                <CalendarClockIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Consultez vos plannings rapidement."
            />
            <FeatureCard
              title="relevé de notes"
              icon={
                <TablePropertiesIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Accédez à vos notes en un instant."
            />
          </View>
          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              title="Règlement Intérieur"
              icon={
                <Scale
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Consultez les règles et politiques de l’école."
            />
            <FeatureCard
              title="calendrier des examens"
              icon={
                <CalendarDays
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary "
                />
              }
              description="Consultez les dates de vos examens."
            />
          </View>
          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              title="Vos absences"
              icon={
                <ClipboardCheck
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Suivez et consulter vos absences."
            />
            <FeatureCard
              title="Matières et Professeurs"
              icon={
                <ClipboardList
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Découvrez vos matières et vos professeurs."
            />
          </View>
          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              title="Notes des professeurs"
              icon={
                <SheetIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Consultez les évaluations de vos professeurs.s"
            />
            <FeatureCard
              title="Convocations"
              icon={
                <MailIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Accédez aux informations de convocation des parents."
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
    <View className="h-[9vh] border border-b-grayBorder border-t-0 border-x-0 top-7 sticky items-center justify-center bg-white z-10">
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
