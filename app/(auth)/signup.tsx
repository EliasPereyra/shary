import { Link, router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

import Input from "@/components/atoms/input";
import AuthTemplate from "@/components/templates/auth";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { createUser } from "@/services/appwrite";
import { showErrorMessage } from "@/utils/toastMsgs";
import Button from "@/components/atoms/button";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    try {
      setIsLoading(true);
      await createUser({
        email,
        password,
        fullname: fullName,
      });

      setIsLoading(false);
      router.push("/signin");
    } catch (error) {
      console.error("Error al crear el usuario", error);
      showErrorMessage(
        "Hubo un error al crear el usuario",
        "Intentalo de nuevo"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      <Input
        label="Nombre Completo "
        type="text"
        onChangeText={setFullName}
        value={fullName}
      />
      <Input label="Email" type="email" onChangeText={setEmail} value={email} />
      <Input
        label="Contraseña"
        type="password"
        onChangeText={setPassword}
        value={password}
      />
      <Button isLoading={isLoading} bg={Colors.light.primary} onPress={submit}>
        Registrarse
      </Button>
      <Link style={styles.redirect} href="/signin">
        <ThemedText type="default" lightColor={Colors.light.lightGray}>
          ¿Ya tienes una cuenta?{" "}
          <ThemedText type="bold">Inicia sesión</ThemedText>
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
