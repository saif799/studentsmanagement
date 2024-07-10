import { View, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { getAbsence } from "@/hooks/getAbsence";
import { useCurrentChild } from "@/context/currentChild";
import { UploadContent } from "@/components/uploadContent";
import { useJustification } from "@/hooks/justification";
import { queryClient } from "@/app/_layout";
import LoadingComp from "@/components/LoadingComp";
import ErrorComp from "@/components/ErrorComp";
export default function Justification() {
  const { currentChild } = useCurrentChild();

  if (!currentChild) return <Text>please select a child</Text>;

  // TODO : make the ui for the case where the user didint select a child yet
  // or maybe make it so that if there is no child we just get the first child data like we did in the main page for the selct component

  const { data: absences, isPending, isError } = getAbsence(currentChild.id);

  const { mutate: justify } = useJustification();

  // TODO : handle the is loading and error UI

  if (isPending) return <LoadingComp />;

  if (isError) return <ErrorComp />;

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
            <Text className="font-pregular text-xl pb-3 pl-2">
              non justifié
            </Text>
            {absences
              .filter((e) => !e.justification.length)
              .map((e) => (
                <View
                  key={e.id}
                  className={`w-full border border-grayBorder rounded-lg  py-1 pt-3 px-3 text-center mb-2`}
                >
                  <UploadContent
                    key={e.id}
                    onUpload={(file_path) =>
                      justify(
                        { absence_Id: e.id, file_path },
                        {
                          onSuccess: () => {
                            queryClient.invalidateQueries({
                              queryKey: ["absence"],
                            });
                            Alert.alert("justification sent successfully");
                          },
                        }
                      )
                    }
                    style={{ alignItems: "center" }}
                  >
                    <Text className="text-lg font-pmedium text-darkestGray pb-2">
                      {e.created_at}
                    </Text>
                    <Text className="text-lg font-pmedium text-primary pb-2">
                      justifier
                    </Text>
                  </UploadContent>
                </View>
              ))}
            <Text className=" font-pregular text-xl pb-3 pl-2 pt-1">
              en attente de justification
            </Text>
            {absences.filter(
              (e) => e.justification.length && !e.justification[0].accepted
            ).length > 0 ? (
              absences
                .filter(
                  (e) => e.justification.length && !e.justification[0].accepted
                )
                .map((e) => (
                  <View
                    key={e.id}
                    className={`w-full border border-grayBorder rounded-lg items-center  py-1 pt-3 px-3 text-center mb-2 ${
                      e.justification && e.justification.length
                        ? e.justification[0].accepted
                          ? "bg-green-300"
                          : "bg-yellow-100"
                        : ""
                    }`}
                  >
                    <Text className="text-lg font-pmedium text-darkestGray pb-2">
                      {e.created_at}
                    </Text>
                  </View>
                ))
            ) : (
              <Text className="text-lg font-pregular text-disabledGray pl-2  pb-2">
                il n'y a pas
              </Text>
            )}
            <Text className="font-pregular text-xl pb-3 pl-2 pt-1">
              justifié
            </Text>
            {absences.filter(
              (e) => e.justification.length && e.justification[0].accepted
            ).length > 0 ? (
              absences
                .filter(
                  (e) => e.justification.length && e.justification[0].accepted
                )
                .map((e) => (
                  <View
                    key={e.id}
                    className={`w-full border border-grayBorder rounded-lg items-center  py-1 pt-3 px-3 text-center mb-2 ${
                      e.justification && e.justification.length
                        ? e.justification[0].accepted
                          ? "bg-green-300"
                          : "bg-yellow-100"
                        : ""
                    }`}
                  >
                    <Text className="text-lg font-pmedium text-darkestGray pb-2">
                      {e.created_at}
                    </Text>
                  </View>
                ))
            ) : (
              <Text className="text-lg font-pregular text-disabledGray pl-2  pb-2">
                il n'y a pas
              </Text>
            )}
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
