import { View, ScrollView, Text } from "react-native";
import React from "react";
import { useSession } from "@/context/authProvider";
import { getMyNotes } from "@/hooks/getStudentNotes";

const MyNotes = () => {
  const { session } = useSession();
  const { data, isPending, isError } = getMyNotes(session!.user!.id);

  // TODO : handle the loading state and error state
  if (isPending || isError) return <Text>no data for now</Text>;

  return (
    <View className="bg-white relative flex-1 px-4 pt-2 items-center">
      <ScrollView>
        <Text>asd: {data.asd}</Text>
        <Text>math: {data.math}</Text>
      </ScrollView>
    </View>
  );
};

export default MyNotes;
