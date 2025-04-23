import Button from "@/components/atoms/button";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.textContainer}>
        <Image
          style={{ width: 62, height: 62 }}
          source={require("@/assets/images/shary-white.png")}
          width={32}
          height={32}
        />
        <Image
          style={{ width: 300, height: 300 }}
          source={require("@/assets/images/cards.png")}
          width={100}
          height={100}
        />
        <Text style={styles.title}>Shary</Text>
        <ThemedText type="default" style={styles.description}>
          Comparte tus diseños y tus vídeos con los demás
        </ThemedText>
        <Button
          href="/signin"
          color={Colors.light.primary}
          bg={Colors.light.white}
        >
          Continuar con email
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 26,
    height: "100%",
    backgroundColor: Colors.light.primary,
  },
  textContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    color: Colors.light.white,
    fontSize: 64,
    fontWeight: "bold",
  },
  description: {
    fontWeight: "regular",
    textAlign: "center",
    color: Colors.light.lightGray,
    fontSize: 20,
    marginTop: 10,
    width: 280,
  },
});
