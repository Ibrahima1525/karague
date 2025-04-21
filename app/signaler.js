import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Keyboard,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MapView, { Marker } from "react-native-maps"; // Importer MapView et Marker

export default function SignalerScreen() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [typeIncident, setTypeIncident] = useState("vol");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeolocate = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "La géolocalisation est nécessaire.");
      return;
    }

    const position = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Accès aux images requis.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!description.trim()) {
      Alert.alert("⚠️ Attention", "La description est vide.");
      return;
    }

    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "signalements"), {
        type: typeIncident,
        description,
        location,
        image, // l'URI de la photo choisie
        createdAt: new Date(),
      });

      console.log("✅ Signalement envoyé avec succès : ", docRef.id); // Log de l'ID du document Firestore

      // Optionnel : Si une image est ajoutée, on peut la télécharger
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(getStorage(), `images/${Date.now()}.jpg`);
        await uploadBytes(imageRef, blob);

        const downloadURL = await getDownloadURL(imageRef);
        console.log("✅ Image téléchargée avec l'URL : ", downloadURL); // Log de l'URL de l'image téléchargée
      }

      Keyboard.dismiss();
      Alert.alert(
        "✅ Signalement envoyé",
        `Votre signalement a été envoyé avec succès !`
      );

      // Reset
      setDescription("");
      setLocation(null);
      setTypeIncident("vol");
      setImage(null);
    } catch (error) {
      console.error("❌ Erreur lors de l'envoi du signalement : ", error);
      Alert.alert("Erreur", "Impossible d'envoyer le signalement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>📝 Signaler un incident</Text>

      <Text style={styles.label}>Type d'incident :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={typeIncident}
          onValueChange={(itemValue) => setTypeIncident(itemValue)}
        >
          <Picker.Item label="👜 Vol" value="vol" />
          <Picker.Item label="🤕 Agression" value="agression" />
          <Picker.Item label="🚗 Accident" value="accident" />
          <Picker.Item label="🌪️ Catastrophe naturelle" value="catastrophe" />
          <Picker.Item label="❓ Autre" value="autre" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Décris le problème..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <Button title="📍 Ajouter ma position" onPress={handleGeolocate} />

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={location} />
          </MapView>
          <Text style={styles.location}>
            📌 {location.latitude}, {location.longitude}
          </Text>
        </View>
      )}

      <View style={{ marginVertical: 10 }}>
        <Button title="📷 Joindre une photo" onPress={pickImage} />
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
            marginBottom: 10,
          }}
        />
      )}

      <View style={styles.buttons}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <>
            <Button title="Envoyer le signalement" onPress={handleSubmit} />
            <View style={styles.spacer} />
            <Button
              title="🔴 Bouton SOS"
              color="red"
              onPress={() => Alert.alert("🚨 SOS", "Appel d’urgence simulé")}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  input: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: "top",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  location: {
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
    color: "#333",
  },
  buttons: {
    marginTop: 20,
  },
  spacer: {
    height: 12,
  },
  mapContainer: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
