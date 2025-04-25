import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Karangue</Text>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff", // 💙 Couleur de fond (modifie si tu veux)
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
