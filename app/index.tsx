import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { ReactNode, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const App = () => {
  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          className="w-screen h-full gap-2 items-center pt-4"
          style={{ gap: 12 }}
        >
          <Image
            resizeMode="contain"
            source={require("@/assets/images/icon-borderless.png")}
            className="h-16 "
          />
          <Image
            source={require("@/assets/images/teacher-student-illustration.png")}
            className="w-full h-52"
          />
          <Text className="text-lg px-8 text-center font-medium leading-6">
            Nous relions les élèves, les parents et l'administration scolaire
            pour un avenir meilleur. Commencez à explorer toutes les
            fonctionnalités et services que nous offrons.
          </Text>
          <Text className="text-xl px-6 text-center font-bold">Vous êtes?</Text>
          <RoleForm />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

function RoleForm() {
  const [selectIndex, setselectIndex] = useState(0);
  const [choice, setchoice] = useState<string | undefined>(undefined);
  const [disabled, setdisabled] = useState(true);
  function handleClick(index: number, choice: string) {
    if (selectIndex != index) {
      setselectIndex(index);
      setchoice(choice);
      setdisabled(false);
    } else {
      setselectIndex(0), setdisabled(true);
    }
  }
  return (
    <>
      <View className="flex-row flex w-full justify-between items-center px-5">
        <ChoiceButton
          selected={selectIndex === 1}
          handlePress={() => handleClick(1, "school")}
        >
          École
        </ChoiceButton>
        <ChoiceButton
          selected={selectIndex === 2}
          handlePress={() => handleClick(2, "teacher")}
        >
          Prof
        </ChoiceButton>
        <ChoiceButton
          selected={selectIndex === 3}
          handlePress={() => handleClick(3, "student")}
        >
          Élève
        </ChoiceButton>
      </View>
      <TouchableOpacity
        className={`${
          disabled ? "bg-gray-500" : "bg-green-600"
        } w-3/4 items-center py-3 rounded-xl `}
      >
        <Text className={`text-base font-bold text-white`}>
          {disabled ? "Sélectioner" : "Continuer"}
        </Text>
      </TouchableOpacity>
    </>
  );
}
export function ChoiceButton({
  selected,
  children,
  handlePress,
}: {
  selected?: boolean;
  children: ReactNode;
  handlePress: () => void;
}) {
  return (
    <>
      <TouchableOpacity
        className={`${
          selected ? "bg-green-600" : "border border-gray-500 "
        } w-[31%] py-3 rounded-lg items-center `}
        onPress={handlePress}
      >
        <Text
          className={`text-base ${
            selected ? "text-white font-bold" : "text-gray-500"
          } `}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </>
  );
}
export default App;