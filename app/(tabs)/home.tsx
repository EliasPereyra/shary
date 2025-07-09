import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Input from "@/components/atoms/input";
import { Post } from "@/components/molecules/post";
import Trending from "@/components/molecules/trending";
import NoVideosMessage from "@/components/atoms/no-videos-msg";
import { useAppwriteData } from "@/hooks/useAppwriteData";
import { useUser } from "@/hooks/useUser";
import { getAllPosts, signOut } from "@/services/appwrite";
import { showSuccessMessage } from "@/utils/toastMsgs";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts } = useAppwriteData(getAllPosts());
  const user = useUser();

  const onRefresh = async () => {
    setRefreshing(true);
    // para volver a buscar mas posts
    setTimeout(() => {}, 2000);
    setRefreshing(false);
  };

  const onSignOutHandler = async () => {
    try {
      await signOut();

      showSuccessMessage("Sesión cerrada");
      router.push("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FAF8F8", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id?.toString()}
        ListHeaderComponent={() => (
          <View style={{ padding: 16 }}>
            <ThemedView
              darkColor={Colors.light.primary}
              style={styles.headerContainer}
            >
              <View style={styles.headerText}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <Image
                    source={{
                      uri: user?.avatar,
                    }}
                    style={{ width: 30, height: 30, borderRadius: 10 }}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <ThemedText
                      type="default"
                      darkColor={Colors.light.white}
                      lightColor={Colors.dark.text}
                    >
                      Bienvenido
                    </ThemedText>
                    <ThemedText
                      darkColor={Colors.light.black}
                      lightColor={Colors.light.black}
                      type="title"
                    >
                      {user?.fullname}
                    </ThemedText>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={onSignOutHandler} activeOpacity={0.8}>
                <Image
                  source={require("@/assets/images/logout-icon.png")}
                  style={{ width: 32, height: 32, cursor: "pointer" }}
                />
              </TouchableOpacity>
            </ThemedView>
            <Input
              type="search"
              placeholder="Busca un vídeo"
              value=""
              onChangeText={() => {}}
            />

            <View style={styles.popularVideos}>
              <ThemedText
                style={{ fontSize: 22, marginBottom: 16 }}
                darkColor={Colors.light.middleGray}
              >
                Vídeos Populares
              </ThemedText>

              <Trending posts={posts} />
            </View>
            <ThemedText type="default" style={{ fontSize: 22, marginTop: 40 }}>
              Todos los vídeos
            </ThemedText>
          </View>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              marginTop: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Post key={item.id} post={item} avatar={user?.avatar} />
          </View>
        )}
        ListEmptyComponent={() => <NoVideosMessage />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    flexDirection: "column",
    gap: 8,
  },
  popularVideos: {
    marginTop: 70,
    display: "flex",
    flexDirection: "column",
  },
});
