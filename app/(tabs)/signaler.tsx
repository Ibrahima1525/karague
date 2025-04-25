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
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase";

type LocationCoords = {
  latitude: number;
  longitude: number;
};

export default function SignalerScreen() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [typeIncident, setTypeIncident] = useState("vol");
  const [service, setService] = useState("police");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGeolocate = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "La géolocalisation est nécessaire.");
      return;
    }

    const position = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    setLocation(coords);
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

    if (!result.canceled && result.assets?.length) {
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
        serviceConcerné: service,
        description,
        location,
        createdAt: new Date(),
      });

      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(getStorage(), `images/${docRef.id}.jpg`);
        await uploadBytes(imageRef, blob);
        const downloadURL = await getDownloadURL(imageRef);
        console.log("✅ Image URL :", downloadURL);
      }

      Keyboard.dismiss();
      Alert.alert("✅ Signalement envoyé", "Merci pour votre contribution !");
      setDescription("");
      setLocation(null);
      setTypeIncident("vol");
      setService("police");
      setImage(null);
    } catch (error) {
      console.error("❌ Erreur : ", error);
      Alert.alert("Erreur", "Impossible d'envoyer le signalement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📝 Signaler un incident</Text>

      <Text style={styles.label}>Type d'incident :</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={typeIncident} onValueChange={setTypeIncident}>
          <Picker.Item label="Vol" value="vol" />
          <Picker.Item label="Agression" value="agression" />
          <Picker.Item label="Accident" value="accident" />
          <Picker.Item label="Catastrophe naturelle" value="catastrophe" />
          <Picker.Item label="Autre" value="autre" />
        </Picker>
      </View>

      <Text style={styles.label}>Service concerné :</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={service} onValueChange={setService}>
          <Picker.Item label="Police" value="police" />
          <Picker.Item label="Gendarmerie" value="gendarmerie" />
          <Picker.Item label="Pompiers" value="pompier" />
          <Picker.Item label="SAMU" value="samu" />
          <Picker.Item label="Autre" value="autre" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Décris le problème ici..."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.actionButton} onPress={handleGeolocate}>
        <Text style={styles.actionButtonText}>📍 Ajouter ma position</Text>
      </TouchableOpacity>

      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} />
          </MapView>
          <Text style={styles.locationText}>
            Coordonnées : {location.latitude}, {location.longitude}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
        <Text style={styles.actionButtonText}>📷 Joindre une photo</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <View style={styles.buttons}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Button title="📨 Envoyer" onPress={handleSubmit} />
            <View style={{ height: 12 }} />
            <Button
              title="🚨 SOS"
              color="#FF3B30"
              onPress={() =>
                Alert.alert("🚨 Urgence", "Appel d’urgence simulé.")
              }
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
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  pickerContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 8,
  },
  actionButtonText: {
    color: "white",
    fontWeight: "600",
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  locationText: {
    marginTop: 8,
    fontStyle: "italic",
    textAlign: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttons: {
    marginTop: 16,
  },
});
