import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

import { Colors } from "@/constants/Colors";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

export default function TrendingItem({ activeItem, item }: any) {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{
        marginInline: 8,
      }}
      duration={500}
    >
      {play ? (
        <Video
          useNativeControls
          shouldPlay
          source={{ uri: item.videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setPlay(!play);
            }
          }}
          style={{
            width: "100%",
            height: 320,
            borderWidth: 1,
            borderColor: Colors.light.gray,
            borderRadius: 8,
          }}
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
            source={{ uri: item.thumbnail }}
            style={{
              width: 300,
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
    </Animatable.View>
  );
}
