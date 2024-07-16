import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  Pressable,
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
import { useSession } from "@/context/authProvider";
import ImageView from "react-native-image-viewing/dist/ImageViewing";
export default function Justification() {
  const { session } = useSession();
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
  } = getUnaAcceptedJustification(session!.user.id);
  console.log(session!.user.id);

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
          ToastAndroid.show("Absence Justifié", ToastAndroid.SHORT);

          setIsOpen(false);
        },
        onError: () =>
          ToastAndroid.show("justificaiton échoué", ToastAndroid.SHORT),
      }
    );
  };
  
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <View className="flex-1 bg-white items-center px-4 pt-4">
        <View className="w-full h-full  justify-between px-2 items-center pb-4">
          {justification.length !== 0 ? (
            justification.map((e) => (
              <View
                key={e.id}
                className={` w-full border border-grayBorder rounded-lg  py-1 pt-3 px-3 text-center mb-2 ${
                  isJustifying ?? "opacity-80"
                }`}
              >
                <View className="flex-row justify-between">
                  <Text className="text-lg font-pregular text-darkestGray pb-2">
                    {e.presence && e.presence.profiles && e.presence.profiles.username ? e.presence.profiles.username :  ""}
                    {e.presence && e.presence.profiles && e.presence.profiles.username ? e.presence.profiles.familyName :  ""}
                  </Text>
                  <Text className="text-lg font-pmedium text-darkestGray pb-2">
                    {" "}
                    {e.created_at.slice(0, 10)}{" "}
                  </Text>
                </View>
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
            ))
          ) : (
            <>
              <View className="w-full flex-1 items-center pt-[25%] bg-white">
                <Image
                  source={require("@/assets/images/no-absences.png")}
                  resizeMode="contain"
                  className="w-full h-1/2 border"
                />
                <Text className="font-pregular text-xl text-center text-disabledGray pt-4">
                  Il n'y a pas des justifications en attente
                </Text>
              </View>
            </>
          )}
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
  const [visible, setIsVisible] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      className=" items-center justify-center h-full flex-1 px-4"
      onRequestClose={() => closeModal()}
    >
      <View className="w-full bg-white rounded-xl p-2 border-primary h-[85vh]  items-center justify-between m-auto">
        <TouchableOpacity
          onPress={() => closeModal()}
          className=" items-end w-full"
        >
          <X className=" h-5 w-5 text-black" />
        </TouchableOpacity>
        {image && !isLoading ? (
          <Pressable
            onPress={() => setIsVisible(true)}
            className="bg-white rounded-lg overflow-hidden h-[60vh] w-[80%] items-center justify-center border border-disabledGray"
          >
            <Image
              className={`w-full h-full`}
              source={{ uri: image }}
              accessibilityLabel="planning table"
              resizeMode="contain"
            />

            <ImageView
              images={[{ uri: image }]}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
          </Pressable>
        ) : failed ? (
          <ErrorComp />
        ) : (
          <LoadingAnimationComp />
        )}

        <TouchableOpacity
          className="bg-primary px-4 rounded-lg py-3 items-center"
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
