import { supabase } from "@/lib/supabase";
import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
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

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanned, setScanned] = useState(false);
  const [text, setText] = useState("");
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
  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarcodeScanningResult) => {
    setScanned(true);
    await supabase.from("student").insert({ name: data });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setText(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={isScanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip this is interesting {text}</Text>
          </TouchableOpacity>
          {isScanned ? (
            <ExternalLink url={text} handle={() => setScanned(false)} />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setScanned(true)}
            >
              <Text style={styles.text}>this will render i gues </Text>
            </TouchableOpacity>
          )}
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

const ExternalLink = ({
  url,
  children,
  handle,
}: {
  handle: () => void;
  url: string;
  children?: ReactNode;
}) => {
  const handlePress = async () => {
    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Open the URL
      await Linking.openURL(url);
    } else {
      // Handle the error if the URL cannot be opened
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handle} style={styles.button}>
      <Text style={styles.text}>{children ? children : "this should wrk"}</Text>
    </TouchableOpacity>
  );
};
