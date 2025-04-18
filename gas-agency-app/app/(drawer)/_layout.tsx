import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image, SafeAreaView, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Layout() {
  const router = useRouter();

  const [user, setUser] = useState<{
    name: string;
    phone: string;
    email: string;
    profileImage: string | null;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);

  // ✅ Fetch User Data
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

  // ✅ Load Profile Image
  const loadProfileImage = async () => {
    try {
      const storedImage = await AsyncStorage.getItem('profileImage');
      console.log('📷 Stored Profile Image URL:', storedImage);

      if (storedImage) {
        setProfileImage(storedImage);
      } else {
        setProfileImage(undefined); // important fix
        console.log('No profile image found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  };

  // ⏳ Refresh Control function
  const onRefresh = async () => {
    setLoading(true);
    await fetchUserData();
    await loadProfileImage();
  };

  // ✅ Logout Function
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.multiRemove(['authToken', 'user', 'profileImage']);
            router.replace('/(auth)');
          } catch (error: any) {
            console.error('❌ Logout Error:', error.message || error);
            Alert.alert('Logout Failed', 'Something went wrong. Please try again.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: 'left',
          drawerType: 'front',
          drawerStyle: { backgroundColor: '#192f6a', width: 250 },
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mahakaal Gas Agency</Text>
            </View>
          ),
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: 'black',
          drawerInactiveTintColor: '#021520',
          drawerLabelStyle: { color: 'white' },
        }}
        drawerContent={(props) => (
          <SafeAreaView style={{ flex: 1 }}>
            {/* 🔹 User Info */}
            <View
              style={{
                height: 250,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#192f6a',
                paddingBottom: 12,
              }}
            >
              <Image
                source={
                  profileImage
                    ? { uri: profileImage }
                    : user?.profileImage
                    ? { uri: user.profileImage }
                    : require('../../assets/images/User.jpg')
                }
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  backgroundColor: '#ccc',
                }}
              />

              <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold', marginVertical: 8 }}>
                {user?.name || 'Guest User'}
              </Text>
              <Text style={{ fontSize: 16, color: 'white', marginBottom: 6 }}>
                {user?.email ? `✉️  ${user.email}` : 'Not Logged In'}
              </Text>
              <Text style={{ fontSize: 16, color: 'white' }}>
                {user?.phone ? `📞  ${user.phone}` : ''}
              </Text>
            </View>

            {/* 🔹 Drawer Items */}
            <DrawerItemList {...props} />

            {/* 🔹 Logout */}
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: '#E53935',
                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
                onPress={handleLogout}
              >
                <Image
                  source={require('../../assets/images/icons/logout.png')}
                  style={{ width: 24, height: 24, tintColor: 'white' }}
                />
                <Text style={{ fontSize: 18, color: 'white', marginLeft: 10 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/Home.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Profile',
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/User.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: 'About',
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/Info.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: 'Settings',
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/setting.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="bookingEnquiry"
          options={{
            drawerLabel: 'Booking Enquiry',
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/booking.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="edit-profile"
          options={{
            drawerLabel: '',
            drawerItemStyle: { height: 0 }, // hide item completely
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
