import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import Input from "@/components/atoms/input";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { VideoPost } from "@/types/videoPost";
import { showErrorMessage, showSuccessMessage } from "@/utils/toastMsgs";
import { createVideoPost } from "@/services/appwrite";
import { useUser } from "@/hooks/useUser";

export default function Create() {
  const [form, setForm] = useState<{
    title: string;
    videoUri: File | null;
    thumbnailUri: File | null;
    description: string;
  }>({
    title: "",
    videoUri: null,
    thumbnailUri: null,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useUser();

  const openImagePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets) {
      setForm({ ...form, thumbnailUri: result.assets[0].file as File });
    }
  };

  const openVideoPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["video/mp4", "video/gif"],
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets) {
      setForm({ ...form, videoUri: result.assets[0].file as File });
    }
  };

  const submit = async () => {
    if (!form.title || !form.videoUri || !form.thumbnailUri) {
      showErrorMessage("Error", "Todos los campos son obligatorios");
    }

    const newVideoPost: VideoPost = {
      title: form.title,
      thumbnailUri: form.thumbnailUri as File,
      videoUri: form.videoUri as File,
      description: form.description,
      creator: currentUser.$id,
    };

    setIsLoading(true);

    try {
      await createVideoPost(newVideoPost);

      showSuccessMessage("Video creado", "El video se ha creado correctamente");
      setForm({
        title: "",
        videoUri: null,
        thumbnailUri: null,
        description: "",
      });
      setIsLoading(false);
    } catch (error) {
      showErrorMessage("Error", "Hubo un error al crear el video");
      console.error("Error al crear el video", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.white,
        padding: 16,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <ThemedText
        type="title"
        darkColor={Colors.light.primary}
        style={{ marginTop: 32 }}
      >
        Subir Vídeo
      </ThemedText>

      <View style={{ marginTop: 16 }}>
        <Input
          label="Título del vídeo"
          type="text"
          value={form.title}
          onChangeText={(value) => setForm({ ...form, title: value })}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <ThemedText
          style={{ fontSize: 20 }}
          type="default"
          darkColor={Colors.light.primary}
        >
          Sube un vídeo
        </ThemedText>
        <TouchableOpacity onPress={() => openVideoPicker()}>
          <View style={{ width: "100%", marginTop: 8 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: form.videoUri
                  ? Colors.light.primary
                  : Colors.light.gray,
                borderRadius: 8,
                borderStyle: "dashed",
                width: "100%",
                height: 200,
                padding: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {form.videoUri ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ThemedText
                    style={{ fontSize: 20 }}
                    type="bold"
                    darkColor={Colors.light.primary}
                  >
                    Video seleccionado!
                  </ThemedText>
                  <ThemedText
                    style={{ marginTop: 12 }}
                    type="default"
                    darkColor={Colors.light.lightGray}
                  >
                    Title: {form.videoUri.name}
                  </ThemedText>
                  <ThemedText type="default" darkColor={Colors.light.lightGray}>
                    Size: {Number((form.videoUri.size! / 1000000).toFixed(2))}mb
                  </ThemedText>
                </View>
              ) : (
                <>
                  <Image
                    source={require("@/assets/images/upload.png")}
                    alt="Upload icon"
                    style={{ width: 50, height: 50 }}
                  />
                  <ThemedText
                    type="default"
                    darkColor={Colors.light.lightGray}
                    style={{ marginTop: 12 }}
                  >
                    De formato mp4 o gif.
                  </ThemedText>
                  <ThemedText type="default" darkColor={Colors.light.lightGray}>
                    Tamaño recomendado 1280x720. Max 10mb.
                  </ThemedText>
                </>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <TouchableOpacity onPress={() => openImagePicker()}>
          <View
            style={{
              width: "100%",
              height: 140,
              borderColor: form.thumbnailUri
                ? Colors.light.primary
                : Colors.light.gray,
              borderWidth: 1,
              borderRadius: 8,
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            {form.thumbnailUri ? (
              <>
                <Image
                  source={{ uri: URL.createObjectURL(form.thumbnailUri) }}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.3,
                  }}
                />
                <ThemedText
                  style={{ position: "absolute" }}
                  type="default"
                  lightColor={Colors.light.primary}
                >
                  Sube otra miniatura
                </ThemedText>
              </>
            ) : (
              <View style={{ display: "flex", alignItems: "center" }}>
                <Image
                  source={require("@/assets/images/picture.png")}
                  alt="Icono de upload"
                  style={{ width: 40, height: 40 }}
                />
                <ThemedText
                  style={{ marginTop: 12 }}
                  type="default"
                  lightColor={Colors.light.middleGray}
                >
                  De formato jpg o png.
                </ThemedText>
                <ThemedText type="default" lightColor={Colors.light.middleGray}>
                  Sube una miniatura para el vídeo.
                </ThemedText>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <Input
          type="description"
          label="Escribe una descripción"
          value={form.description}
          onChangeText={(value) => setForm({ ...form, description: value })}
        />
      </View>

      <TouchableOpacity
        onPress={submit}
        style={styles.button}
        activeOpacity={0.7}
      >
        <ThemedText
          type="bold"
          style={{ color: Colors.light.white, textAlign: "center" }}
        >
          {isLoading ? "Cargando..." : "Subir y Publicar"}
        </ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 8,
    cursor: "pointer",
  },
});
