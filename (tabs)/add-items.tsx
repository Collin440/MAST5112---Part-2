import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMenu } from "../context/MenuContext";

const COURSES = [
  { label: "Starter", value: "Starter" },
  { label: "Main", value: "Main" },
  { label: "Dessert", value: "Dessert" },
];

export default function AddItemsScreen() {
  const { menu, addMenuItem, editMenuItem, deleteMenuItem } = useMenu();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState(COURSES[0].value);
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    if (!name || !description || !course || !price) {
      Alert.alert("All fields are required!");
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert("Please enter a valid price.");
      return;
    }
    if (editingId) {
      editMenuItem(editingId, {
        name,
        description,
        course,
        price: parseFloat(price),
      });
      setEditingId(null);
      Alert.alert("Item updated!");
    } else {
      addMenuItem({ name, description, course, price: parseFloat(price) });
      Alert.alert("Item added!");
    }
    setName("");
    setDescription("");
    setCourse(COURSES[0].value);
    setPrice("");
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price.toString());
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this menu item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteMenuItem(id),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoRow}>
            <Image
              source={require("../../assets/images/cristo-logo.jpg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.header}>Add Menu Item</Text>

          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description of Dish</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <Text style={styles.label}>Courses</Text>
          <View style={styles.courseRow}>
            {COURSES.map((c) => (
              <TouchableOpacity
                key={c.value}
                style={[
                  styles.courseButton,
                  course === c.value && styles.courseButtonSelected,
                ]}
                onPress={() => setCourse(c.value)}
              >
                <Text
                  style={[
                    styles.courseButtonText,
                    course === c.value && styles.courseButtonTextSelected,
                  ]}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddOrEdit}>
            <Text style={styles.addButtonText}>
              {editingId ? "Save Changes" : "Add Item"}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.header, { fontSize: 20, marginTop: 24 }]}>
            Current Menu
          </Text>
          {menu.length === 0 ? (
            <Text
              style={{
                color: "#A0522D",
                textAlign: "center",
                marginTop: 12,
              }}
            >
              No items in the menu yet.
            </Text>
          ) : (
            menu.map((item) => (
              <View key={item.id} style={styles.menuItemRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemMeta}>
                    {item.course} | {item.description} | R{item.price}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleEdit(item)}
                  style={styles.iconButton}
                >
                  <Ionicons name="create-outline" size={22} color="#A0522D" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  style={styles.iconButton}
                >
                  <Ionicons name="trash-outline" size={22} color="#A0522D" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#FFF8F3",
    paddingBottom: 40,
  },
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
  courseRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginTop: 4,
  },
  courseButton: {
    backgroundColor: "#F5EEE6",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  courseButtonSelected: {
    backgroundColor: "#A0522D",
  },
  courseButtonText: {
    color: "#A0522D",
    fontWeight: "600",
  },
  courseButtonTextSelected: {
    color: "#FFF8F3",
  },
  addButton: {
    backgroundColor: "#A0522D",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 14,
  },
  addButtonText: {
    color: "#FFF8F3",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuItemRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5EEE6",
    borderRadius: 8,
    marginBottom: 10,
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
  iconButton: {
    marginLeft: 10,
    padding: 4,
  },
});