import { Link } from "expo-router";
import { CalendarClockIcon } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

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
    <Link href={"../pages/planning"} asChild>
      <Pressable className="h-[43vw] flex-1 pb-2 rounded-lg bg-[#f5f5f5]  pt-2 items-center ">
        <View className="items-center justify-around flex-1 ">
          {/* <CalendarClockIcon size={36} className=" text-primary w-7 h-7" /> */}
          {icon}
          <Text className="font-psemibold text-center"> {title}</Text>
          <Text className="px-2 font-pregular text-xs text-center">
            {description}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
