import { Image, Text, View } from "react-native";

export default function ErrorComp() {
  return (
    <View className="w-full flex-1 items-center pt-[25%] bg-white">
      <Image
        source={require("@/assets/images/error.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        Désolé, une erreur s'est produit
      </Text>
    </View>
  );
}
