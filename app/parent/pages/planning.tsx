import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { Image, Text } from "react-native";

import { supabase } from "@/lib/supabase";

export default function Planning() {
  const [image, setImage] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["planning"],
    queryFn: async () => {
      const { data } = await supabase
        .from("schedule")
        .select("path")
        .order("created_at", { ascending: false })
        .single();

      let path: string = "";

      if (data && data.path) {
        path = data?.path;
        downloadImage(path);
      }

      return path;
    },
  });

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("content")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setImage(fr.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  // TODO : handle the loading and error state
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
