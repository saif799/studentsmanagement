import { View, Text, Image } from "react-native";
import React from "react";

const BlankComp = () => {
  return (
    <View className="w-full flex-1 items-center pt-[25%]">
      <Image
        source={require("@/assets/images/nothing-here-gray.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        Pas de contenu pour le moment
      </Text>
    </View>
  );
};

export default BlankComp;
