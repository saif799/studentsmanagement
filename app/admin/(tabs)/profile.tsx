import { View } from "react-native";
import { useSession } from "@/context/authProvider";
import { Redirect } from "expo-router";
import AccountAdmin from "@/components/AccountAdmin";

export default function App() {
  const auth = useSession();
  if (!auth.session) return <Redirect href="/signin" />;
  return (
    <View>
      <AccountAdmin key={auth.session?.user.id} session={auth.session} />
    </View>
  );
}
