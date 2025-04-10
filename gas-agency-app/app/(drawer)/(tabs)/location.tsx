import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";

let MapView: any, Marker: any;

if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
}

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      {Platform.OS !== "web" ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.0060,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: 40.7128,
              longitude: -74.0060,
            }}
            title="Default Location"
            description="New York City"
          />
        </MapView>
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.text}>Map is not supported on Web</Text>
        </View>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    color: "#888",
  },
});
