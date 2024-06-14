import { Image, StyleSheet, Platform, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import FeatureCard from "@/components/FeatureCard";
import {
  CalendarClockIcon,
  CalendarDays,
  ClipboardCheck,
  ClipboardCheckIcon,
  ClipboardList,
  ClipboardListIcon,
  Mail,
  MailIcon,
  Scale,
  SheetIcon,
  TablePropertiesIcon,
} from "lucide-react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View className="flex-row justify-between bg-white" style={styles.Card}>
        <FeatureCard
          title="Emploi du temps"
          icon={<CalendarClockIcon size={45} className=" text-primary" />}
          description="Consultez vos plannings rapidement."
        />
        <FeatureCard
          title="relevé de notes"
          icon={<TablePropertiesIcon size={45} className=" text-primary" />}
          description="Accédez à vos notes en un instant."
        />
      </View>
      <View className="flex-row justify-between bg-white" style={styles.Card}>
        <FeatureCard
          title="Règlement Intérieur"
          icon={<Scale size={45} className=" text-primary" />}
          description="Consultez les règles et politiques de l’école."
        />
        <FeatureCard
          title="calendrier des examens"
          icon={<CalendarDays size={45} className=" text-primary " />}
          description="Consultez les dates de vos examens."
        />
      </View>
      <View className="flex-row justify-between bg-white" style={styles.Card}>
        <FeatureCard
          title="Vos absences"
          icon={<ClipboardCheck size={45} className=" text-primary" />}
          description="Suivez et consulter vos absences."
        />
        <FeatureCard
          title="Matières et Professeurs"
          icon={<ClipboardList size={45} className=" text-primary" />}
          description="Découvrez vos matières et vos professeurs."
        />
      </View>
      <View className="flex-row justify-between bg-white" style={styles.Card}>
        <FeatureCard
          title="Notes des professeurs"
          icon={<SheetIcon size={45} className=" text-primary" />}
          description="Consultez les évaluations de vos professeurs.s"
        />
        <FeatureCard
          title="Convocations"
          icon={<MailIcon size={45} className=" text-primary" />}
          description="Accédez aux informations de convocation des parents."
        />
      </View>
    </ParallaxScrollView>
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
  Card: {
    gap: 10,
  },
});
