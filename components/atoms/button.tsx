import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  children: string;
  bg?: string;
  color?: string;
}

export default function Button({ children, bg, color }: ButtonProps) {
  return (
    <View
      style={{
        backgroundColor: bg ? bg : Colors.light.white,
        ...styles.buttonConainer,
      }}
    >
      <Text style={{ color: color ?? Colors.light.white, ...styles.text }}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonConainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 14,
    width: "100%",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
