import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMenu } from "../context/MenuContext";

export default function SelectedScreen() {
  const { menu, selectedItemIds, toggleSelectItem } = useMenu();

  // Filter selected items
  const selectedItems = menu.filter(item => selectedItemIds.includes(item.id));

  // Group by course
  const grouped: Record<string, typeof selectedItems> = {};
  selectedItems.forEach(item => {
    if (!grouped[item.course]) grouped[item.course] = [];
    grouped[item.course].push(item);
  });
  const COURSE_ORDER = ["Starter", "Main", "Dessert"];

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

      <Text style={styles.header}>Selected Items</Text>
      {selectedItems.length === 0 ? (
        <Text style={styles.emptyText}>No items selected yet. Go to Menu and tap to select your favourites!</Text>
      ) : (
        COURSE_ORDER.map(course =>
          grouped[course]?.length ? (
            <View key={course} style={{ marginBottom: 18 }}>
              <Text style={styles.courseHeader}>{course}</Text>
              {grouped[course].map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItemRow}
                  onPress={() => toggleSelectItem(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemMeta}>
                      {item.description} | R{item.price}
                    </Text>
                  </View>
                  <Text style={styles.deselectHint}>Tap to remove</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null
        )
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
    flexDirection: "row",
    alignItems: "center",
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
  deselectHint: {
    color: "#B8860B",
    fontSize: 13,
    fontStyle: "italic",
    marginLeft: 10,
  },
  emptyText: {
    color: "#A0522D",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});