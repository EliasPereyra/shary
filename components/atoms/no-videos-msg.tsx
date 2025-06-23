import { Image, View } from "react-native";

import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

export default function NoVideosMessage() {
  return (
    <View style={{ padding: 16, display: "flex", flexDirection: "column" }}>
      <Image
        source={require("@/assets/images/search-off.png")}
        style={{ width: 60, height: 60, marginBottom: 8 }}
      />
      <ThemedText
        type="default"
        darkColor={Colors.light.black}
        style={{ marginBottom: 16 }}
      >
        No se encontraron vídeos. Crea uno y comparte con los demás.
      </ThemedText>
    </View>
  );
}
