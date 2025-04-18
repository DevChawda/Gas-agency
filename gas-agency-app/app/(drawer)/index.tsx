import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

const Profile = () => {
  const [user, setUser] = useState<{
    name: string;
    phone: string;
    email: string;
    profileImage: string | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const stored = await AsyncStorage.getItem('user');
      if (!stored) {
        Alert.alert('⚠️ No user found', 'Please log in again.');
        return;
      }

      const parsed = JSON.parse(stored);
      const { name, email, phone, profileImage } = parsed;

      if (name && email && phone) {
        setUser({
          name,
          email,
          phone,
          profileImage: profileImage || null,
        });
      } else {
        Alert.alert('⚠️ Invalid user data', 'Some required fields are missing.');
      }
    } catch (error) {
      console.error('❌ Error loading user:', error);
      Alert.alert('Error', 'Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Refresh on screen focus
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchUserData();
    }, [])
  );

  // Refresh control function
  const onRefresh = async () => {
    setLoading(true);
    await fetchUserData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      <View style={styles.profileHeader}>
        <Image
          source={
            user?.profileImage
              ? { uri: user.profileImage }
              : require('../../assets/images/User.jpg') // Fallback image if URL is not provided
          }
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
    backgroundColor: '#ccc',
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
