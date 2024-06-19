import { Redirect, Tabs } from "expo-router";
import React from "react";

import { useSession } from "@/context/authProvider";
import { HomeIcon, UserCircle2 } from "lucide-react-native";
import TabIcon from "@/components/TabIcon";
import { Header } from ".";

export default function TabLayout() {
  const Auth = useSession();

  if (!Auth.session) return <Redirect href="/adminSignin" />;

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#49E582",
          tabBarInactiveTintColor: "#E0E0E0",
          tabBarStyle: {
            position: "absolute",
            height: 75,
            left: 36,
            right: 36,
            bottom: 10,
            borderRadius: 25,
            backgroundColor: "#263238",
            alignItems: "center",
            width: "80%",
            elevation: 0,
            shadowOpacity: 0.1,
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
          name="profile"
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
      </Tabs>
    </>
  );
}
