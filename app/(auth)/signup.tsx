import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import AuthTemplate from "@/components/templates/auth";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function Signup() {
  return (
    <AuthTemplate>
      <Input label="Nombre Completo " type="text" />
      <Input label="Email" type="text" />
      <Input label="Contraseña" type="text" />
      <Button bg={Colors.light.primary} color={Colors.light.white} href="/">
        Registrarse
      </Button>
      <Link style={styles.redirect} href="/signin">
        <ThemedText type="default">
          ¿Ya tienes una cuenta?{" "}
          <ThemedText type="bold">Iniciar sesión</ThemedText>
        </ThemedText>
      </Link>
    </AuthTemplate>
  );
}

const styles = StyleSheet.create({
  redirect: {
    width: "100%",
    textAlign: "center",
    marginTop: 20,
    color: Colors.light.middleGray,
    fontSize: 16,
  },
});
