import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SplashScreen() {
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); // 👈 Redirige vers l'accueil
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#FF5F6D", "#FFC371"]} style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 1200 }}
        style={styles.inner}
      >
        <Ionicons name="shield-checkmark" size={70} color="white" />
        <Text style={styles.title}>Karangue</Text>
        <Text style={styles.subtitle}>Votre sécurité, notre priorité</Text>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    alignItems: "center",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  subtitle: {
    color: "#fff",
    marginTop: 8,
    fontSize: 16,
  },
});
