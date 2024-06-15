import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Slot, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <View className="bg-white h-[13vh] ">
        <Header />
      </View>
      <Slot />
    </>
  );
}

export function Header() {
  const iconSize = 32;
  const strokeWidth = 2;
  const navigation = useNavigation();
  return (
    <View className="h-[9vh] border flex-row-reverse w-full border-b-grayBorder border-t-0 border-x-0 top-7 sticky items-center justify-end px-3 bg-white z-10">
      <View className="h-auto w-1/4 grow items-center">
        <Image
          source={require("@/assets/images/text-logo.png")}
          className="h-auto w-1/4"
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity
        className="w-fit h-fit "
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft
          size={iconSize}
          strokeWidth={strokeWidth}
          className=" text-darkestGray"
        />
      </TouchableOpacity>
    </View>
  );
}
