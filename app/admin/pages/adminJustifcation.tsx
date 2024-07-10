import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Modal,
  Image,
} from "react-native";
import React, { useState } from "react";
import { getUnaAcceptedJustification } from "@/hooks/getAbsence";
import LoadingComp, { LoadingAnimationComp } from "@/components/LoadingComp";
import { useAcceptJustification } from "@/hooks/justification";
import { downloadImage } from "@/lib/downloadImage";
import ErrorComp from "@/components/ErrorComp";
import { X } from "lucide-react-native";
import { queryClient } from "@/app/_layout";
export default function Justification() {
  const [image, setImage] = useState<string | null>(null);
  const [selected, setSelected] = useState<{
    id: string;
    absence_Id: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {
    data: justification,
    isPending,
    isError,
    error,
  } = getUnaAcceptedJustification();

  const {
    mutate: justify,
    isPending: isJustifying,
    isError: failed,
  } = useAcceptJustification();

  if (isPending) return <LoadingComp />;
  if (isError) {
    console.log(error.message);

    return <ErrorComp />;
  }

  const verifier = ({
    file_path,
    id,
    absence_Id,
  }: {
    id: string;
    file_path: string;
    absence_Id: string;
  }) => {
    setIsOpen(true);
    setSelected({ id, absence_Id });
    setIsloading(true);
    downloadImage(file_path, setImage).then(() => setIsloading(false));
  };

  const justifier = () => {
    justify(
      { id: selected!.id, presenceId: selected!.absence_Id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["admin_justification"],
          });
          ToastAndroid.show("justified successfully", ToastAndroid.SHORT);

          setIsOpen(false);
        },
        onError: () =>
          ToastAndroid.show("justificaiton failed", ToastAndroid.SHORT),
      }
    );
  };

  const closeModal = () => setIsOpen(false);
  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4">
        <View className="w-full  justify-between px-2 items-center pb-4">
          {justification.map((e) => (
            <View
              key={e.id}
              className={` w-full border border-grayBorder rounded-lg  py-1 pt-3 px-3 text-center mb-2 ${
                isJustifying ?? "opacity-80"
              }`}
            >
              <Text className="text-lg font-pmedium text-darkestGray pb-2">
                {e.created_at.slice(0, 10)}
              </Text>
              <TouchableOpacity
                disabled={isJustifying}
                onPress={() => {
                  verifier({
                    file_path: e.file_path,
                    id: e.id,
                    absence_Id: e.absence_Id,
                  });
                }}
                className="text-lg font-pmedium text-primary pb-2"
              >
                <Text className=" text-primary text-lg font-pmedium">
                  vérifier
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <JustificationModal
        image={image}
        isOpen={isOpen}
        isLoading={isLoading}
        failed={failed}
        closeModal={closeModal}
        justify={justifier}
      />
    </>
  );
}

function JustificationModal({
  isOpen,
  failed,
  image,
  isLoading,
  justify,
  closeModal,
}: {
  isOpen: boolean;
  image: string | null;
  isLoading: boolean;
  failed: boolean;
  justify: () => void;
  closeModal: () => void;
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      className=" items-center justify-center h-full flex-1 px-4"
      onRequestClose={() => closeModal()}
    >
      <View className="w-full bg-white rounded-xl p-2 border border-primary h-[85vh]  items-center justify-between m-auto">
        <TouchableOpacity
          onPress={() => closeModal()}
          className=" items-end w-full"
        >
          <X className=" h-5 w-5 text-black" />
        </TouchableOpacity>
        {image && !isLoading ? (
          <Image
            className={`h-3/4 w-[90%]`}
            source={{ uri: image }}
            accessibilityLabel="justfication image"
            resizeMode="contain"
          />
        ) : failed ? (
          <ErrorComp />
        ) : (
          <LoadingAnimationComp />
        )}

        <TouchableOpacity
          className="bg-primary w-full rounded-lg py-5 items-center"
          onPress={() => {
            justify();
          }}
        >
          <Text className=" text-lg text-white font-pmedium">Accepter</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
