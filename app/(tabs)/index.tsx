import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#007bff", "#00c6ff"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>👋 Bienvenue sur Karangue</Text>
        <Text style={styles.subtitle}>Votre sécurité, notre priorité.</Text>

        <View style={styles.buttonGroup}>
          <MenuButton
            icon="warning"
            label="Signaler un incident"
            color="#ff4d4f"
            onPress={() => router.push("/signaler")}
          />
          <MenuButton
            icon="location-on"
            label="Suivi en direct"
            color="#ffa500"
            onPress={() => router.push("/suivi")}
          />
          <MenuButton
            icon="phone-in-talk"
            label="Contact d'urgence"
            color="#28a745"
            onPress={() => router.push("/urgence")}
          />
          <MenuButton
            icon="info"
            label="Infos utiles"
            color="#17a2b8"
            onPress={() => router.push("/infos")}
          />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

function MenuButton({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color="#fff"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#e0f7fa",
    marginBottom: 30,
  },
  buttonGroup: {
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
