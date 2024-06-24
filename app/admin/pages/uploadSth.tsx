import { useState } from "react";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";

interface Props {
  onUpload: (filePath: string) => void;
}
export default function uploadSth() {
  const { mutate: uploadImage } = useMutation({
    mutationFn: async (path: string) =>
      await supabase.from("schedule").insert({ path }),
  });

  // TODO : build better ui  for this page and make it show the last uploaded planning (steal it from the parent planning page) 
  return (
    <View>
      <Avatar
        onUpload={(path: string) => {
          uploadImage(path);
        }}
      />
    </View>
  );
}

function Avatar({ onUpload }: Props) {
  const [uploading, setUploading] = useState(false);

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
        allowsMultipleSelection: false, // Can only select one image
        allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
        quality: 1,
        exif: false, // We don't want nor need that data.
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("content")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });
      if (uploadError) {
        throw uploadError;
      }
      console.log("uploaded successfully ", data.path);

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View className="relative" style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={uploadAvatar}
        disabled={uploading}
        className="p-4 bg-primary items-center justify-center rounded-md"
      >
        <Text className="text-white ">Upload planning</Text>
      </TouchableOpacity>
    </View>
  );
}
