import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useSession } from "@/context/authProvider";
import {
  ChildrenContext,
  StudentsToSelectContext,
} from "@/app/parent/pages/context";
import SelectMultiple from "react-native-select-multiple";
import { studentToSelectType } from "@/app/parent/(tabs)";
import { supabase } from "@/lib/supabase";

const ChangeSelectChildComp = () => {
  const parent = useSession();
  const children = useContext(ChildrenContext);
  const [selectedChild, setSelectedChild] = useState<
    studentToSelectType | undefined
  >();
setTimeout(() => {
  setSelectedChild(children![0])
}, 200);
  function handleSelectChild(stuId: string) {
    setSelectedChild(children?.find((e) => e.id === stuId))
  }
  return (
    <>
      {children?.length !== 0 ? (
        <View className="w-full rounded-xl border border-grayBorder p-2 h-[12vh] flex-row items-center justify-between">
          <View className="w-1/5 h-full rounded-full overflow-hidden border border-primary">
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
              }}
              className="h-full w-full"
            />
          </View>
          <Text className="font-pmedium text-darkestGray grow text-base pl-2">
            {selectedChild?.familyName} {selectedChild?.username}
          </Text>
          <ChangeModal handleSelectChild={handleSelectChild} />
        </View>
      ) : (
        <View className="w-full rounded-xl border border-grayBorder p-2 h-[12vh] flex-row items-center justify-between">
          <Text className="font-pmedium text-darkestGray text-base pl-2">
            Vous n'avez pas d'enfants{" "}
          </Text>
          <AddModal parentId={parent.session!.user.id} />
        </View>
      )}
    </>
  );
};

function ChangeModal({
  handleSelectChild,
}: {
  handleSelectChild: (stuId: string) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const children = useContext(ChildrenContext);

  return (
    <View className="items-center flex-1 justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="self-center bg-white items-center justify-center w-4/5 h-fit m-auto rounded-3xl py-4 shadow-md px-3 ">
          <Text className="font-pmedium text-base pb-5 text-darkestGray">
            Vos enfants
          </Text>

          {children?.map((ch) => (
            <View className="pb-3" key={ch.id}>
              <TouchableOpacity
                className={`w-full rounded-[100px]  border-grayBorder p-2 h-[10vh] flex-row items-center justify-between`}
                onPress={() => {
                  handleSelectChild(ch.id);
                  setModalVisible(false);
                }}
              >
                <View className="w-1/5 h-full rounded-full overflow-hidden border border-primary">
                  <Image
                    source={{
                      uri: "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
                    }}
                    className="h-full w-full"
                  />
                </View>
                <Text className="font-pregular text-darkestGray grow text-base pl-2">
                  {ch.familyName} {ch.username}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
          {/* <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            className="px-5 py-3  rounded-md"
          >
            <Text className="font-pmedium text-base text-red-400">Annuler</Text>
          </Pressable> */}
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text className="font-pmedium text-primary">Changer</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddModal({ parentId }: { parentId: string }) {
  const [modalVisible, setModalVisible] = useState(false);
  const students = useContext(StudentsToSelectContext);
  const [selectedStudents, setselectedStudents] = useState<string[]>([]);
  function handleSelection(stuId: string) {
    const indexOfChange = selectedStudents.findIndex((ss) => ss === stuId);
    if (indexOfChange !== -1) {
      setselectedStudents(selectedStudents.filter((s) => s !== stuId));
    } else {
      setselectedStudents([...selectedStudents, stuId]);
    }
  }

  function handleSave() {
    selectedStudents.forEach((e) =>
      supabase
        .from("parentship")
        .insert({ parentId: parentId, childId: e })
        .then(({ data, error }) => {
          if (data) {
            const test: { id: string; parentId: string; childId: string }[] =
              data;
            setselectedStudents(test.map((e) => e.id));
            console.log("test");

            console.log(test);
          }
        })
    );
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  }
  return (
    <View className="items-center flex-1 justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="self-center bg-white items-center justify-center w-4/5 h-fit m-auto rounded-3xl py-4 shadow-md px-3 ">
          <Text className="font-pmedium text-base pb-5 text-darkestGray">
            Ajouter vos enfants
          </Text>

          <ScrollView className="max-h-[50vh]">
            {students?.map((stu) => (
              <View className="pb-3" key={stu.id}>
                <TouchableOpacity
                  className={`w-full rounded-[100px]  border-grayBorder p-2 h-[10vh] flex-row items-center justify-between ${
                    selectedStudents.findIndex((ss) => ss === stu.id) !== -1
                      ? "bg-green-200"
                      : ""
                  }`}
                  onPress={() => handleSelection(stu.id)}
                >
                  <View className="w-1/5 h-full rounded-full overflow-hidden border border-primary">
                    <Image
                      source={{
                        uri: "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
                      }}
                      className="h-full w-full"
                    />
                  </View>
                  <Text className="font-pregular text-darkestGray grow text-base pl-2">
                    {stu.familyName} {stu.username}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => handleSave()} className="p-3 pb-0">
            <Text className="font-pmedium text-primary text-center w-fit ">
              Enregistrer
            </Text>
          </TouchableOpacity>

          {/* <Pressable
            onPress={() => setModalVisible(!modalVisible)}
            className="px-5 py-3  rounded-md"
          >
            <Text className="font-pmedium text-base text-red-400">Annuler</Text>
          </Pressable> */}
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text className="font-pmedium text-primary text-center w-fit ">
          Ajouter
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ChangeSelectChildComp;
