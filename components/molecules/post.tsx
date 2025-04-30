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
import { Colors } from "@/constants/Colors";

export default function Post({ post }: any) {
  const [play, setPlay] = useState(false);

  return (
    <View style={styles.container}>
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
          source={require("@/assets/images/img-1.png")}
        />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>{post.title}</Text>
          <Text style={{ fontSize: 12, color: Colors.light.middleGray }}>
            {post.author}
          </Text>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: post.video }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          shouldPlay
          style={{ width: "100%", height: 420 }}
          videoStyle={{ borderRadius: 8 }}
        />
      ) : (
        <TouchableOpacity
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
        >
          <ImageBackground
            source={post.thumbnail}
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
