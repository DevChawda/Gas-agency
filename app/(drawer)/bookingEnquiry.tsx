import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardTypeOptions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

// ✅ Styled reusable Input component
const Input = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType = 'default',
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) => (
  <TextInput
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    keyboardType={keyboardType}
    multiline={multiline}
    style={{
      backgroundColor: '#FAF4F2',
      borderColor: '#e2c3b8',
      borderWidth: 1,
      borderRadius: 12,
      padding: 14,
      fontSize: 16,
      marginBottom: 16,
    }}
    placeholderTextColor="#a9a9a9"
  />
);

export default function BookingEnquiryScreen() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !mobile || !address || !message || !quantity || !type) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (mobile.length !== 10) {
      Alert.alert('Error', 'Mobile number must be 10 digits');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://192.168.1.29:5000/api/enquiry', {
        name,
        mobile,
        address,
        message,
        quantity: Number(quantity),
        type,
      });

      Alert.alert('Success', 'Enquiry submitted successfully');
      setName('');
      setMobile('');
      setAddress('');
      setMessage('');
      setQuantity('');
      setType('');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff', flexGrow: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24, color: '#333' }}>
        Booking Enquiry
      </Text>

      <Input placeholder="Name" value={name} onChangeText={setName} />
      <Input
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <Input placeholder="Address" value={address} onChangeText={setAddress} multiline />
      <Input placeholder="Message" value={message} onChangeText={setMessage} multiline />
      <Input
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <View
        style={{
          backgroundColor: '#FAF4F2',
          borderColor: '#e2c3b8',
          borderWidth: 1,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) => setType(itemValue)}
          style={{ padding: 14 }}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="IPG" value="IPG" />
          <Picker.Item label="Lubes" value="Lubes" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#A0A0A0' : '#007AFF',
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 4,
          marginTop: 10,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
            Submit Enquiry
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
