// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { BarCodeScanner } from 'expo-barcode-scanner';


// const QRScannerScreen = () => {
//   const onSuccess = (e: any) => {
//     alert(`QR Code Scanned: ${e.data}`);
//   };

//   return (
//     <View style={styles.container}>
//       {/* QR Scanner */}
//       {/* <QRCodeScanner
//         onRead={onSuccess}  // Function to handle scanned data
//         flashMode="auto"  // Flash mode can be 'off', 'on', or 'auto'
//         topContent={<Text style={styles.centerText}>Scan a QR code</Text>}
//         bottomContent={
//           <View style={styles.bottomContent}>
//             <Text style={styles.text}>Scan a QR Code to get the data</Text>
//           </View>
//         }
//         cameraStyle={styles.cameraStyle}
//       /> */}
//         <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraStyle: {
//     flex: 1,
//     width: '100%',
//   },
//   centerText: {
//     fontSize: 18,
//     padding: 20,
//     color: '#fff',
//   },
//   bottomContent: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   text: {
//     fontSize: 16,
//     color: '#fff',
//   },
// });

// export default QRScannerScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

const QRScannerScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<CameraType>('back');

  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState<any>(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    Alert.alert(`QR Code Scanned: ${data}`);
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  // if (!hasPermission.granted) {
  //   // Camera permissions are not granted yet.
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.message}>We need your permission to show the camera</Text>
  //       <Button onPress={setHasPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  // if (hasPermission === null) {
  //   return <Text>Requesting camera permission...</Text>;
  // }

  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  return (
    <View style={styles.container}>
    <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default QRScannerScreen;
