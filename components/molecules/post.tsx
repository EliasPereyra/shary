import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {} from "expo-file-system";

import { Colors } from "@/constants/Colors";

export default function Post(key, post, avatar) {
  const [play, setPlay] = useState(false);

  return (
    <View key={key} style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 100 }}
          source={{ uri: avatar }}
        />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {post?.title}
          </Text>
          <Text style={{ fontSize: 12, color: Colors.light.middleGray }}>
            {post?.creator}
          </Text>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: post?.videoUrl }}
          useNativeControls
          shouldPlay
          style={{
            width: "100%",
            height: 320,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: Colors.light.gray,
          }}
          resizeMode={ResizeMode.CONTAIN}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.light.gray,
            borderRadius: 8,
          }}
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={{ uri: post?.thumbnail }}
            onProgress={() => setPlay(true)}
            style={{
              width: "100%",
              height: 320,
              overflowY: "hidden",
              borderRadius: 8,
            }}
            resizeMode="cover"
          />
          <Image
            source={require("@/assets/images/play.png")}
            style={{
              width: 42,
              height: 42,
              position: "absolute",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
    marginTop: 8,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  authorContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  authorImg: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
});
