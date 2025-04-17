import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface LPGCategory {
  id: string;
  name: string;
  description?: string;
}

interface LPGProduct {
  id: string;
  categoryId: string;
  name: string;
  price: string;
}

const lpgCategories: LPGCategory[] = [
  { id: 'domestic', name: 'Domestic LPG', description: 'For household use.' },
  { id: 'commercial', name: 'Commercial LPG', description: 'For businesses and restaurants.' },
  { id: 'industrial', name: 'Industrial LPG', description: 'For industrial applications.' },
];

const lpgProducts: LPGProduct[] = [
  // Domestic LPG
  { id: 'domestic_14kg', categoryId: 'domestic', name: '14.2 Kg Cylinder', price: '₹ 1100' },
  { id: 'domestic_5kg', categoryId: 'domestic', name: '5 Kg Cylinder', price: '₹ 450' },
  // Commercial LPG
  { id: 'commercial_19kg', categoryId: 'commercial', name: '19 Kg Cylinder', price: '₹ 1700' },
  { id: 'commercial_47kg', categoryId: 'commercial', name: '47.5 Kg Cylinder', price: '₹ 4100' },
  // Industrial LPG
  { id: 'industrial_various', categoryId: 'industrial', name: 'Various Sizes', price: 'Contact for Price' },
];

const LPGBookingScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<LPGCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<LPGProduct | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [serviceTime, setServiceTime] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    const category = lpgCategories.find(cat => cat.id === categoryId);
    setSelectedCategory(category || null);
    setSelectedProduct(null);
  };

  const handleProductSelect = (productId: string) => {
    const product = lpgProducts.find(prod => prod.id === productId);
    setSelectedProduct(product || null);
  };

  const handleBooking = async () => {
    if (!selectedCategory) return Alert.alert('Error', 'Please select an LPG Category.');
    if (!selectedProduct) return Alert.alert('Error', `Please select a product within the ${selectedCategory.name} category.`);
    if (!serviceDate) return Alert.alert('Error', 'Please enter the preferred service date (YYYY-MM-DD).');
    if (!serviceTime) return Alert.alert('Error', 'Please enter the preferred service time (HH:MM).');

    const bookingData = {
      orderType: 'LPG',
      category: selectedCategory.name,
      product: selectedProduct.name,
      vehicleNumber,
      serviceDate,
      serviceTime,
    };

    setLoading(true);
    try {
      console.log('Sending LPG Booking Data:', bookingData); // Log data being sent
      const response = await axios.post(
        'http://192.168.1.79:5000/api/orders/bookings/lpg',
        bookingData
      );
      console.log('LPG Booking Response:', response.data);
      Alert.alert('Booking Successful', 'Your LPG booking has been placed successfully.');
      router.push({
        pathname: '/(drawer)/(tabs)/BookingConfirmation',
        params: response.data,
      });
      setSelectedCategory(null);
      setSelectedProduct(null);
      setVehicleNumber('');
      setServiceDate('');
      setServiceTime('');
    } catch (error: any) {
      console.error('LPG Booking Error:', error.response?.data || error.message);
      Alert.alert('Booking Failed', error.response?.data?.message || 'Something went wrong while booking.');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory
    ? lpgProducts.filter((product) => product.categoryId === selectedCategory.id)
    : [];

  const isBookingDisabled = !selectedCategory || !selectedProduct || !serviceDate || !serviceTime || loading;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>LPG Booking</Text>

      <Text style={styles.label}>Select LPG Category:</Text>
      {lpgCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryOption,
            selectedCategory && selectedCategory.id === category.id ? styles.selectedCategoryOption : {},
          ]}
          onPress={() => handleCategorySelect(category.id)}
        >
          <Text style={styles.categoryName}>{category.name}</Text>
          {category.description && <Text style={styles.categoryDescription}>{category.description}</Text>}
        </TouchableOpacity>
      ))}

      {selectedCategory && (
        <View style={styles.productSection}>
          <Text style={styles.label}>Select {selectedCategory.name}:</Text>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[
                styles.productOption,
                selectedProduct && selectedProduct.id === product.id ? styles.selectedProductOption : {},
              ]}
              onPress={() => handleProductSelect(product.id)}
            >
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </TouchableOpacity>
          ))}
          {filteredProducts.length === 0 && (
            <Text style={styles.infoText}>No products available in this category.</Text>
          )}
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Number (Optional)</Text>
        <TextInput style={styles.input} placeholder="Enter vehicle number (optional)" value={vehicleNumber} onChangeText={setVehicleNumber} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Service Date (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} placeholder="Enter preferred date" value={serviceDate} onChangeText={setServiceDate} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Preferred Service Time (HH:MM)</Text>
        <TextInput style={styles.input} placeholder="Enter preferred time" value={serviceTime} onChangeText={setServiceTime} />
      </View>

      <TouchableOpacity
        style={[styles.bookButton, isBookingDisabled ? styles.disabledButton : {}]}
        onPress={handleBooking}
        disabled={isBookingDisabled}
      >
        <Text style={styles.bookButtonText}>{loading ? 'Booking...' : 'Book Now'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 12,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  categoryOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  selectedCategoryOption: {
    borderColor: '#E53935',
    backgroundColor: '#f9f9f9',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryDescription: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  productSection: {
    marginTop: 16,
    paddingLeft: 10,
  },
  productOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fefefe',
  },
  selectedProductOption: {
    borderColor: '#E53935',
    backgroundColor: '#ffebee',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LPGBookingScreen;