import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useSession } from "@/context/authProvider";
import { View } from "react-native";
import {
  CreditCardIcon,
  Home,
  HomeIcon,
  UserCircle,
  UserCircle2,
} from "lucide-react-native";
import TabIcon from "@/components/TabIcon";

export default function TabLayout() {
  const Auth = useSession();

  if (!Auth.session) return <Redirect href="/signin" />;
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#49E582",
        tabBarInactiveTintColor: "#E0E0E0",
        tabBarStyle: {
          position: "absolute",
          height: 75,
          left: 36,
          right: 36,
          bottom: 24,
          borderRadius: 30,
          backgroundColor: "#263238",
          alignItems: "center",
          width: "80%",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={color}
              name="Profile"
              focused={focused}
              icon={<HomeIcon size={size} color={color} />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={color}
              name="Carte"
              focused={focused}
              icon={<CreditCardIcon size={size} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="auth"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              color={color}
              name="Profile"
              focused={focused}
              icon={<UserCircle2 size={size} color={color} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="BarCodeScanner"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
