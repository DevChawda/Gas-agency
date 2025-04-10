import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LPGOrderScreen = () => {
  return (
    <View style={styles.container}>
      {/* Choose Domestic LPG Cylinder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Domestic LPG Cylinder</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radio}>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
            <Text style={styles.radioLabel}>LPG Refill - 14.2 Kg</Text>
          </View>
        </View>
      </View>

      {/* Distributor Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distributor Details</Text>
        <View style={styles.distributorCard}>
          <View style={styles.distributorImage} />
          <View style={styles.distributorInfo}>
            <Text style={styles.distributorName}>SANTOSH INDANE</Text>
            <Text style={styles.distributorQuestion}>
              Do you want to see other delivery options For this order?
            </Text>
            <TouchableOpacity style={styles.otherOptionsButton}>
              <Text style={styles.otherOptionsText}>OTHER DELIVERY OPTIONS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Delivery Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Options</Text>
        <View style={styles.radioContainer}>
          <View style={styles.radio}>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
            <Text style={styles.radioLabel}>Normal Delivery</Text>
            <Text style={styles.price}>₹ 0</Text>
          </View>
          <View style={styles.radio}>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
            <Text style={styles.radioLabel}>Preferred Delivery</Text>
            <Text style={styles.preferredDeliveryText}>
              *Applicable only on online payment
            </Text>
            <Text style={styles.preferredDeliveryText}>
              Choose a day and time
            </Text>
            <View style={styles.dropdownContainer}>
              <View style={styles.dropdown}>
                <Text>Weekday</Text>
              </View>
              <View style={styles.dropdown}>
                <Text>Time Slot</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.orderDetails}>
          <Text style={styles.orderDetailLabel}>PRICE</Text>
          <Text style={styles.orderDetailValue}>₹ 1111.5</Text>
        </View>
        <View style={styles.orderDetails}>
          <Text style={styles.orderDetailLabel}>LPG ID</Text>
          <Text style={styles.orderDetailValue}>7200000020499558</Text>
        </View>
      </View>

      {/* Consumer Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consumer Details</Text>
      </View>

      {/* Order Now Button */}
      <TouchableOpacity style={styles.orderNowButton}>
        <Text style={styles.orderNowText}>ORDER NOW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  radioContainer: {
    marginBottom: 8,
  },
  radio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'E53935', // Active radio button color
  },
  radioLabel: {
    fontSize: 16,
  },
  distributorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  distributorImage: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 30,
    marginRight: 16,
  },
  distributorInfo: {
    flex: 1,
  },
  distributorName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  distributorQuestion: {
    fontSize: 14,
    marginBottom: 8,
  },
  otherOptionsButton: {
    backgroundColor: 'E53935',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  otherOptionsText: {
    color: '#fff',
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    marginLeft: 'auto',
  },
  preferredDeliveryText: {
    fontSize: 14,
  },
  dropdownContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  orderDetailLabel: {
    fontSize: 16,
  },
  orderDetailValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderNowButton: {
    backgroundColor: 'E53935',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  orderNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LPGOrderScreen;