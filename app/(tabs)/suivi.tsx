import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function SuiviScreen() {
  return (
    <LinearGradient colors={["#8E2DE2", "#4A00E0"]} style={styles.container}>
      <View style={styles.inner}>
        <Ionicons name="map" size={60} color="#fff" />
        <Text style={styles.title}>📍 Suivi en direct</Text>
        <Text style={styles.subtitle}>
          Cette fonctionnalité sera bientôt disponible !
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  inner: {
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  subtitle: {
    color: "#eee",
    fontSize: 16,
    textAlign: "center",
  },
});
