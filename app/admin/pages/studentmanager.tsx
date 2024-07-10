import {
  View,
  Text,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import { getStudents } from "@/hooks/getStudentsNames";
import { LoadingAnimationComp } from "@/components/LoadingComp";
import ErrorComp from "@/components/ErrorComp";
import Scanner from "./qrScannerScreen";
import { BarcodeScanningResult } from "expo-camera";
import { queryClient } from "@/app/_layout";
import { AddStudentMutation } from "@/hooks/mutations/addStudentToSchool";

const StudentManager = () => {
  const { session } = useSession();
  let {
    data: students,
    isLoading: isLoadingStudents,
    isError: isErrorStudents,
  } = getStudents(session?.user.id);

  if (isErrorStudents) {
    return <ErrorComp />;
  }
  if (isLoadingStudents) {
    return <LoadingAnimationComp />;
  }

  return (
    <View className="bg-white relative flex-1 px-4 pt-2 items-center">
      <View className="flex-row justify-center items-center w-full pt-2">
        <Text className="text-lg font-pmedium text-darkestGray">
          Liste des étudiants
        </Text>
      </View>
      {students?.length !== 0 ? (
        <ScrollView className="mb-[9vh] pt-4 w-full">
          {students?.map((stu) => (
            <View key={stu.id}>
              <View
                className={`w-full rounded-lg py-3 px-3 flex-row justify-center items-center border border-grayBorder`}
                key={stu.id}
              >
                <Text className={`text-base font-pregular text-darkestGray`}>
                  {stu.fullName}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="grow items-center justify-center">
          <Text className="text-disabledGray font-pregular text-lg">
            L'école n'a pas des étudiants
          </Text>
        </View>
      )}
      <AddModal schoolId={session?.user.id} />
    </View>
  );
};
function AddModal({ schoolId }: { schoolId: string | undefined }) {
  const mutateStudent = AddStudentMutation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    mutateStudent.mutate(
      { school : schoolId, id: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["studentNames"] });
          setModalVisible(!modalVisible);
        },
      }
    );
  };
  return (
    <View className="items-center flex-1 justify-center absolute bottom-[3vh]">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Scan annulé");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 bg-white items-center justify-center py-[13vh]">
          <Text className="font-pmedium text-darkestGray text-lg">
            Ajoutez un élève
          </Text>
          <View className="flex-1 w-full px-[10%] py-[10%] rounded-xl aspect-auto">
            <Scanner
              handleBarCodeScanned={handleBarCodeScanned}
              setModalVisible={setModalVisible}
            />
          </View>
          <TouchableOpacity
            className="text-red-500 border border-red-500 p-2 rounded-lg self-center"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="text-red-500 font-pregular text-lg px-2">
              Annuler
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        className="h-fit w-full"
        onPress={() => setModalVisible(true)}
      >
        <Text className="font-pmedium bg-primary text-white px-4 text-lg rounded-lg py-2 text-center">
          Ajouter un élève
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default StudentManager;
