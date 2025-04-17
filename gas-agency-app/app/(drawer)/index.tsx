import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';

const Profile = () => {
  const [user, setUser] = useState<{ name: string; phone: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const stored = await AsyncStorage.getItem('user');
        console.log("📦 Raw stored user:", stored);
  
        if (!stored) {
          Alert.alert("⚠️ No user found", "Please log in again.");
          return;
        }
  
        const parsed = JSON.parse(stored);
        console.log("✅ Parsed user:", parsed);
  
        // Check if the required fields exist
        const { name, email, phone } = parsed;
        if (name && email && phone) {
          setUser(parsed);
        } else {
          console.warn("⚠️ Missing fields in stored user:", parsed);
          Alert.alert("⚠️ Invalid user data", "Some required fields are missing. Try logging in again.");
        }
  
      } catch (error) {
        console.error("❌ Error loading user:", error);
        Alert.alert("❌ Error", "Something went wrong while loading your profile.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/User.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.editIconWrapper}
          onPress={() => router.push('/(drawer)/edit-profile')}
        >
          <Pencil color="#007bff" size={24} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user?.name || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{user?.phone || 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  editText: {
    fontSize: 16,
    color: '#007bff',
  },
  profileDetails: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
});
