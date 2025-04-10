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
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./styles";

// ✅ Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const RegisterScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schema),
  });

  const onRegister = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const response = await axios.post("http://192.168.1.29:5000/api/users/register", data);
      Alert.alert("Success", "Registration successful. Please login.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error("Register error:", error.response?.data || error.message);
      Alert.alert("Registration Failed", error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.formContainer}>
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      {/* Email */}
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

      {/* Phone */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone" size={20} color="#666" style={styles.icons} />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          </View>
        )}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

      {/* Password */}
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

      {/* Submit */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit(onRegister)}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.submitButtonText}>Register</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterScreen;
