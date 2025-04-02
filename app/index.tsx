import { Colors } from "@/constants/Colors";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Image
          source={require("@/assets/images/shary-white.png")}
          width={62}
          height={62}
        />
        <Text style={styles.title}>Shary</Text>
        <Text style={styles.description}>
          Comparte tus diseños y tus vídeos con los demás
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.primary,
  },
  textContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.light.white,
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    color: Colors.light.white,
    fontSize: 16,
    marginTop: 10,
    width: 200,
  },
});
