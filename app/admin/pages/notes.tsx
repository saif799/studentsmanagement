import { View, Text, ScrollView, TouchableOpacity } from "react-native";
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
    <View className="bg-white relative flex-1 px-4 pt-2 items-center">
      <ScrollView>
        {data.map((student) => (
          <TouchableOpacity
            // onPress={() => {
            //   mutate(student.id);
            // }}
            key={student.id}
          >
            <Text>{student.username}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentsNotes;
