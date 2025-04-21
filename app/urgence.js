import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";

export default function UrgenceScreen() {
  const appeler = () =>
    Alert.alert("📞 Appel lancé au contact d'urgence (simulation)");
  const envoyerMessage = () =>
    Alert.alert("✉️ Message d'urgence envoyé (simulation)");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 Contact d'urgence</Text>
      <Button title="Appeler le contact" onPress={appeler} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Envoyer un message" onPress={envoyerMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
});
