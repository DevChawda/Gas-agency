import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Hi USER !</Text>

      <View style={styles.walletContainer}>
        <View style={styles.walletSection}>
          <Text style={styles.walletLabel}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>₹ 0.00</Text>
          <TouchableOpacity style={styles.walletButton}>
            <Text style={styles.walletButtonText}>Add Money/Voucher</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletSection}>
          <Text style={styles.walletLabel}>Happy Coins</Text>
          <Text style={styles.walletAmount}>0</Text>
          <TouchableOpacity style={styles.walletButton}>
            <Text style={styles.walletButtonText}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My HP</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>LPG</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Lubes</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Pay by Paycode</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Insta Vouchers</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Vehicle</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.iconRow}>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Lube Redemption</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>FASTag</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>E-20 Petrol</Text>
          </View>
          <View style={styles.iconItem}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Road Trip</Text>
          </View>
        </View>
      </View>

      {/* Add My Home section here */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  walletContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  walletSection: {
    backgroundColor: '#192f6a',
    padding: 16,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  walletLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  walletButton: {
    backgroundColor: '#e60000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  walletButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    color: 'blue',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconItem: {
    alignItems: 'center',
    width: '22%',
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  iconText: {
    fontSize: 12,
  },
});

export default HomeScreen;