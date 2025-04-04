import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Pencil } from 'lucide-react-native'; // Make sure to install lucide-react-native

const Profile = () => {
  const [user, setUser] = useState<{ fullName: string; mobile: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('../../assets/images/User.jpg')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIconWrapper} onPress={() => router.push('/(drawer)/edit-profile')}>
          <Pencil color="#007bff" size={24} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user?.fullName || 'Loading...'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{user?.mobile || 'Loading...'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>{user?.email || 'Loading...'}</Text>
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

