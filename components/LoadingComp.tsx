import LottieView from "lottie-react-native";
import { Text, View } from "react-native";

export default function LoadingComp() {
  return (
    <View className="bg-white h-[90%] items-center w-full justify-center  ">
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
  );
}
