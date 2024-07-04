import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSession } from "@/context/authProvider";
import Scanner from "@/app/admin/pages/qrScannerScreen";
import { BarcodeScanningResult } from "expo-camera";
import { getChildren } from "@/hooks/getChildren";
import { queryClient } from "@/app/_layout";
import { useCurrentChild } from "@/context/currentChild";
import { AddChildMutation } from "@/hooks/mutations/addChild";
import LoadingComp from "./LoadingComp";
import ErrorComp from "./ErrorComp";

const ChangeSelectChildComp = () => {
  const parent = useSession();
  const { currentChild: yourCurrentChild, change: setCurrentChild } =
    useCurrentChild();

  const { isPending, data: children } = getChildren(parent.session?.user.id);

  function handleSelectChild(stuId: string) {
    const selectedChild = children?.find((e) => e.id === stuId);
    if (selectedChild) setCurrentChild(selectedChild);
  }
  if (isPending) {
    return <LoadingComp />;
  }

  if (!children ) {
    return <ErrorComp />
  }

  if (children.length === 0) {
    return (
      <View className="w-full rounded-xl border border-grayBorder p-2 h-[12vh] flex-row items-center justify-between">
        <Text className="font-pmedium text-darkestGray text-base pl-2">
          Vous n'avez pas d'enfants{" "}
        </Text>
        <AddModal parentId={parent.session!.user.id} />
      </View>
    );
  }
  if (children)
    return (
      <>

          <View className="w-full rounded-xl border border-grayBorder p-2 h-[12vh] flex-row items-center justify-between">
            <View className="w-14 h-14 rounded-full overflow-hidden border border-primary">
              <Image
                source={{
                  uri: "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
                }}
                className="h-full w-full"
              />
            </View>
            <Text className="font-pmedium text-darkestGray grow text-base max-w-[60%] pl-4">
              {yourCurrentChild
                ? `${yourCurrentChild?.familyName} ${yourCurrentChild.username}`
                : `${children[0].familyName} ${children[0].username}`}
            </Text>
            <ChangeModal handleSelectChild={handleSelectChild} />
          </View>
      </>
    );
};

function ChangeModal({
  handleSelectChild,
}: {
  handleSelectChild: (stuId: string) => void;
}) {
  const parent = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: children } = getChildren(parent.session?.user.id);

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
        <View className="self-center items-center justify-center h-fit m-auto shadow-md">
          <View className="self-center bg-white items-center  w-4/5  rounded-2xl py-4 px-3 ">
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
                  <View className="w-14 h-14 rounded-full overflow-hidden border border-primary">
                    <Image
                      source={{
                        uri: "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
                      }}
                      className="h-full w-full"
                    />
                  </View>
                  <Text className="font-pregular text-darkestGray grow text-base pl-4">
                    {ch.familyName} {ch.username}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            <View className="h-4 pt-6">
              <AddModal parentId={parent.session?.user.id} />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text className="font-pmedium text-primary">Changer</Text>
      </TouchableOpacity>
    </View>
  );
}

function AddModal({ parentId }: { parentId: string | undefined }) {
  const mutateChildren = AddChildMutation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
    mutateChildren.mutate(
      { parentId, id: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["children"] });
          setModalVisible(!modalVisible);
        },
      }
    );
  };
  return (
    <View className="items-center flex-1 justify-center">
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
            Ajouter vos enfants
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
        className="h-10 w-full"
        onPress={() => setModalVisible(true)}
      >
        <Text className="font-pmedium text-primary text-center w-fit ">
          Ajouter
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default ChangeSelectChildComp;
