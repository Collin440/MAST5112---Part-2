import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMenu } from "../context/MenuContext";

export default function ReviewScreen() {
  const { menu, selectedItemIds } = useMenu();
  const navigation = useNavigation();

  // Get selected items
  const selectedItems = menu.filter(item => selectedItemIds.includes(item.id));

  // Group selected items by course
  const grouped: Record<string, typeof selectedItems> = {};
  selectedItems.forEach(item => {
    if (!grouped[item.course]) grouped[item.course] = [];
    grouped[item.course].push(item);
  });
  const COURSE_ORDER = ["Starter", "Main", "Dessert"];

  // Calculate total
  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleEdit = () => {
    navigation.navigate("Filter" as never);
  };

  const handleConfirm = () => {
    Alert.alert("Order Confirmed", "Your menu selection has been confirmed!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/images/cristo-logo.jpg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.header}>Review Your Selection</Text>

      {selectedItems.length === 0 ? (
        <Text style={styles.emptyText}>No items selected. Please go to Menu and select your dishes.</Text>
      ) : (
        <>
          {COURSE_ORDER.map(course =>
            grouped[course]?.length ? (
              <View key={course} style={{ marginBottom: 18 }}>
                <Text style={styles.courseHeader}>{course}</Text>
                {grouped[course].map(item => (
                  <View key={item.id} style={styles.menuItemRow}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemMeta}>
                      {item.description} | R{item.price}
                    </Text>
                  </View>
                ))}
              </View>
            ) : null
          )}
          <Text style={styles.totalText}>Total: <Text style={{fontWeight: "bold"}}>R{total}</Text></Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit Selection</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF8F3",
    padding: 24,
    paddingBottom: 40,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 8,
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
  courseHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#965C16",
    marginBottom: 8,
    marginTop: 12,
  },
  menuItemRow: {
    backgroundColor: "#F5EEE6",
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
  },
  menuItemName: {
    fontWeight: "bold",
    color: "#A0522D",
    fontSize: 16,
  },
  menuItemMeta: {
    color: "#965C16",
    fontSize: 14,
    marginTop: 2,
  },
  totalText: {
    color: "#A0522D",
    fontSize: 18,
    marginVertical: 18,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#F5EEE6",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A0522D",
  },
  editButtonText: {
    color: "#A0522D",
    fontWeight: "bold",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#A0522D",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "#FFF8F3",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    color: "#A0522D",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});