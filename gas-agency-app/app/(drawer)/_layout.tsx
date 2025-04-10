import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function Layout() {
  const router = useRouter();
  const [user, setUser] = useState<{ fullName: string; mobile: string; email: string } | null>(null);

  // ✅ Fetch User Data from AsyncStorage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const image = await AsyncStorage.getItem("profileImage");
      if (image) setProfileImage(image);
    };
    loadImage();
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            router.replace('/(auth)');
          } catch (error) {
            console.error("Error during logout:", error);
          }
        },
      },
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: "left",
          drawerType: "front",
          drawerStyle: { backgroundColor: "#192f6a", width: 250 },
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Image source={require('../../assets/images/icon.png')} style={{ width: 40, height: 40, marginRight: 10 }} />
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Mahakaal Gas Agency</Text>
            </View>
          ),
          headerStyle: { backgroundColor: "#fff" },
          headerTintColor: "black",
          drawerInactiveTintColor: "#021520",
          drawerLabelStyle: { color: "white" },
        }}
        drawerContent={(props) => (
          <SafeAreaView style={{ flex: 1 }}>
            {/* 🔹 User Info Section */}
            <View style={{ height: 250, justifyContent: "center", alignItems: "center", backgroundColor: "#192f6a", paddingBottom: 12 }}>
              <Image source={require('../../assets/images/User.jpg')} resizeMode="contain" style={{ height: 130, width: 130, borderRadius: 999 }} />
              <Text style={{ fontSize: 22, color: "white", fontWeight: "bold", marginVertical: 8 }}>
                {user ? user.fullName : "Guest User"}
              </Text>
              <Text style={{ fontSize: 16, color: "white", marginBottom: 10 }}>
                {user ? `✉️\u00A0\u00A0\u00A0\u00A0\u00A0${user.email}` : "Not Logged In"}
              </Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {user ? `📞\u00A0\u00A0\u00A0\u00A0\u00A0${user.mobile}` : "Not Logged In"}
              </Text>
            </View>

            {/* 🔹 Drawer Items */}
            <DrawerItemList {...props} />

            {/* 🔹 Logout Button */}
            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  backgroundColor: "#E53935",
                  marginHorizontal: 20,
                  borderRadius: 10,
                }}
                onPress={handleLogout}
              >
                <Image source={require('../../assets/images/icons/logout.png')} resizeMode="contain" style={{ width: 24, height: 24, tintColor: "white" }} />
                <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/Home.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
                resizeMode="contain"
              />
            )
          }}
        />

        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Profile",
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/User.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
                resizeMode="contain"
              />
            )
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            drawerLabel: "About",
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/Info.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
                resizeMode="contain"
              />
            )
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            drawerLabel: "Settings",
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/setting.png')}
                style={{ width: 24, height: 24, tintColor: 'white' }}
                resizeMode="contain"
              />
            )
          }}
        />
        <Drawer.Screen
          name="bookingEnquiry"
          options={{
            drawerLabel: "Booking Enquiry",
            drawerIcon: () => (
              <Image
                source={require('../../assets/images/icons/booking.png')} // Make sure this icon exists
                style={{ width: 24, height: 24, tintColor: 'white' }}
                resizeMode="contain"
              />
            ),
          }}
        />

        <Drawer.Screen name="edit-profile" options={{ drawerLabel: "" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
