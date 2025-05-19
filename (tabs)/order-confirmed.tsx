import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function OrderConfirmedScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/images/cristo-logo.jpg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.header}>Order Confirmed!</Text>
      <Text style={styles.message}>
        Thank you for your order. Your menu selection has been received.
      </Text>
      <Image
        source={require("../../assets/images/payment-confirmed.jpg")}
        style={styles.successImage}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home" as never)}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#F5EEE6", marginTop: 10 }]}
        onPress={() => navigation.navigate("Payment" as never)}
      >
        <Text style={[styles.buttonText, { color: "#A0522D" }]}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F3",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoRow: {
    alignItems: "center",
    marginBottom: 18,
  },
  logoImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F5EEE6",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#A0522D",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#965C16",
    marginBottom: 20,
    textAlign: "center",
  },
  successImage: {
    width: 160,
    height: 160,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#A0522D",
    paddingVertical: 14,
    paddingHorizontal: 38,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#FFF8F3",
    fontWeight: "bold",
    fontSize: 16,
  },
});