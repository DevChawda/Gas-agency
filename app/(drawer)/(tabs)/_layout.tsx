import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import icons from expo-vector-icons

const TabsRoot = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="cerateTransaction" options={{ href: null }} />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="QR"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="qr-code-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="faq" options={{ href: null }} />
      <Tabs.Screen name="feedback" options={{ href: null }} />
      <Tabs.Screen name="help" options={{ href: null }} />
      <Tabs.Screen name="business-inquiry" options={{ href: null }} />
      <Tabs.Screen name="view-tickets" options={{ href: null }} />
      <Tabs.Screen name="lpg" options={{ href: null }} />
      <Tabs.Screen name="lubes" options={{ href: null }} />
      <Tabs.Screen name="paycode" options={{ href: null }} />
      <Tabs.Screen name="insta-vouchers" options={{ href: null }} />
      <Tabs.Screen name="track-order" options={{ href: null }} />
      <Tabs.Screen name="order-history" options={{ href: null }} />
      <Tabs.Screen name="support" options={{ href: null }} />
      <Tabs.Screen name="offers" options={{ href: null }} />
      <Tabs.Screen name="lube-redemption" options={{ href: null }} />
      <Tabs.Screen name="fastag" options={{ href: null }} />
      <Tabs.Screen name="e20-petrol" options={{ href: null }} />
      <Tabs.Screen name="road-trip" options={{ href: null }} />
      <Tabs.Screen name="insurance" options={{ href: null }} />
      <Tabs.Screen name="service-history" options={{ href: null }} />
      <Tabs.Screen name="fuel-locator" options={{ href: null }} />
      <Tabs.Screen name="my-hp" options={{ href: null }} />
      <Tabs.Screen name="my-vehicle" options={{ href: null }} />
      <Tabs.Screen name="redeemCoins" options={{ href: null }} />
      <Tabs.Screen name="createTransactions" options={{ href: null }} />
    </Tabs>
    
  );
};

export default TabsRoot;
