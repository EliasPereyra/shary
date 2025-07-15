import { Redirect, Tabs } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useUserContext } from "@/context/UserAccount.Provider";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isLoading, isLoggedIn } = useUserContext();

  if (!isLoading && !isLoggedIn) return <Redirect href="/signin" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: "#F3F3F3",
            borderColor: "#D5D5D5",
          },
          android: {
            backgroundColor: "#FAF8F8",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
          ios: {
            backgroundColor: "#FAF8F8",
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/tabler_home-filled.png")}
              style={styles.iconSize}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Crear",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/carbon_add-filled.png")}
              style={styles.iconSize}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/profile-fill.png")}
              style={styles.iconSize}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Guardado",

          tabBarIcon: () => (
            <Image
              source={require("@/assets/images/bookmark-rounded.png")}
              style={styles.iconSize}
            />
          ),
        }}
      />

      <StatusBar backgroundColor="#171717" style="light" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconSize: {
    width: 20,
    height: 20,
  },
});
