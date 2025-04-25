import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  children: string;
  bg?: string;
  color?: string;
  href: Href;
}

export default function Button({ children, bg, color, href }: ButtonProps) {
  return (
    <View
      style={{
        backgroundColor: bg ? bg : Colors.light.white,
        ...styles.buttonConainer,
      }}
    >
      <Link href={href} style={styles.text}>
        <Text style={{ color: color ?? Colors.light.white }}>{children}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonConainer: {
    marginTop: 10,
    borderRadius: 8,
    padding: 14,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
