import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import { getMyNotes } from "@/hooks/getStudentNotes";
import LoadingComp, { LoadingAnimationComp } from "@/components/LoadingComp";
import { getStudents } from "@/hooks/getStudentsNames";
import ErrorComp from "@/components/ErrorComp";
import { useCurrentChild } from "@/context/currentChild";

const Grades = () => {
  const { session } = useSession();
  const studentNotes = getMyNotes();
  const currentChild = useCurrentChild();
  const [isPending, setisPending] = useState(true);
  let {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = getStudents(session?.user.id);
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

  if (isErrorStudents) return <ErrorComp />;
  // TODO : handle the loading and error UI
  if (isLoadingStudents || !students) return <LoadingAnimationComp />;

  const displayStudents = students.map((s) => ({
    title: s.fullName,
    id: s.id,
  }));
  return (
    <>
      <View className="bg-white flex-1 items-center">
        <View className="w-full flex-row">
          <Text className="py-4 pl-5 font-psemibold text-base text-darkestGray">
            Notes de :
          </Text>
          <Text className="p-4 font-pregular text-base text-darkestGray">{currentChild.currentChild?.username}</Text>
        </View>

        {isPending ? (
          // <BlankComp />
          <LoadingComp />
        ) : (
          <>
            <View className="bg-white  flex-1 px-4 items-center  w-full">
              <>
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
                        <TextInput
                          className={`font-pmedium text-base text-darkestGray text-center`}
                        >
                          {n.moyenne}
                        </TextInput>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default Grades;
