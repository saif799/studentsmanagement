import { ReactNode } from "react";
import { Text, View } from "react-native";

export default function TabIcon({
  focused,
  icon,
  name,
  color,
}: {
  name: string;
  color: string;
  focused: boolean;
  icon: ReactNode;
}) {
  return (
    <View className=" items-center justify-center gap-1">
      {icon}
      <Text
        style={{ color: focused ? "#49E582" : "white" }}
        className="text-xs text-[#49E582]"
      >
        {name}
      </Text>
    </View>
  );
}
