import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const MyVehicleScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Vehicle Services</Text>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Services</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/lube-redemption')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Lube Redemption</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/fastag')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>FASTag</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/e20-petrol')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>E-20 Petrol</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/road-trip')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Road Trip</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>

        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/insurance')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Insurance</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/service-history')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Service History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconItem} onPress={() => router.push('/fuel-locator')}>
            <Image source={require('../../../assets/images/icon.png')} style={styles.iconImage} />
            <Text style={styles.iconText}>Fuel Locator</Text>
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

export default MyVehicleScreen;
