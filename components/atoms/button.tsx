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
      <TouchableOpacity onPress={onPress}>
        <Text style={{ color: color ?? Colors.light.white }}>
          {isLoading ? (
            <ActivityIndicator
              color={Colors.light.white}
              animating={isLoading}
              size="small"
            />
          ) : (
            children
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonConainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderRadius: 8,
    padding: 16,
  },
});
