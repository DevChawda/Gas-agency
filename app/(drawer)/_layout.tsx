import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Image, SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router'; // You can use this for navigation

export default function Layout() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => {
          // Handle the logout process (e.g., clear tokens, reset state)
          router.replace('/'); // Navigate to login page after logout
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
    drawerStyle: {
      backgroundColor: "#192f6a",
      width: 250,
    },
    headerShown: true,
    title: "Home",
    drawerInactiveTintColor: "#021520",
    drawerLabelStyle: {
      color: "white",
    },
  }}
  drawerContent={(props) => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Drawer Header Section */}
        <View
          style={{
            height: 200,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#192f6a",
            paddingBottom: 12,
          }}
        >
          <Image
            source={require('../../assets/images/icons/User.png')}
            resizeMode="contain"
            style={{
              height: 130,
              width: 130,
              borderRadius: 999,
            }}
          />
          <Text
            style={{
              fontSize: 22,
              color: "white",
              fontWeight: "bold",
              marginVertical: 8,
            }}
          >
            User
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "white",
            }}
          >
            User Professional
          </Text>
        </View>

        {/* Drawer Navigation Items */}
        <DrawerItemList {...props} />

        {/* Logout Button, pinned at the bottom */}
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: "#dc3545", 
              marginHorizontal: 20,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={handleLogout}
          >
            <Image
              source={require('../../assets/images/icons/logout.png')}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: "white",
              }}
            />
            <Text
              style={{
                fontSize: 18,
                color: "white",
                marginLeft: 10,
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }}
>
  <Drawer.Screen
    name="(tabs)"
    options={{
      drawerLabel: "Home",
      drawerIcon: () => (
        <Image
          source={require('../../assets/images/icons/Home.png')}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            tintColor: "white",
          }}
        />
      ),
    }}
  />
  <Drawer.Screen
    name="index"
    options={{
      drawerLabel: "Profile",
      drawerIcon: () => (
        <Image
          source={require('../../assets/images/icons/User.png')}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            tintColor: "white",
          }}
        />
      ),
    }}
  />
  {/* Additional Drawer Screens */}
  <Drawer.Screen
    name="about"
    options={{
      drawerLabel: "About",
      drawerIcon: () => (
        <Image
          source={require('../../assets/images/icons/Info.png')}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            tintColor: "white",
          }}
        />
      ),
    }}
  />
  <Drawer.Screen
    name="settings"
    options={{
      drawerLabel: "Setting",
      drawerIcon: () => (
        <Image
          source={require('../../assets/images/icons/setting.png')}
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
            tintColor: "white",
          }}
        />
      ),
    }}
  />
  <Drawer.Screen
    name="edit-profile"
    options={{
      drawerItemStyle: { display: 'none' }, // This hides the screen in the Drawer
    }}
  />
</Drawer>

    </GestureHandlerRootView>
  );
}
