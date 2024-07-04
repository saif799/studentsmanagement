import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { downloadImage } from "@/lib/downloadImage";
import LoadingComp from "@/components/LoadingComp";
import { UploadContent } from "@/components/uploadContent";
import { UploadExamPlanning } from "@/hooks/UploadStuff";
import { Loader2 } from "lucide-react-native";

const uploadExams = () => {
  const [image, setImage] = useState("");
  const { mutate: upload, isPending: mutationPending } = UploadExamPlanning();

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
        <Image
          className={`h-3/4 w-[90%]`}
          source={{ uri: image }}
          accessibilityLabel="planning table"
        />
      ) : (
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
