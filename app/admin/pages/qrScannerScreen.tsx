import { supabase } from "@/lib/supabase";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useNavigation } from "expo-router";
import { ReactNode, useState } from "react";
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Scanner() {
  const [isScanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarcodeScanningResult) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setText(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    supabase
      .from("presence")
      .insert({
        userId: data,
        state: "present",
        created_at: new Date().toISOString().split("T")[0],
      })
      .then(({ data, error }) => {
        console.log("this is the errro ", error);
      });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      >
        <View className="relative  flex-1 justify-center items-center">
          <View className="bg-transparent border-dashed border-white border-2  h-[50%] aspect-square"></View>
          <View className="absolute p-4  w-full h-full items-center justify-end pb-6 ">
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-lg self-center  "
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white font-pregular text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
