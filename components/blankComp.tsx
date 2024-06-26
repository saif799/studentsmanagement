import { View, Text, Image } from "react-native";
import React from "react";

// important : create another two components one for to show when an error ocures when fetching and the other when loading (this one is optional i think but the frist is a must )
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
