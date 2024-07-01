import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Scanner({
  setModalVisible,
  handleBarCodeScanned,
}: {
  setModalVisible: (state: boolean) => void;
  handleBarCodeScanned: ({
    type,
    data,
  }: BarcodeScanningResult) => Promise<void>;
}) {
  const [isScanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
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

  const qrCodeScan = async (params: BarcodeScanningResult) => {
    setScanned(true);
    await handleBarCodeScanned(params);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={isScanned ? undefined : qrCodeScan}
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
