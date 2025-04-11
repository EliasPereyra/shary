import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

interface InputProps {
  label?: string;
  type?: "text" | "search";
  placeholder?: string;
}

export default function Input({ label, type, placeholder }: InputProps) {
  const color = useThemeColor(
    { light: Colors.light.black, dark: Colors.light.black },
    "tint"
  );

  return (
    <View style={styles.inputContainer}>
      <ThemedText type="default">{label}</ThemedText>
      {type === "text" ? (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={color}
        />
      ) : (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.light.middleGray}
          />
          <IconSymbol name="circle.fill" color={color} />
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
    fontSize: 16,
  },
  input: {
    borderColor: Colors.light.middleGray,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.middleGray,
  },
});
