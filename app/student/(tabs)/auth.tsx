import Account from "@/components/Account";
import { View } from "react-native";
import { useSession } from "@/context/authProvider";
import { Redirect } from "expo-router";

export default function App() {
  const auth = useSession();
  if (!auth.session) return <Redirect href="/signin" />;
  return (
    <View className="">
      <Account key={auth.session?.user.id} session={auth.session} />
    </View>
  );
}
