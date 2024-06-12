import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { ReactNode, useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { Link, SplashScreen, router } from "expo-router";
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
          style={{ gap: 10 }}
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
          <Text className="text-lg px-8 text-center font-plight leading-6 text-darkestGray">
            Nous relions les élèves, les parents et l'administration scolaire
            pour un avenir meilleur. Commencez à explorer toutes les
            fonctionnalités et services que nous offrons.
          </Text>
          <Text className="text-xl px-6 text-center font-pbold text-darkestGray">
            Vous êtes?
          </Text>
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
  // function handleContinue() {
  //   if (!disabled) router.replace("/(auth)/signin");
  // }
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
      <Link href="/(auth)/signin" asChild className="w-3/4">
            <TouchableOpacity
              disabled={disabled}
              className={`${
                disabled ? "bg-disabledGray" : "bg-primary"
              }  items-center py-4 rounded-xl `}
              // onPress={() => handleContinue()}
            >
              <Text className={`text-base font-pbold text-white text-center`}>
                {disabled ? "Sélectioner" : "Continuer"}
              </Text>
            </TouchableOpacity>
      </Link>
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
          selected ? "bg-primary" : "border border-disabledGray "
        } w-[31%] py-3 rounded-lg items-center `}
        onPress={handlePress}
      >
        <Text
          className={`text-base ${
            selected
              ? "text-white font-pbold"
              : "font-pregular text-disabledGray"
          } `}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </>
  );
}
export default App;
