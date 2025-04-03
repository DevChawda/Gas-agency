import React, { useState } from "react";
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
  Image 
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const EditProfileScreen: React.FC = () => {
  const router = useRouter();

  // Define user state
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });

  const [image, setImage] = useState<string | null>(null);

  // Handle Profile Picture Selection
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    Alert.alert("Profile Updated", "Your profile details have been successfully updated!");
    router.back(); // Navigate back to Profile Screen
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

        {/* Profile Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={image ? { uri: image } : require("../../assets/images/icons/User.png")} 
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={user.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
            placeholder="Enter your name"
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
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

        {/* Phone Input */}
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

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => router.back()}>
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
    width: 120,
    height: 120,
    borderRadius: 60,
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
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
});

export default EditProfileScreen;
