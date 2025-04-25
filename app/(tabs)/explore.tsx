import { ScrollView } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedView>
        <ThemedText type="title">Écran Explore</ThemedText>

        <Collapsible title="Section 1">
          <ThemedText>Contenu de la section 1</ThemedText>
        </Collapsible>

        <Collapsible title="Section 2">
          <ThemedText>Contenu de la section 2</ThemedText>
        </Collapsible>
      </ThemedView>
    </ScrollView>
  );
}
