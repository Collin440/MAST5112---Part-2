import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMenu } from "../context/MenuContext";

export default function FilterScreen() {
  const { menu, selectedItemIds, toggleSelectItem } = useMenu();

  // Group menu items by course
  const groupedMenu: Record<string, typeof menu> = {};
  menu.forEach(item => {
    if (!groupedMenu[item.course]) groupedMenu[item.course] = [];
    groupedMenu[item.course].push(item);
  });

  // For consistent course order
  const COURSE_ORDER = ["Starter", "Main", "Dessert"];

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Image
          source={require("../../assets/images/cristo-logo.jpg")}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={COURSE_ORDER}
        keyExtractor={c => c}
        renderItem={({ item: course }) => (
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.courseHeader}>{course}</Text>
            {(groupedMenu[course] || []).map(menuItem => {
              const selected = selectedItemIds.includes(menuItem.id);
              return (
                <TouchableOpacity
                  key={menuItem.id}
                  style={[
                    styles.menuItemRow,
                    selected && styles.menuItemSelected
                  ]}
                  onPress={() => toggleSelectItem(menuItem.id)}
                  activeOpacity={0.7}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.menuItemName}>{menuItem.name}</Text>
                    <Text style={styles.menuItemMeta}>
                      {menuItem.description} | R{menuItem.price}
                    </Text>
                  </View>
                  {selected && (
                    <Text style={styles.selectedCheck}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: "#A0522D", textAlign: "center", marginTop: 20 }}>
            No menu items found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F3", padding: 24 },
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  menuItemSelected: {
    backgroundColor: "#E9D5C0",
    borderColor: "#A0522D",
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
  selectedCheck: {
    fontSize: 22,
    color: "#A0522D",
    fontWeight: "bold",
    marginLeft: 10,
  },
});