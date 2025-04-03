import { useRouter, Link } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// ✅ Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});


const RegisterScreen = () => {
  const router = useRouter();

  // ✅ React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ On Form Submit
  const handleRegister = (data: any) => {
    console.log("User Data:", data);
    router.replace("/(auth)"); // Navigate to login
  };

  return (
    <View style={styles.formContainer}>
      {/* Full Name */}
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName.message}</Text>}
          </View>
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email / Phone no."
              placeholderTextColor="#999"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
          </View>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
          </View>
        )}
      />

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
          </View>
        )}
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(handleRegister)}>
        <Text style={styles.submitButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <TouchableOpacity>
        <Link style={styles.forgotPassword} href="/(auth)">Already have an account? Login</Link>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
