import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { getStudents } from "@/hooks/getStudents";
import { LoadingAnimationComp } from "@/components/LoadingComp";
import ErrorComp from "@/components/ErrorComp";

const StudentsNotes = () => {
  const { data, isError, isPending } = getStudents();
  // TODO : crate a screen or a comp that when the admin presses it it shows him a dialog or another screen with the student notes in there
  // Note : enable this if u want to add a student row to the notes page (silly ik but it works)

  if (isPending) return <LoadingAnimationComp />;
  if (isError) return <ErrorComp />;
  //   const { mutate } = useMutation({
  //     mutationFn: async (student_id: string) =>
  //       await supabase.from("notes").insert({ student_id }),
  //   });
  return (
    <View className="w-full flex-1 items-center pt-[25%] bg-white">
      <Image
        source={require("@/assets/images/access_denied.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        Cette page est en cours de construction
      </Text>
    </View>
  );
};

export default StudentsNotes;
