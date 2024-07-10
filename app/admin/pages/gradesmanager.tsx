import { View, ScrollView, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import { getMyNotes } from "@/hooks/getStudentNotes";
import LoadingComp, { LoadingAnimationComp } from "@/components/LoadingComp";
import { getStudents } from "@/hooks/getStudentsNames";
import { ChevronDown, Search } from "lucide-react-native";
import SelectDropdown from "react-native-select-dropdown";
import ErrorComp from "@/components/ErrorComp";

const GradesManager = () => {
  const { session } = useSession();
  const studentNotes = getMyNotes();
  const [selectedStudent, setSelectedStudent] = useState<
    { title: string; id: string } | undefined
  >(undefined);
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
  }, 1000);

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
        <Text className="p-4 font-psemibold text-base text-darkestGray">
          Relevé de notes
        </Text>
        {isPending ? (
          // <BlankComp />
          <LoadingComp />
        ) : (
          <>
            <View className="bg-white  flex-1 px-4 items-center  w-full">
              <View className=" w-full py-[3%] rounded-xl pb-2">
                <Text className="font-pmedium text-base text-darkestGray text-left px-2 pb-2">
                  Etudiant
                </Text>
                <SelectDropdown
                  data={displayStudents}
                  onSelect={(selectedItem, index) => {
                    setSelectedStudent(selectedItem);
                  }}
                  search
                  renderSearchInputLeftIcon={() => <Search color="gray" />}
                  searchInputStyle={{ backgroundColor: "white" }}
                  searchInputTxtStyle={{ fontSize: 18, fontWeight: "500" }}
                  searchPlaceHolder="Tapez le prénom d'étudiant ici"
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text
                          className={`${
                            selectedItem && selectedItem.title
                              ? "font-pregular"
                              : "font-plight"
                          } text-base w-full`}
                        >
                          {(selectedItem && selectedItem.title) ||
                            "- Selectionner un étdiant -"}
                        </Text>
                        <ChevronDown
                          className="text-darkestGray"
                          strokeWidth={1.5}
                        />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: "lightgray" }),
                        }}
                      >
                        <Text style={styles.dropdownItemTxtStyle}>
                          {item.title}
                        </Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={true}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>

              {selectedStudent ? (
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
              ) : null}
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default GradesManager;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "auto",
    height: 55,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  dropdownMenuStyle: {
    backgroundColor: "#white",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    backgroundColor: "white",
    textAlign: "left",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
    textAlign: "left",
  },
});
