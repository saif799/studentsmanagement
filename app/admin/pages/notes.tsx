import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { getStudents } from "@/hooks/getStudents";

const StudentsNotes = () => {
  const { data } = getStudents();
  // TODO : crate a screen or a comp that when the admin presses it it shows him a dialog or another screen with the student notes in there
  // Note : enable this if u want to add a student row to the notes page (silly ik but it works)

  //   const { mutate } = useMutation({
  //     mutationFn: async (student_id: string) =>
  //       await supabase.from("notes").insert({ student_id }),
  //   });
  return (
    <View className="bg-white relative flex-1 px-4 pt-2 items-center">
      <ScrollView>
        {data?.map((student) => (
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
