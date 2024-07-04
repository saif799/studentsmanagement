import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { downloadImage } from "@/lib/downloadImage";
import LoadingComp from "@/components/LoadingComp";
import { UploadContent } from "@/components/uploadContent";
import { UploadPlanning } from "@/hooks/UploadStuff";
import ErrorComp from "@/components/ErrorComp";
const UploadSth = () => {
  const [image, setImage] = useState("");
  const { mutate: upload, isPending: mutationPending } = UploadPlanning();

  const { isPending, isError } = useQuery({
    queryKey: ["planning"],
    queryFn: async () => {
      const { data } = await supabase
        .from("schedule")
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

  if (isError) return <ErrorComp />;

  if (isPending) return <LoadingComp />;
  return (
    <View className=" bg-white flex-1 items-center w-full justify-between ">
      <Text className="p-4 font-psemibold text-base text-darkestGray">
        Emploi du temps
      </Text>

      {image ? (
        <Image
          className={`h-3/4 w-[90%] rounded-xl`}
          source={{ uri: image }}
          accessibilityLabel="planning table"
        />
      ) : (
        <LoadingComp />
      )}
      <View className=" flex-1 justify-center ">
        <UploadContent
          disabled={mutationPending}
          onUpload={(path) => {
            upload({ path });
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
          <Text className="text-white font-pmedium">Nouveau planning</Text>
          {/* </TouchableOpacity> */}
        </UploadContent>
      </View>
    </View>
  );
};

export default UploadSth;
