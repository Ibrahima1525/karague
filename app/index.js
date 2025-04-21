import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👋 Bienvenue sur Karangue</Text>
      <Text style={styles.subtitle}>Votre sécurité, notre priorité.</Text>

      <View style={styles.buttonGroup}>
        <Button
          title="🚨 Signaler un incident"
          onPress={() => router.push("/signaler")}
        />
        <View style={styles.spacer} />
        <Button
          title="📍 Suivi en direct"
          onPress={() => router.push("/suivi")}
        />
        <View style={styles.spacer} />
        <Button
          title="☎️ Contact d'urgence"
          onPress={() => router.push("/urgence")}
        />
        <View style={styles.spacer} />
        <Button title="ℹ️ Infos utiles" onPress={() => router.push("/infos")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 32,
  },
  buttonGroup: {
    gap: 12,
  },
  spacer: {
    height: 12,
  },
});
