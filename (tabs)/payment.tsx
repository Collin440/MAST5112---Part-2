import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function PaymentScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [account, setAccount] = useState("");
  const [branch, setBranch] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    if (!name || !bank || !account || !branch || !amount) {
      Alert.alert("All fields are required!");
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert("Please enter a valid amount.");
      return;
    }
    Alert.alert("Payment submitted!", "Your payment details have been received.");
    navigation.navigate("OrderConfirmed" as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFF8F3" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoRow}>
          <Image
            source={require("../../assets/images/cristo-logo.jpg")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.header}>Payment Details</Text>

        <Image
          source={require("../../assets/images/payment-confirmed.jpg")}
          style={styles.paymentImage}
          resizeMode="contain"
        />

        <Text style={styles.label}>Your Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          value={bank}
          onChangeText={setBank}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter account number"
          keyboardType="numeric"
          value={account}
          onChangeText={setAccount}
        />

        <Text style={styles.label}>Branch Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter branch code"
          value={branch}
          onChangeText={setBranch}
        />

        <Text style={styles.label}>Amount (R)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Submit Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#FFF8F3",
    flexGrow: 1,
    justifyContent: "center",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F5EEE6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A0522D",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#A0522D",
    fontWeight: "600",
    marginBottom: 4,
    marginTop: 10,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#F5EEE6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    color: "#965C16",
  },
  payButton: {
    backgroundColor: "#A0522D",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "#FFF8F3",
    fontWeight: "bold",
    fontSize: 16,
  },
});