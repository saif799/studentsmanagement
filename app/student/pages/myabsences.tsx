import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSession } from "@/context/authProvider";
import { getAbsence } from "@/hooks/getAbsence";
export default function Myabsences() {
  const { session } = useSession();
  const { data: absences, isLoading, isError } = getAbsence(session?.user.id);

  // TODO : handle the loading and error UI
  if (isLoading || !absences)
    return <Text>please wait while we fetch your data </Text>;

  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4">
        <View className="w-full flex-row justify-between px-2 items-center pb-4">
          <Text className="text-lg font-pmedium  text-darkestGray pb-2">
            Absences de : {session?.user.email}
          </Text>
          <Text className="text-lg font-pregular text-white bg-red-400 px-2 pt-1 items-center rounded-md">
            {absences.length}
          </Text>
        </View>

        {absences.length ? (
          <ScrollView className="grow flex-1 w-full">
            {absences.map((e) => (
              <TouchableOpacity
                key={e.created_at}
                className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3 mb-3 flex-row justify-center items-center`}
              >
                <Text className="text-lg font-pmedium text-darkestGray pb-2">
                  {e.created_at}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <NoAbsences />
        )}
      </View>
    </>
  );
}

function NoAbsences() {
  return (
    <View className="w-full flex-1 items-center pt-[25%] bg-white">
      <Image
        source={require("@/assets/images/no-absences.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        Vous n'avez pas d'absences
      </Text>
    </View>
  );
}
