import { useState } from "react";

import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

interface InputProps {
  label?: string;
  type?: "text" | "search" | "description" | "password" | "email";
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
}

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChangeText,
}: InputProps) {
  const color = useThemeColor(
    { light: Colors.light.black, dark: Colors.light.black },
    "tint"
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <ThemedText style={styles.label} type="default">
        {label}
      </ThemedText>
      {type === "text" && (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={color}
          maxLength={100}
          autoCapitalize="none"
          autoCorrect={false}
        />
      )}
      {type === "email" && (
        <>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={color}
            maxLength={100}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
        </>
      )}
      {type === "search" && (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.light.middleGray}
            value={value}
            style={{ width: "100%", padding: 8 }}
            onChangeText={onChangeText}
            maxLength={100}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <IconSymbol name="circle.fill" color={color} />
        </View>
      )}
      {type === "description" && (
        <TextInput
          multiline
          value={value}
          onChangeText={onChangeText}
          numberOfLines={4}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={color}
        />
      )}
      {type === "password" && (
        <View style={styles.password}>
          <TextInput
            secureTextEntry={!showPassword}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={color}
            style={{ width: "90%", padding: 10, fontSize: 18 }}
          />
          <TouchableOpacity
            style={{ paddingInline: 8 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <IconSymbol
              name={`${showPassword ? "eye.fill" : "eye.slash.fill"}`}
              color={Colors.light.black}
              size={24}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    color: Colors.light.black,
    fontSize: 20,
  },
  input: {
    width: "100%",
    borderColor: Colors.light.gray,
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    fontSize: 18,
    color: Colors.light.middleGray,
  },
  password: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.light.gray,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingRight: 2,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.gray,
  },
});
