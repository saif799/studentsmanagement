import { View } from "react-native";
import { useSession } from "@/context/authProvider";
import { Redirect } from "expo-router";
import AccountParent from "@/components/AccountParent";

export default function App() {
  const auth = useSession();
  if (!auth.session) return <Redirect href="/signin" />;
  return (
    <View>
      <AccountParent key={auth.session?.user.id} session={auth.session} />
    </View>
  );
}
