import { Link } from "expo-router";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function FeatureCard({
  description,
  icon,
  title,
  pathTo,
  from,
}: {
  title: string;
  description?: string;
  icon: ReactNode;
  pathTo: string;
  from: string;
}) {
  return (
    <Link href={`${from}/pages/${pathTo}`} asChild>
      <TouchableOpacity className="h-[43vw] flex-1 pb-2 rounded-lg bg-[#f5f5f5]  pt-2 items-center px-2 ">
        <View className="items-center justify-around flex-1 ">
          {/* <CalendarClockIcon size={36} className=" text-primary w-7 h-7" /> */}
          {icon}
          <Text className="font-psemibold text-center text-darkestGray">
            {" "}
            {title}
          </Text>
          <Text className="px-2 font-pregular text-xs text-center">
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
