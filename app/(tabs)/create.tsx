import { Alert, Button, Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";

import Input from "@/components/atoms/input";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useState } from "react";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    description: "",
  });

  const openPicker = (selectType: string) => {
    const result = DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
  };

  const submit = () => {
    return Alert.alert(form.title, form.description);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.white,
        padding: 16,
        height: "100%",
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
        <ThemedText>Sube un vídeo</ThemedText>
        <TouchableOpacity>
          <View style={{ width: "100%", marginTop: 8 }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.light.middleGray,
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
              <Image
                source={require("@/assets/images/upload.png")}
                alt="Upload icon"
                style={{ width: 50, height: 50 }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 16 }}>
        <ThemedText lightColor={Colors.light.black}>
          Sube una miniatura
        </ThemedText>
        <TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 100,
              borderColor: Colors.light.middleGray,
              borderWidth: 1,
              borderRadius: 8,
              padding: 16,
              marginTop: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              source={require("@/assets/images/upload.png")}
              alt="Icono de upload"
              style={{ width: 50, height: 50 }}
            />
            <ThemedText type="default" lightColor={Colors.light.middleGray}>
              Sube una miniatura
            </ThemedText>
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

      <Button title="Subir & Publicar" onPress={submit} />
    </SafeAreaView>
  );
}
