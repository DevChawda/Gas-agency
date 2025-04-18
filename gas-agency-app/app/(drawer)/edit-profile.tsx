import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    profileImage: null,
  });

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          if (parsedUser.profileImage) {
            setImage(parsedUser.profileImage);
          }
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };
    loadUserData();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      const userId = parsedUser?.userId;
  
      if (!userId) {
        console.warn("User ID missing in AsyncStorage!");
        return;
      }
  
      const updatedUser = {
        userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImage: image || "", // Ensure profileImage is always included
      };
  
      const formData = new FormData();
      formData.append("userId", updatedUser.userId);
      formData.append("name", updatedUser.name);
      formData.append("email", updatedUser.email);
      formData.append("phone", updatedUser.phone);
  
      if (image) {
        const localUri = image;
        const filename = localUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename ?? "");
        const type = match ? `image/${match[1]}` : `image`;
  
        formData.append("profileImage", {
          uri: localUri,
          name: filename,
          type,
        } as any);
      }
  
      const response = await axios.patch(
        "http://192.168.1.79:5000/api/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("✅ Server response:", response.data);
  
      // Save the fully updated user to AsyncStorage
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      console.log("💾 Updated user stored:", updatedUser);
  
      Alert.alert("Success", "Profile updated successfully!");
      router.back();
    } catch (error: any) {
      console.error("❌ Error saving user data:", error.message);
      Alert.alert("Error", "Failed to update profile.");
    }
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Edit Profile</Text>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={
              image ? { uri: image } : require("../../assets/images/User.jpg")
            }
            resizeMode="cover"
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
            placeholder="Enter your full name"
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={user.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Phone */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={user.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  imageButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
