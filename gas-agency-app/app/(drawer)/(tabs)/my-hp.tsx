import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const MyHPScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My HP Services</Text>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Services</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/lpg')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>LPG</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/lubes')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Lubes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/paycode')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Pay by Paycode</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/insta-vouchers')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Insta Vouchers</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/track-order')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/order-history')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Order History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/support')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/offers')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Offers</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconItem: {
    alignItems: 'center',
    width: '22%',
    marginBottom: 10,
  },
  iconImage: {
    width: 50,
    height: 50,
    marginBottom: 4,
    borderRadius: 10,
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MyHPScreen;
