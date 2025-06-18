import { useState } from "react";
import { StyleSheet } from "react-native";
import { Link, router } from "expo-router";

import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import AuthTemplate from "@/components/templates/auth";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { getCurrentUser, logIn, signOut } from "@/services/appwrite";
import { useUserContext } from "@/context/UserAccount.Provider";
import { showErrorMessage, showSuccessMessage } from "@/utils/toastMsgs";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUserAccount, setIsLoggedIn } = useUserContext();
  const { redirect } = styles;

  const submit = async () => {
    setIsLoading(true);
    try {
      await logIn(email, password);

      const user = await getCurrentUser();
      setUserAccount(user);
      setIsLoggedIn(true);

      showSuccessMessage("Bienvenido", "Iniciaste sesión correctamente");
      router.replace("/home");
    } catch (error: any) {
      showErrorMessage(
        "Hubo un error al iniciar sesión",
        "Los datos ingresados son incorrectos"
      );
      await signOut();
      console.error("Error al iniciar sesión", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthTemplate>
      <Input type="email" label="Email" onChangeText={setEmail} value={email} />
      <Input
        type="password"
        label="Contraseña"
        onChangeText={setPassword}
        value={password}
      />
      <ThemedText style={styles.forgotPassword}>
        Olvidé mi contraseña
      </ThemedText>
      <Button
        isLoading={isLoading}
        onPress={submit}
        bg={Colors.light.primary}
        color={Colors.light.white}
      >
        Iniciar sesión
      </Button>
      <Link style={redirect} href="/signup">
        <ThemedText type="default" lightColor={Colors.light.lightGray}>
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
