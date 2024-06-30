import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import BlankComp from "@/components/blankComp";
const UploadSth = () => {
  const [content, setContent] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  return (
    <>
      <View className="relative bg-white h-full items-center w-full">
        <Text className="p-4 font-psemibold text-base text-darkestGray">
          Emploi du temps
        </Text>
        {!isLoading ? (
          <View className="bg-white h-full items-center w-full">
            <View className="h-[50vh] w-full items-center justify-center">
              <LottieView
                autoPlay
                source={require("@/assets/images/loading_files.json")}
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "white",
                }}
              />
              <Text className="p-4 font-pmedium text-base text-disabledGray">
                Chargement de contenu...
              </Text>
            </View>
          </View>
        ) : null}
        {!content ? (
          <View className="bg-white border border-darkestGray rounded-md h-[60vh] w-[80%]"></View>
        ) : (
            <BlankComp />
        )}
        <TouchableOpacity className="absolute bottom-32 px-4 pb-2 pt-3 mt-4 bg-primary items-center justify-center rounded-md">
          <Text className="text-white font-pmedium">Nouveau planning</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default UploadSth;
