import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";

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
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
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
      </ScrollView>
    </SafeAreaView>
      
  );
}
const styles = StyleSheet.create({  Card: {
  gap: 10,
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
