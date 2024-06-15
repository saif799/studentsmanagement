import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankComp from "@/components/blankComp";

export default function Planning() {
  const content = undefined;
  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      {!content ? <BlankComp /> : null}
    </SafeAreaView>
  );
}
