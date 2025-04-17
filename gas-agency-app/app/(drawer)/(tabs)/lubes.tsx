import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import axios from 'axios'; // Import axios

interface LubeCategory {
  id: string;
  name: string;
}

interface LubeProduct {
  id: string;
  categoryId: string;
  name: string;
  price: string;
  description?: string;
}

const lubeCategories: LubeCategory[] = [
  { id: 'car', name: 'Car' },
  { id: 'bike', name: 'Bike' },
  { id: 'truck', name: 'Truck' },
];

const lubeProducts: LubeProduct[] = [
  // Car Lubes
  { id: 'car_oil1', categoryId: 'car', name: 'Engine Oil (5W-30)', price: '₹ 500', description: 'High-performance engine oil for cars.' },
  { id: 'car_oil2', categoryId: 'car', name: 'Gear Oil', price: '₹ 300' },
  // Bike Lubes
  { id: 'bike_oil1', categoryId: 'bike', name: 'Engine Oil (10W-40)', price: '₹ 350', description: 'Engine oil for bikes.' },
  { id: 'bike_chain', categoryId: 'bike', name: 'Chain Lube', price: '₹ 150' },
  // Truck Lubes
  { id: 'truck_oil1', categoryId: 'truck', name: 'Heavy-Duty Engine Oil', price: '₹ 800', description: 'Engine oil for trucks.' },
  { id: 'truck_grease', categoryId: 'truck', name: 'Grease', price: '₹ 200' },
];

const LubesBookingScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<LubeCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<LubeProduct | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [serviceTime, setServiceTime] = useState<string>('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleCategorySelect = (categoryId: string | null) => {
    const category = lubeCategories.find(cat => cat.id === categoryId);
    setSelectedCategory(category || null);
    setSelectedProduct(null);
  };

  const handleProductSelect = (productId: string | null) => {
    const product = lubeProducts.find(prod => prod.id === productId);
    setSelectedProduct(product || null);
  };

  const handleBooking = async () => { // Make handleBooking async
    if (!selectedCategory) return Alert.alert('Error', 'Please select a Vehicle Type.');
    if (!selectedProduct) return Alert.alert('Error', `Please select a service for ${selectedCategory.name}.`);
    if (!vehicleNumber) return Alert.alert('Error', 'Please enter the vehicle number.');
    if (!serviceDate) return Alert.alert('Error', 'Please enter the preferred service date (YYYY-MM-DD).');
    if (!serviceTime) return Alert.alert('Error', 'Please enter the preferred service time (HH:MM).');

    const bookingData = {
      orderType: 'Lubes',
      category: selectedCategory.name,
      product: selectedProduct.name,
      vehicleNumber,
      serviceDate,
      serviceTime,
    };

    setLoading(true); // Set loading to true before API call
    try {
      const response = await axios.post('http://192.168.1.79:5000/api/orders/bookings/lubes', bookingData); // Replace with your actual API endpoint
      console.log('Lubes Booking Response:', response.data);
      Alert.alert('Booking Successful', 'Your lubes booking has been placed successfully.');
      // Optionally navigate to a confirmation screen or reset the form
      router.push({
        pathname: '/(drawer)/(tabs)/BookingConfirmation',
        params: response.data, // Or pass relevant data from the response
      });
      // Optionally clear the form state
      setSelectedCategory(null);
      setSelectedProduct(null);
      setVehicleNumber('');
      setServiceDate('');
      setServiceTime('');
    } catch (error: any) {
      console.error('Lubes Booking Error:', error.response?.data || error.message);
      Alert.alert('Booking Failed', error.response?.data?.message || 'Something went wrong while booking.');
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  const filteredProducts = selectedCategory
    ? lubeProducts.filter((product) => product.categoryId === selectedCategory.id)
    : [];

  const isBookingDisabled = !selectedCategory || !selectedProduct || !vehicleNumber || !serviceDate || !serviceTime || loading;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lubes Booking</Text>

      <Text style={styles.label}>Select Vehicle Type:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory?.id}
          style={styles.picker}
          onValueChange={handleCategorySelect}
        >
          <Picker.Item label="Select Vehicle Type" value={null} />
          {lubeCategories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
      </View>

      {selectedCategory && (
        <View style={styles.section}>
          <Text style={styles.label}>Select Service for {selectedCategory.name}:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedProduct?.id}
              style={styles.picker}
              onValueChange={handleProductSelect}
              enabled={filteredProducts.length > 0}
            >
              <Picker.Item label={`Select Service for ${selectedCategory.name}`} value={null} />
              {filteredProducts.map((product) => (
                <Picker.Item key={product.id} label={`${product.name} (${product.price})`} value={product.id} />
              ))}
            </Picker>
          </View>
          {selectedProduct?.description && (
            <Text style={styles.productDescription}>{selectedProduct.description}</Text>
          )}
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput style={styles.input} placeholder="Enter vehicle number" value={vehicleNumber} onChangeText={setVehicleNumber} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Date (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} placeholder="Enter service date" value={serviceDate} onChangeText={setServiceDate} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Time (HH:MM)</Text>
        <TextInput style={styles.input} placeholder="Enter service time" value={serviceTime} onChangeText={setServiceTime} />
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
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  productDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  bookButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
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

export default LubesBookingScreen;