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
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/authProvider";
import { ChildrenContext, StudentsToSelectContext } from "../pages/context";
import { useEffect, useState } from "react";
export type parentshipType = { parentId: string; childId: string };
export type studentToSelectType = {
  id: string;
  username: string;
  familyName: string;
  avatar_url: string;
};
export default function HomeScreen() {
  const [children, setchildren] = useState<parentshipType[]>([]);

  const [students, setStudents] = useState<studentToSelectType[]>([]); //fetched only when the parent has no children
  const [childrenData, setchildrenData] = useState<studentToSelectType[]>([]);
  const iconSize = 45;
  const strokeWidth = 1.4;
  const parent = useSession();
  useEffect(() => {
    supabase
      .from("parentship")
      .select("parentId , childId")
      .eq("parentId", parent.session?.user.id)
      .then(({ data }) => {
        if (data) {
          const children: parentshipType[] = data;
          setchildren(data);
          console.log("data");
          console.log(children);

          const childrenInfo = supabase
            .from("profiles")
            .select("id, username , familyName , avatar_url")
            .in(
              "id",
              children.map( (e) => e.childId)
            )
            .then(({ data, error }) => {
              if (data) {
                console.log("actually there are children");
                console.log(data);

                const dbdata: studentToSelectType[] = data;
                setchildrenData(data);
              }
            });
        }
      });
  }, []);

  useEffect(() => {
    if (children.length === 0) {
      const students = supabase
        .from("profiles")
        .select("id , username , familyName , avatar_url") //you can add family name if you want
        .then(({ data }) => {
          if (data) {
            console.log("here");

            const students: studentToSelectType[] = data;
            setStudents(data);
          }
        });
    } else {
    }
  }, []);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView className="bg-white">
        <HeroSec />
        <StudentsToSelectContext.Provider value={students}>
          <ChildrenContext.Provider value={childrenData}>
            <View className="px-2 w-full pt-4">
              <ChangeSelectChildComp />
            </View>
          </ChildrenContext.Provider>
        </StudentsToSelectContext.Provider>

        <View className="gap-3 mt-1 px-2 pb-[14vh]">
          <View
            className="flex-row  justify-between bg-white"
            style={styles.Card}
          >
            <FeatureCard
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
              pathTo=""
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
