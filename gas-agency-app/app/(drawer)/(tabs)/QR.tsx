import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Linking } from "react-native";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Function to handle QR Code scanning
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);

      // Check if the scanned data is a valid URL
      if (data.startsWith("http://") || data.startsWith("https://")) {
        Alert.alert("QR Code Scanned", `Opening: ${data}`, [
          { text: "Cancel", onPress: () => setScanned(false), style: "cancel" },
          { text: "Open", onPress: () => Linking.openURL(data) },
        ]);
      } else {
        Alert.alert("Scanned Data", data, [
          { text: "OK", onPress: () => setScanned(false) },
        ]);
      }
    }
  };

  // Function to toggle camera
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need camera permission to scan QR codes.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Prevent multiple scans
      >
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan a QR Code</Text>
          <View style={styles.scanBox} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    top: "30%",
    left: "10%",
    width: "80%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
  },
  scanText: {
    position: "absolute",
    top: -40,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
    borderRadius: 5,
  },
  scanBox: { width: "80%", height: "80%", borderColor: "white", borderWidth: 2 },
  buttonContainer: { position: "absolute", bottom: 40, alignSelf: "center" },
  button: { backgroundColor: "#E53935", padding: 10, borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  permissionText: { fontSize: 18, marginBottom: 10, textAlign: "center" },
});

export default QRScannerScreen;
