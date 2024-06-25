import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { getAbsence } from "@/hooks/getAbsence";
import { useCurrentChild } from "@/context/currentChild";
import { UploadContent } from "@/components/uploadContent";
import { useJustification } from "@/hooks/justification";
export default function Justification() {
  const { currentChild } = useCurrentChild();

  if (!currentChild) return <Text>please select a child</Text>;

  // TODO : make the ui for the case where the user didint select a child yet
  // or maybe make it so that if there is no child we just get the first child data like we did in the main page for the selct component

  const { data: absences, isLoading, error } = getAbsence(currentChild.id);
  const { mutate: justify } = useJustification();

  // TODO : handle the is loading and error UI

  // TODO : maybe update card Ui to be red if no justfication sent yet yellow justificaiton sent and still didnt get accepted green when accepted

  if (isLoading || !absences)
    return <Text>please wait while we fetch your data </Text>;
  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4">
        <View className="w-full flex-row justify-between px-2 items-center pb-4">
          <Text className="text-lg font-pmedium  text-darkestGray pb-2">
            Absences de : {currentChild.username}
          </Text>
          <Text className="text-lg font-pregular text-white bg-red-400 px-2 pt-1 items-center rounded-md">
            {absences.length}
          </Text>
        </View>

        {absences.length ? (
          <ScrollView className="grow flex-1 w-full">
            {absences.map((e) => (
              <View
                key={e.id}
                className="w-full border border-grayBorder rounded-lg  py-1 pt-3 px-3 text-center "
              >
                <UploadContent
                  key={e.id}
                  onUpload={() =>
                    justify(e.id, {
                      onSuccess: () =>
                        Alert.alert("justification sent successfully"),
                    })
                  }
                  style={{ alignItems: "center" }}
                >
                  <Text className="text-lg font-pmedium text-darkestGray pb-2">
                    {e.created_at}
                  </Text>
                </UploadContent>
              </View>
              // <TouchableOpacity
              //   key={e.id}
              //   className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3  flex-row justify-center items-center`}
              // >

              // </TouchableOpacity>
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
