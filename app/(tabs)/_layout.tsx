import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import CustomSplashScreen from "@/components/CustomSplashScreen"; // ⚠️ Corrige le chemin si besoin
import { Slot } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
        setShowSplash(false);
      }, 2500);
    }
  }, [loaded]);

  if (!loaded || showSplash) {
    return <CustomSplashScreen />;
  }

  return (

    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      
    <Slot /> {/* ✅ ESSENTIEL pour que les enfants soient affichés */}
    <StatusBar style="auto" />
      
    </ThemeProvider>
  
  );
}
