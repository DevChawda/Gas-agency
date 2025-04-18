import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles"; // 🔁 Import your styles

// ✅ Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// ✅ Interface for form
interface LoginForm {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onLogin = async (data: LoginForm) => {
    try {
      setLoading(true);

      const response = await axios.post("http://192.168.1.79:5000/api/users/login", data);
      const { user, token } = response.data;

      if (!user || !token) {
        throw new Error("Invalid login response from server.");
      }

      // ✅ Save user info
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          userId: user.userId,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profileImage: user.profileImage || "",
        })
      );

      // ✅ Save auth token
      await AsyncStorage.setItem("authToken", token);

      console.log("🔐 Logged in:", user);

      // ✅ Redirect based on role
      if (user.role === "admin") {
        Alert.alert("Redirect", "Admin login detected.");
        // Linking.openURL("https://your-admin-panel-url.com");
      } else {
        router.replace("/(drawer)/(tabs)/home");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      Alert.alert("Login Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="email" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!isPasswordVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <MaterialCommunityIcons
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onLogin)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LoginScreen;
