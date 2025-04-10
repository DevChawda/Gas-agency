import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';

interface LubeOption {
  id: number;
  name: string;
  price: string;
}

const LubesBookingScreen = () => {
  const [lubeType, setLubeType] = useState<string>('');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');
  const [serviceDate, setServiceDate] = useState<string>('');
  const [serviceTime, setServiceTime] = useState<string>('');
  const [selectedLube, setSelectedLube] = useState<LubeOption | null>(null);

  const lubeOptions: LubeOption[] = [
    { id: 1, name: 'Engine Oil', price: '₹ 500' },
    { id: 2, name: 'Gear Oil', price: '₹ 300' },
    { id: 3, name: 'Brake Oil', price: '₹ 200' },
  ];

  const handleLubeSelection = (lube: LubeOption) => {
    setSelectedLube(lube);
  };

  const handleBooking = () => {
    console.log('Booking Details:', {
      lubeType,
      vehicleNumber,
      serviceDate,
      serviceTime,
      selectedLube,
    });
    // Add your booking logic here (e.g., API call)
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lubes Booking</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Lube Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter lube type"
          value={lubeType}
          onChangeText={setLubeType}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Date</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service date (YYYY-MM-DD)"
          value={serviceDate}
          onChangeText={setServiceDate}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Service Time</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter service time (HH:MM)"
          value={serviceTime}
          onChangeText={setServiceTime}
        />
      </View>

      <Text style={styles.label}>Select Lube:</Text>
      {lubeOptions.map((lube) => (
        <TouchableOpacity
          key={lube.id}
          style={[
            styles.lubeOption,
            selectedLube && selectedLube.id === lube.id && styles.selectedLubeOption,
          ]}
          onPress={() => handleLubeSelection(lube)}
        >
          <Text style={styles.lubeName}>{lube.name}</Text>
          <Text style={styles.lubePrice}>{lube.price}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  lubeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 8,
  },
  selectedLubeOption: {
    borderColor: 'E53935',
    backgroundColor: '#f9f9f9',
  },
  lubeName: {
    fontSize: 16,
  },
  lubePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: 'E53935',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LubesBookingScreen;