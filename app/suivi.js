import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SuiviScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Suivi en direct</Text>
      <Text style={styles.subtitle}>
        Ton trajet s'affichera ici (fonction à venir).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: "center", color: "#555" },
});
