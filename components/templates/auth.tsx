import { Image, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { container } = styles;

  return (
    <ThemedView style={container}>
      <Image
        source={require("@/assets/images/share-blue.png")}
        style={{ width: 62, height: 62 }}
        width={62}
        height={62}
      />
      <ThemedText type="title" darkColor={Colors.light.primary}>
        Shary
      </ThemedText>
      <View>{children}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: Colors.light.white,
    padding: 16,
  },
  title: {
    fontFamily: "Jost-Bold",
    color: Colors.light.primary,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
