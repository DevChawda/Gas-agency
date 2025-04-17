// gas-agency-backend/controllers/orderController.js
import { LpgBooking, LubeBooking } from '../models/orderModel.js';

export const createLpgBooking = async (req, res) => {
  console.log('createLpgBooking called');
  console.log('LPG Request Body:', req.body);
  try {
    const newBooking = new LpgBooking(req.body);
    console.log('New LPG Booking Instance:', newBooking);
    const savedBooking = await newBooking.save();
    console.log('LPG booking saved:', savedBooking);
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error saving LPG booking:', error);
    res.status(500).json({ error: 'Server error while creating LPG booking', details: error.message });
  }
};

export const createLubeBooking = async (req, res) => {
  console.log('createLubeBooking called');
  console.log('Lubes Request Body:', req.body);
  try {
    const newBooking = new LubeBooking(req.body);
    console.log('New Lubes Booking Instance:', newBooking);
    const savedBooking = await newBooking.save();
    console.log('Lubes booking saved:', savedBooking);
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error saving Lubes booking:', error);
    res.status(500).json({ error: 'Server error while creating Lubes booking', details: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const lpgOrders = await LpgBooking.find().sort({ bookingDate: -1 });
    const lubeOrders = await LubeBooking.find().sort({ bookingDate: -1 });
    const allOrders = [...lpgOrders, ...lubeOrders];
    res.status(200).json(allOrders);
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ error: 'Server error while fetching orders', details: error.message });
  }
};

export const getLpgCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'domestic', name: 'Domestic LPG' },
      { id: 'commercial', name: 'Commercial LPG' },
      { id: 'industrial', name: 'Industrial LPG' },
    ];
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching LPG categories:', error);
    res.status(500).json({ error: 'Server error while fetching LPG categories', details: error.message });
  }
};

export const getLpgProducts = async (req, res) => {
  try {
    const products = [
      { id: 'domestic_14kg', categoryId: 'domestic', name: '14.2 Kg Cylinder', price: '₹ 1100' },
      { id: 'domestic_5kg', categoryId: 'domestic', name: '5 Kg Cylinder', price: '₹ 450' },
      { id: 'commercial_19kg', categoryId: 'commercial', name: '19 Kg Cylinder', price: '₹ 1700' },
      { id: 'commercial_47kg', categoryId: 'commercial', name: '47.5 Kg Cylinder', price: '₹ 4100' },
      { id: 'industrial_various', categoryId: 'industrial', name: 'Various Sizes', price: 'Contact for Price' },
    ];
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching LPG products:', error);
    res.status(500).json({ error: 'Server error while fetching LPG products', details: error.message });
  }
};

export const getLubesCategories = async (req, res) => {
  try {
    const categories = [
      { id: 'car', name: 'Car' },
      { id: 'bike', name: 'Bike' },
      { id: 'truck', name: 'Truck' },
    ];
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching Lubes categories:', error);
    res.status(500).json({ error: 'Server error while fetching Lubes categories', details: error.message });
  }
};

export const getLubesProducts = async (req, res) => {
  try {
    const products = [
      { id: 'car_oil1', categoryId: 'car', name: 'Engine Oil (5W-30)', price: '₹ 500', description: 'High-performance engine oil for cars.' },
      { id: 'car_oil2', categoryId: 'car', name: 'Gear Oil', price: '₹ 300' },
      { id: 'bike_oil1', categoryId: 'bike', name: 'Engine Oil (10W-40)', price: '₹ 350', description: 'Engine oil for bikes.' },
      { id: 'bike_chain', categoryId: 'bike', name: 'Chain Lube', price: '₹ 150' },
      { id: 'truck_oil1', categoryId: 'truck', name: 'Heavy-Duty Engine Oil', price: '₹ 800', description: 'Engine oil for trucks.' },
      { id: 'truck_grease', categoryId: 'truck', name: 'Grease', price: '₹ 200' },
    ];
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching Lubes products:', error);
    res.status(500).json({ error: 'Server error while fetching Lubes products', details: error.message });
  }
};