import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { container } = styles;

  return (
    <View style={container}>
      <Image
        source={require("@/assets/images/share-blue.png")}
        width={62}
        height={62}
      />
      <ThemedText type="title" lightColor={Colors.light.primary}>
        Shary
      </ThemedText>
      <Text style={styles.title}>Shary</Text>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.white,
  },
  title: {
    fontFamily: "Jost-Bold",
    color: Colors.light.primary,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
