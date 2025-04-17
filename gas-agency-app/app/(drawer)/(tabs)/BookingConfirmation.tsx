// app/(tabs)/BookingConfirmationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const BookingConfirmationScreen = () => {
  const { orderType, category, product, vehicleNumber, serviceDate, serviceTime } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmation</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Order Type:</Text>
        <Text style={styles.value}>{orderType as string}</Text>
      </View>
      {category && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Vehicle Type/Category:</Text>
          <Text style={styles.value}>{category as string}</Text>
        </View>
      )}
      {product && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Service/Product:</Text>
          <Text style={styles.value}>{product as string}</Text>
        </View>
      )}
      {vehicleNumber && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Vehicle Number:</Text>
          <Text style={styles.value}>{vehicleNumber as string}</Text>
        </View>
      )}
      {serviceDate && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Service Date:</Text>
          <Text style={styles.value}>{serviceDate as string}</Text>
        </View>
      )}
      {serviceTime && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Service Time:</Text>
          <Text style={styles.value}>{serviceTime as string}</Text>
        </View>
      )}
      <Text style={styles.confirmationText}>Your booking has been confirmed!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#777',
  },
  confirmationText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
  },
});

export default BookingConfirmationScreen;


{/* <Tabs.Screen name="cerateTransaction" options={{ href: null }} /> */}
{/* <Tabs.Screen
        name="transaction"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-horizontal-outline" size={size} color={color} />
          ),
        }}
      /> */}
{/* <Tabs.Screen name="createTransaction" options={{ href: null }} /> */}