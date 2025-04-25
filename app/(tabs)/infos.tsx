import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function InfosScreen() {
  const infos = [
    { icon: "information-circle", text: "Restez calme en cas d’urgence." },
    { icon: "call", text: "Appelez les secours en priorité." },
    {
      icon: "location",
      text: "Envoyez votre localisation exacte si possible.",
    },
    {
      icon: "document-text",
      text: "Préparez une description claire de l’incident.",
    },
    { icon: "shield-checkmark", text: "Suivez les instructions des secours." },
  ];

  return (
    <LinearGradient colors={["#36D1DC", "#5B86E5"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>ℹ️ Infos utiles</Text>
        {infos.map((info, idx) => (
          <View key={idx} style={styles.card}>
            <Ionicons name={info.icon} size={22} color="#fff" />
            <Text style={styles.cardText}>{info.text}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#00000040",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
});
