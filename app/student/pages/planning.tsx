import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BlankComp from "@/components/blankComp";
import { useQuery } from "@tanstack/react-query";
import { Image, Text, View } from "react-native";

import { supabase } from "@/lib/supabase";
import LottieView from "lottie-react-native";

export default function Planning() {
  const [image, setImage] = useState("");
  const { data, isLoading, isError } = useQuery({
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
    <View className="bg-white flex-1 items-center">
      <Text className="p-4 font-psemibold text-base text-darkestGray">
          Emploi du temps
        </Text>
      {!image || !data ? (
        // <BlankComp />
        <>
          <View className="bg-white h-full items-center w-full">
            <View className="h-[50vh] w-full items-center justify-center">
              <LottieView
                autoPlay
                source={require("@/assets/images/loading_files.json")}
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "white",
                }}
              />
              <Text className="p-4 font-pmedium text-base text-disabledGray">
                Chargement de contenu...
              </Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View className="bg-white rounded-lg overflow-hidden h-[60vh] w-[80%] items-center justify-center border border-disabledGray">
            <Image
              className={`w-full h-full`}
              source={{ uri: image }}
              accessibilityLabel="planning table"
            />
          </View>

        </>
      )}
    </View>
  );
}
