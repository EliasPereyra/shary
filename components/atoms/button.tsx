import { Colors } from "@/constants/Colors";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ButtonProps {
  children: string;
  bg?: string;
  color?: string;
  onPress: () => void;
  isLoading: boolean;
}

export default function Button({
  children,
  bg,
  color,
  isLoading,
  onPress,
}: ButtonProps) {
  return (
    <View
      style={{
        backgroundColor: bg ? bg : Colors.light.white,
        ...styles.buttonConainer,
      }}
    >
      <TouchableOpacity style={styles.text} onPress={onPress}>
        <Text style={{ color: color ?? Colors.light.white }}>{children}</Text>
        {isLoading && (
          <ActivityIndicator
            color={Colors.light.white}
            animating={isLoading}
            size="small"
          />
        )}
      </TouchableOpacity>
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
