import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function UrgenceScreen() {
  const callNumber = (num) => Linking.openURL(`tel:${num}`);

  return (
    <LinearGradient colors={["#ff416c", "#ff4b2b"]} style={styles.container}>
      <Text style={styles.title}>🚨 Contacts d'urgence</Text>

      {[
        { label: "Police", number: "17", icon: "shield" },
        { label: "Pompiers", number: "18", icon: "flame" },
        { label: "SAMU", number: "15", icon: "medkit" },
        { label: "Numéro Européen", number: "112", icon: "globe" },
      ].map(({ label, number, icon }) => (
        <TouchableOpacity
          key={number}
          style={styles.button}
          onPress={() => callNumber(number)}
        >
          <Ionicons name={icon} size={22} color="white" />
          <Text style={styles.buttonText}>
            {label} – {number}
          </Text>
        </TouchableOpacity>
      ))}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#00000066",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
