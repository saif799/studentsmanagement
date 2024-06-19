import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera, Edit } from "lucide-react-native";
import { supabase } from "@/lib/supabase";

interface Props {
  size?: number;
  url?: string | null;
  onUpload?: (filePath: string) => void;
  className?: string;
}
export default function uploadSth() {
  useEffect(() => {
    downloadImage();
  }, []);

  async function downloadImage() {
    try {
      //   const { data, error } = await supabase.storage.from("avatars");
      //   if (error) {
      //     throw error;
      //   }
      //   const fr = new FileReader();
      //   fr.readAsDataURL(data);
      //   fr.onload = () => {};
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }
  return (
    <View>
      <Avatar />
    </View>
  );
}

function Avatar({ url, size = 150, onUpload, className }: Props) {
  const [uploading, setUploading] = useState(false);
  //   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  //   const avatarSize = { height: size, width: size };

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

      //   onUpload(data.path);
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
      {/* {avatarUrl ? (
        <Image
          className={`${className} rounded-full`}
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View
          className="h-[15vh] aspect-square rounded-full bg-white border-2 border-grayBorder items-center justify-center"
          style={[avatarSize]}
        >
          <Camera className="text-disabledGray " size={50} strokeWidth={1} />
        </View>
      )} */}
      <TouchableOpacity
        onPress={uploadAvatar}
        disabled={uploading}
        className="bg-grayBorder w-7 h-7 items-center justify-center rounded-full absolute bottom-0 right-0"
      >
        <Edit size={20} className="text-black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
