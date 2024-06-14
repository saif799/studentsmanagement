import { CalendarClockIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, View } from "react-native";

export default function FeatureCard({
  description,
  icon,
  title,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <View className="h-[40vw] flex-1  rounded-lg bg-[#F6F6F7] justify-around pt-4 items-center">
      {/* <CalendarClockIcon size={36} className=" text-primary w-7 h-7" /> */}
      {icon}
      <Text className="font-semibold"> {title}</Text>
      <Text className="px-2 text-xs text-center">{description} </Text>
    </View>
  );
}
