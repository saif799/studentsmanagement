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
  MessageSquareText,
  Scale,
  TablePropertiesIcon,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Link } from "expo-router";
export default function HomeScreen() {
  const pathFrom = "admin";
  const iconSize = 45;
  const strokeWidth = 1.4;
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
              from={pathFrom}
              pathTo="uploadSth"
              title="Publier les Emplois du temps"
              icon={
                <CalendarClockIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
            />
            <FeatureCard
              from={pathFrom}
              pathTo=""
              title="Publier les relevé de notes"
              icon={
                <TablePropertiesIcon
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
              from={pathFrom}
              pathTo=""
              title="Publier calendrier des examens"
              icon={
                <CalendarDays
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary "
                />
              }
            />
            <FeatureCard
              from={pathFrom}
              pathTo="presence"
              title="les absences"
              icon={
                <ClipboardCheck
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Suivez et gérer les absences."
            />
          </View>
          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              from={pathFrom}
              pathTo=""
              title="Ajouter Règlement Intérieur"
              icon={
                <Scale
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
            />

            <FeatureCard
              from={pathFrom}
              pathTo=""
              title="Matières et Professeurs"
              icon={
                <ClipboardList
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="ajouter le tableau des matières et professeurs."
            />
          </View>
          <View
            className="flex-row justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
              from={pathFrom}
              pathTo=""
              title="Valider une Note d’élève"
              icon={
                <MessageSquareText
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Contacter les parent en écrivant une note"
            />
            <FeatureCard
              from={pathFrom}
              pathTo=""
              title="valider les Convocations"
              icon={
                <MailIcon
                  size={iconSize}
                  strokeWidth={strokeWidth}
                  className=" text-primary"
                />
              }
              description="Convoquer un parent d’élève"
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
