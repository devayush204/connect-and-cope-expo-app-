import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default function PricingScreen() {
  const handlePayment = () => {
    const options = {
      description: 'Connect & Cope Premium',
      currency: 'INR',
      key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID,
      amount: '49900', // ₹499.00 in paise
      name: 'Connect & Cope',
      prefill: {
        email: 'user@example.com',
        contact: '9999999999',
        name: 'User Name'
      },
      theme: { color: '#6366f1' }
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        Alert.alert('Success', `Payment ID: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        Alert.alert('Payment Failed', error.description);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.price}>₹499 / month</Text>
      <Text style={styles.description}>
        Unlock unlimited chats, priority support, and exclusive companions!
      </Text>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 16 },
  price: { fontSize: 24, fontWeight: '600', marginBottom: 8 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 32 },
  payButton: { backgroundColor: '#6366f1', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8 },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});