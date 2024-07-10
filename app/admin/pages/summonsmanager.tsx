import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import { LoadingAnimationComp } from "@/components/LoadingComp";
import ErrorComp from "@/components/ErrorComp";
import { getStudents } from "@/hooks/getStudentsNames";
import { ChevronDown, MessageSquarePlus, Search } from "lucide-react-native";
import { supabase } from "@/lib/supabase";
import { getSummons } from "@/hooks/getSummons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export default function SummonsManager() {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: notes, isLoading, isError } = getSummons(session?.user.id);
  let {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = getStudents(session?.user.id);
  const { mutateAsync: addSummonMutation } = useMutation({
    mutationFn: addSummon,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["summons"] }),
  });

  if (isError || isErrorStudents) return <ErrorComp />;
  // TODO : handle the loading and error UI
  if (isLoading || isLoadingStudents || !notes || !students)
    return <LoadingAnimationComp />;

  const updatedNotes = notes.map((msg) => {
    const receiver = students!.find((user) => user.id === msg.sent_to);
    return {
      ...msg,
      receiverFullName: receiver?.fullName,
    };
  });

  students = students.filter((s) => s.id !== session?.user.id);

  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4 relative">
        <Text className="text-lg font-pmedium  text-darkestGray pb-2">
          Gestion des convocation
        </Text>

        {notes.length ? (
          <ScrollView
            className="grow mb-[8vh] w-full h-full"
            showsVerticalScrollIndicator={false}
          >
            {updatedNotes.map((n) => (
              <TouchableOpacity
                key={n.created_at}
                className={`w-full text-center border border-grayBorder rounded-lg py-1 pt-3 px-3 mb-3 justify-center items-center`}
              >
                <View className="flex-row">
                  <Text className="pl-1 text-lg font-pmedium text-darkestGray pb-2">
                    Parent de : {n.receiverFullName}
                  </Text>
                </View>

                <View className="w-full flex-row justify-between">
                  <Text className="text-lg font-pregular text-disabledGray pl-2 pb-2">
                    date : {n.created_at.slice(0, 10)}
                  </Text>
                </View>

                <Text className="w-full pl-2 text-base font-plight text-darkestGray pb-2">
                  {n.content}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <NoNotes />
        )}
        <NewSummon
          summonMutation={addSummonMutation}
          students={students}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </>
  );
}

function NoNotes() {
  return (
    <View className="w-full flex-1 items-center pt-[25%] bg-white">
      <Image
        source={require("@/assets/images/no-absences.png")}
        resizeMode="contain"
        className="w-full h-1/2 border"
      />
      <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
        pas des convocations pour le moment
      </Text>
    </View>
  );
}

function NewSummon({
  modalVisible,
  setModalVisible,
  students,
  summonMutation,
}: {
  modalVisible: boolean;
  setModalVisible: (state: boolean) => void;
  students: { id: string; fullName: string }[];
  summonMutation: (newSummon: {
    profile_id: string;
    content: string;
    sent_to: string;
  }) => void;
}) {
  const { session } = useSession();
  const [selectedStudent, setSelectedStudent] = useState<
    { title: string; id: string } | undefined
  >(undefined);
  const [summonContent, setsummonContent] = useState("");
  const [isSaving, setisSaving] = useState(false);

  const displayStudents = students.map((s) => ({
    title: s.fullName,
    id: s.id,
  }));
  async function handleAddition() {
    if (!session?.user) throw new Error("No user on the session!");
    setisSaving(true);
    const newSummon = {
      profile_id: session!.user.id,
      content: summonContent,
      sent_to: selectedStudent!.id,
    };
    summonMutation(newSummon);
    setisSaving(false);
    setModalVisible(false);
    setSelectedStudent(undefined);
    setsummonContent("");
  }

  return (
    <View className="items-center flex-1 justify-center bg-black">
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          if (!isSaving) {
            setSelectedStudent(undefined);
            setsummonContent("");
            setModalVisible(false);
          }
        }}
      >
        <View className=" w-11/12 h-fit min-h-[50vh] m-auto bg-white rounded-3xl shadow-lg items-center justify-between pt-6 pb-3 ">
          <Text className="font-pmedium text-darkestGray text-lg pb-2">
            Convoquer un parent
          </Text>
          <View className=" w-full px-[4%] py-[3%] rounded-xl pb-2">
            <Text className="w-full pl-2 text-base font-pregular text-darkestGray pb-2">
              parent de 
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

          <View className=" w-full px-[4%] py-[3%] rounded-xl">
            <Text className="w-full pl-2 text-base font-pregular text-darkestGray pb-2">
              Message de convocation
            </Text>
            <TextInput
              autoCapitalize="sentences"
              className="border border-grayBorder h-fit max-h-[20vh] rounded-lg p-2 grow font-pregular text-lg"
              cursorColor={"green"}
              multiline={true}
              numberOfLines={3}
              value={summonContent}
              onChangeText={(c) => setsummonContent(c)}
              placeholder="Contenu ici..."
            />
          </View>

          <TouchableOpacity
            className="  p-2 rounded-lg self-center"
            onPress={() => handleAddition()}
            disabled={
              isSaving ||
              summonContent.length === 0 ||
              selectedStudent === undefined
            }
          >
            <Text
              className={`${
                isSaving ||
                summonContent.length === 0 ||
                selectedStudent === undefined
                  ? "text-disabledGray"
                  : "text-primary"
              } font-pmedium text-lg px-2 pt-2`}
            >
              {!isSaving ? "Enregistrer" : "Enregistrement..."}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Pressable
        className="bg-primary p-3 rounded-lg flex-row w-fit absolute bottom-[3%] items-center justify-center "
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-lg font-pmedium text-white pr-3">
          Nouvelle Convocation
        </Text>
        <MessageSquarePlus color={"white"} />
      </Pressable>
    </View>
  );
}

async function addSummon(newSummon: {
  profile_id: string;
  content: string;
  sent_to: string;
}) {
  try {
    const { error } = await supabase.from("summons").insert(newSummon);

    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
  } finally {
    Alert.alert("Convocation Envoyé");
  }
}

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
