import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

type HapticTabProps = {
  label: string;
  onPress?: () => void;
};

export default function HapticTab({ label, onPress }: HapticTabProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <Animated.View style={[styles.button, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  pressable: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
