import { Tabs } from "expo-router";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tabIconSelected,
        tabBarInactiveTintColor: Colors["light"].tabIconDefault,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors["light"].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="home" size={focused ? 35 : 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="search" size={focused ? 35 : 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Bookshelves"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="book" size={focused ? 35 : 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={focused ? 35 : 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
