import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import AuthTemplate from "@/components/templates/auth";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function Signin() {
  const { redirect } = styles;

  return (
    <AuthTemplate>
      <Input type="text" label="Email" />
      <Input type="text" label="Contraseña" />
      <Text style={styles.forgotPassword}>Olvidé mi contraseña</Text>
      <Button
        href="/(tabs)"
        bg={Colors.light.primary}
        color={Colors.light.white}
      >
        Iniciar sesión
      </Button>
      <Link style={redirect} href="/signup">
        <ThemedText type="default">
          ¿No tienes una cuenta?{" "}
          <ThemedText type="bold" style={{ color: Colors.light.black }}>
            Regístrate
          </ThemedText>
        </ThemedText>
      </Link>
    </AuthTemplate>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    fontSize: 14,
    color: Colors.light.middleGray,
    textAlign: "right",
    marginBottom: 10,
  },
  redirect: {
    textAlign: "center",
    width: "100%",
    marginTop: 20,
    color: Colors.light.middleGray,
    fontSize: 16,
  },
});
