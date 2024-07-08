import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { downloadImage } from "@/lib/downloadImage";
import LoadingComp from "@/components/LoadingComp";
import { UploadContent } from "@/components/uploadContent";
import { UploadRules } from "@/hooks/UploadStuff";

const Rules = () => {
  const [image, setImage] = useState("");
  const { mutate: upload, isPending: mutationPending } = UploadRules();

  const { isPending, isError } = useQuery({
    queryKey: ["rules"],
    queryFn: async () => {
      const { data } = await supabase
        .from("rules")
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
        Règlement Intérieur
      </Text>

      {image ? (
        <Image
          className={`h-3/4 w-[90%]`}
          source={{ uri: image }}
          accessibilityLabel="planning table"
        />
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
                onError: (eror) =>
                  Alert.alert(
                    "there was an error uploading Règlement Intérieur "
                  ),
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
          <Text className="text-white font-pmedium">Nouveau Règles</Text>
        </UploadContent>
      </View>
    </View>
  );
};

export default Rules;
