import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import AddItemsScreen from "./add-items";
import FilterScreen from "./filter";
import HomeScreen from "./home";
import ReviewScreen from "./review-confirmation";
import SelectedItemsScreen from "./selected-items";

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#A0522D",
        tabBarStyle: { backgroundColor: "#F6E4CD" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Filter"
        component={FilterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="filter" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddItems"
        component={AddItemsScreen}
        options={{
          title: "Add Items",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="SelectedItems"
        component={SelectedItemsScreen}
        options={{
          title: "Selected",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="check-square" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Review"
        component={ReviewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="eye" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}