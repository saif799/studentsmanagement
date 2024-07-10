import { View, Text, Image, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { downloadImage } from "@/lib/downloadImage";
import LoadingComp from "@/components/LoadingComp";
import { UploadContent } from "@/components/uploadContent";
import { UploadExamPlanning } from "@/hooks/UploadStuff";
import ImageView from "react-native-image-viewing";

const uploadExams = () => {
  const [image, setImage] = useState("");
  const { mutate: upload, isPending: mutationPending } = UploadExamPlanning();
  const [visible, setIsVisible] = useState(false);

  const { isPending, isError } = useQuery({
    queryKey: ["exam_planning"],
    queryFn: async () => {
      const { data } = await supabase
        .from("exam_planning")
        .select("path")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      let path: string = "";

      if (data && data.path) {
        path = data?.path;
        downloadImage(path, setImage);
      }

      return path;
    },
  });

  if (isError) return <Text> an error </Text>;

  if (isPending) return <LoadingComp />;
  return (
    <View className=" bg-white flex-1 items-center w-full justify-between ">
      <Text className="p-4 font-psemibold text-base text-darkestGray">
        Publier calendrier des examens
      </Text>

      {image ? (
        <Pressable
        onPress={() => setIsVisible(true)}
        className="bg-white rounded-lg overflow-hidden h-[60vh] w-[80%] items-center justify-center border border-disabledGray"
      >
        <Image
          className={`w-full h-full`}
          source={{ uri: image }}
          accessibilityLabel="planning table"
          resizeMode="contain"/>

        <ImageView
          images={[{ uri: image }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </Pressable>
      ) : isPending ? <LoadingComp /> : (
        <BlankComp />
      )}
      <View className=" flex-1 justify-center ">
        <UploadContent
          disabled={mutationPending}
          onUpload={(path) => {
            upload(
              { path },
              {
                onSuccess: () => Alert.alert("exams should be uploaded"),
                onError: (eror) =>
                  Alert.alert("there was an error uploading hte exams "),
              }
            );
          }}
          style={[
            {
              backgroundColor: "rgb(22 163 74)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              paddingTop: 12,
              paddingHorizontal: 16,
              paddingBottom: 8,
            },
            mutationPending ? { backgroundColor: "#777F82" } : null,
          ]}
        >
          {/* <TouchableOpacity className="px-4 pb-2 pt-3  bg-primary items-center justify-center rounded-md"> */}
          <Text className="text-white font-pmedium">
            Nouveau calendrier des examens
          </Text>
          {/* </TouchableOpacity> */}
        </UploadContent>
      </View>
    </View>
  );
};

export default uploadExams;
