import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { Image, Text } from "react-native";

import { supabase } from "@/lib/supabase";
import LoadingComp from "@/components/LoadingComp";
import { downloadImage } from "@/lib/downloadImage";

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
  if (isError) return <Text> an error </Text>;

  if (isPending) return <LoadingComp />;
  // TODO : build better UI for this page
  return (
    <SafeAreaView className="bg-white flex-1 items-center">
      {!image || !data ? (
        <BlankComp />
      ) : (
        <>
          <Text className="pb-4 text-2xl font-bold">Votre planning </Text>
          <Image
            className={`h-3/4 w-[90%]`}
            source={{ uri: image }}
            accessibilityLabel="planning table"
          />
        </>
      )}
    </SafeAreaView>
  );
}
