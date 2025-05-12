import { Image, Text, View } from "react-native";

export default function NoVideosMessage() {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <Image
        source={require("@/assets/images/search-off.png")}
        style={{ width: 20, height: 20 }}
      />
      <Text>No se encontraron vídeos</Text>
    </View>
  );
}
