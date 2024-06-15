import { CalendarClockIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Text, View } from "react-native";

export function FeatureCard({
  description,
  icon,
  title,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <View className="h-[43vw] flex-1 pb-2 rounded-lg bg-[#f5f5f5] justify-around pt-4 items-center ">
      {/* <CalendarClockIcon size={36} className=" text-primary w-7 h-7" /> */}
      {icon}
      <Text className="font-psemibold"> {title}</Text>
      <Text className="px-2 font-pregular text-xs text-center">
        {description}{" "}
      </Text>
    </View>
  );
}

export function FeatureCard2({
  icon,
  title,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <View className="h-[43vw] flex-1 pb-2 rounded-lg bg-[#f5f5f5] justify-center pt-4 items-center">
      {/* <CalendarClockIcon size={36} className=" text-primary w-7 h-7" /> */}
      {icon}
      <Text className="font-psemibold pt-4 text-center"> {title}</Text>
    </View>
  );
}
