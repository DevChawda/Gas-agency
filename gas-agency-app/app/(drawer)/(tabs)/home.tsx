import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const routes = {
  createTransaction: "/(drawer)/(tabs)/createTransactions",
  redeemCoins: "/(drawer)/(tabs)/redeemCoins",
  myHP: "/(drawer)/(tabs)/my-hp",
  myVehicle: "/(drawer)/(tabs)/my-vehicle",
  lpg: "/(drawer)/(tabs)/lpg",
  lubes: "/(drawer)/(tabs)/lubes",
  paycode: "/(drawer)/(tabs)/paycode",
  instaVouchers: "/(drawer)/(tabs)/insta-vouchers",
} as const;

const HomeScreen = () => {
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          console.log("👤 Loaded user from AsyncStorage:", user);
          setName(user.fullName || user.name || "Guest");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  // ✅ Show loading screen while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi {name || "Guest"} !</Text>

      {/* Wallet Section */}
      <View style={styles.walletContainer}>
        <View style={styles.walletSection}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>₹ 0.00</Text>
          <TouchableOpacity 
            style={styles.walletButton} 
            onPress={() => router.push('/(drawer)/(tabs)/createTransaction')}>
            <Text style={styles.walletButtonText}>Add Money</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletSection}>
          <Text style={styles.walletLabel}>Happy Coins</Text>
          <Text style={styles.walletAmount}>0</Text>
          <TouchableOpacity 
            style={styles.walletButton} 
            onPress={() => router.push(routes.redeemCoins)}>
            <Text style={styles.walletButtonText}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My HP Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My HP</Text>
          <TouchableOpacity onPress={() => router.push(routes.myHP)}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          {[
            { name: "LPG", route: routes.lpg },
            { name: "Lubes", route: routes.lubes },
            { name: "Pay by Paycode", route: routes.paycode },
            { name: "Insta Vouchers", route: routes.instaVouchers }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconItem} onPress={() => router.push(item.route)}>
              <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
              <Text style={styles.iconText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-evenly",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  walletContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  walletSection: {
    backgroundColor: "#192f6a",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  walletLabel: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },
  walletAmount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  walletButton: {
    backgroundColor: "#EB4343",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  walletButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    color: "blue",
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconItem: {
    alignItems: "center",
    width: "22%",
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 4,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default HomeScreen;
