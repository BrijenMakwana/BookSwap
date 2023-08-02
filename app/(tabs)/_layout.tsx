import { Tabs } from "expo-router";
import { Entypo, FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["dark"].tabIconSelected,
        tabBarInactiveTintColor: Colors["dark"].tabIconDefault,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#222222",
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
        name="two"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user" size={focused ? 35 : 22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
