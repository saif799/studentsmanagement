import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import { getMyNotes } from "@/hooks/getStudentNotes";
import LoadingComp from "@/components/LoadingComp";

const MyGrades = () => {
  const { session } = useSession();
  const studentNotes = getMyNotes();
  const [isPending, setisPending] = useState(true);

  // TODO : handle the loading state and error state
  const totalCoef = studentNotes.reduce(
    (sum, currentVal) => sum + currentVal.coefficient,
    0
  );
  const moyenneGen =
    studentNotes.reduce(
      (accum, currentVal) =>
        accum + currentVal.coefficient * currentVal.moyenne,
      0
    ) / totalCoef;

  setTimeout(() => {
    setisPending(false);
  }, 500);

  return (
    <>
      <View className="bg-white flex-1 items-center">
        <Text className="p-4 font-psemibold text-base text-darkestGray">
          Relevé de notes
        </Text>
        {isPending ? (
          // <BlankComp />
          <LoadingComp />
        ) : (
          <>
            <View className="bg-white  flex-1 px-4 items-center  w-full">
              <View className="flex-row justify-between items-center w-full px-2 pb-3">
                <Text className="font-pmedium text-base text-darkestGray text-left">
                  Moyenne Générale :
                </Text>

                <View className="font-pregular text-base bg-primary text-left py-2 px-2 rounded-lg">
                  <Text className="font-pmedium text-base text-white text-left">
                    {moyenneGen.toPrecision(4)}
                  </Text>
                </View>
              </View>
              <View className="flex-row px-2 items-center w-full pb-2 ">
                <Text className="font-pmedium text-base text-darkestGray grow">
                  Matière
                </Text>
                <Text className="font-pmedium text-base text-darkestGray w-1/5 text-center">
                  Coéf
                </Text>
                <Text className="font-pmedium text-base text-darkestGray w-1/5 text-center">
                  Moy
                </Text>
              </View>
              <ScrollView className="w-full mb-5">
                {studentNotes.map((n) => (
                  <View key={n.matiere} className="flex-row mb-2">
                    <View className="border border-grayBorder rounded-lg p-2 grow">
                      <Text className="font-pregular text-base text-darkestGray text-left">
                        {n.matiere}
                      </Text>
                    </View>
                    <View className="border border-grayBorder rounded-lg p-2 mx-2 w-1/5">
                      <Text className="font-pmedium text-base text-darkestGray text-center">
                        {n.coefficient}
                      </Text>
                    </View>
                    <View className="border border-grayBorder rounded-lg p-2 w-1/5">
                      <Text
                        className={`font-pmedium text-base ${
                          n.moyenne >= 10 ? "text-green-700" : "text-red-500"
                        } text-center`}
                      >
                        {n.moyenne}
                      </Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default MyGrades;
