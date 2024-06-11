import Auth from "../../components/Auth";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { useSession } from "@/context/authProvider";

export default function SginIn() {
  const auth = useSession();

  if (auth.session) return <Redirect href="/" />;

  return (
    <SafeAreaView>
      <Auth />
    </SafeAreaView>
  );
}
