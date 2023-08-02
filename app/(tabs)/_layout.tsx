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
          backgroundColor: "#e0218a",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={27} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={27} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
