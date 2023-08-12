import { Tabs } from "expo-router";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useColorScheme, ColorSchemeName } from "react-native";

import Colors from "@/constants/Colors";

export default function TabLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookshelves"
        options={{
          title: "Bookshelves",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={25} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={25} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
