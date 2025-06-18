import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import Toast from "react-native-toast-message";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserAccountProvider } from "@/context/UserAccount.Provider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fonts, error] = useFonts({
    "Jost-Black": require("@/assets/fonts/Jost-Black.ttf"),
    "Jost-Bold": require("@/assets/fonts/Jost-Bold.ttf"),
    "Jost-SemiBold": require("@/assets/fonts/Jost-SemiBold.ttf"),
    "Jost-Medium": require("@/assets/fonts/Jost-Medium.ttf"),
    "Jost-Regular": require("@/assets/fonts/Jost-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fonts) {
      SplashScreen.hideAsync();
    }
  }, [fonts]);

  if (!fonts && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <UserAccountProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </UserAccountProvider>
    </ThemeProvider>
  );
}
