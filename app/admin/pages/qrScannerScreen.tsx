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

export default function Scanner({
  setModalVisible,
  editPresence,
}: {
  setModalVisible: (state: boolean) => void;
  editPresence: (stuId: string, direction: string) => void;
}) {
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
    setText(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    await supabase
      .from("presence")
      .upsert(
        {
          userId: data,
          state: "present",
          created_at: new Date().toISOString().split("T")[0],
        },
        { onConflict: "userId , created_at" }
      )
      .then(({ data, error }) => {
        console.log("this is the errro ", error);
      });
    setTimeout(() => {
      alert(`étudiant a été marqué présent ${data}!`);
      editPresence(data, "right");
      setModalVisible(false);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
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
