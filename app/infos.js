import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function InfosScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ℹ️ Infos utiles</Text>
      <Text style={styles.text}>
        • Reste toujours visible et lumineux la nuit.
      </Text>
      <Text style={styles.text}>
        • Informe un proche de tes déplacements sensibles.
      </Text>
      <Text style={styles.text}>
        • En cas de danger : reste calme, cherche un lieu sûr.
      </Text>
      <Text style={styles.text}>
        • Active les notifications pour recevoir les alertes en temps réel.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: { fontSize: 16, marginBottom: 10 },
});
