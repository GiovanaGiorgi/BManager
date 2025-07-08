import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  erro?: boolean;
}

export default function FloatingLabelInput({
  label,
  value,
  onChangeText,
  erro,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const showLabel = isFocused || value !== "";

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={showLabel ? "" : label}
        style={[styles.input, erro && { borderColor: "red", borderWidth: 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginLeft: 4,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#ccc",
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});
