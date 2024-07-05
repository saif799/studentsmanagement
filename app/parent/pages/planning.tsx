import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { Image, Text } from "react-native";

import { supabase } from "@/lib/supabase";
import LoadingComp from "@/components/LoadingComp";
import { downloadImage } from "@/lib/downloadImage";
import ErrorComp from "@/components/ErrorComp";
import { View } from "react-native";

export default function Planning() {
  const [image, setImage] = useState("");
  const { data, isPending, isError } = useQuery({
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

  // TODO : handle the loading and error state
  // TODO : build better UI for this page
  if (isError) return <ErrorComp />;

  if (isPending) return <LoadingComp />;
  return (
    <View className="bg-white flex-1 items-center">
      <Text className="p-4 font-psemibold text-base text-darkestGray">
        Emploi du temps
      </Text>
      {!image || !data ? (
        // <BlankComp />
        <LoadingComp />
      ) : (
        <>
          <View className="bg-white rounded-lg overflow-hidden h-[60vh] w-[80%] items-center justify-center border border-disabledGray">
            <Image
              className={`w-full h-full`}
              source={{ uri: image }}
              accessibilityLabel="planning table"
              resizeMode="contain"
            />
          </View>
        </>
      )}
    </View>
  );
}
