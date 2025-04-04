import Button from "@/components/atoms/button";
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
        <Image source={require("@/assets/images/cards.png")} width={300} />
        <Text style={styles.title}>Shary</Text>
        <Text style={styles.description}>
          Comparte tus diseños y tus vídeos con los demás
        </Text>
        <Button color={Colors.light.primary} bg={Colors.light.white}>
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
