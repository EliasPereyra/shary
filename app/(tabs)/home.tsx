import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Input from "@/components/atoms/input";
import Post from "@/components/molecules/post";
import Trending from "@/components/molecules/trending";
import NoVideosMessage from "@/components/atoms/no-videos-msg";
import { Colors } from "@/constants/Colors";
import { objs } from "@/utils/mock";
import { useUserContext } from "@/context/UserAccount.Provider";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { userAccount } = useUserContext();

  const onRefresh = async () => {
    setRefreshing(true);
    // para volver a buscar mas posts
    setTimeout(() => {}, 2000);
    setRefreshing(false);
  };

  return (
    // TODO: Make difference between the screen bg color and the tabbar bg
    <SafeAreaView style={{ backgroundColor: "#FAF8F8" }}>
      <FlatList
        data={objs}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={{ padding: 16 }}>
            <ThemedView
              darkColor={Colors.light.primary}
              style={styles.headerContainer}
            >
              <View style={styles.headerText}>
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
                  Juan Perez
                </ThemedText>
              </View>
              <Image
                source={require("@/assets/images/share-blue.png")}
                width={62}
                height={62}
                style={{ aspectRatio: 1 }}
              />
            </ThemedView>
            <Input
              type="search"
              placeholder="Busca un vídeo"
              value=""
              onChangeText={() => {}}
            />

            <View style={styles.popularVideos}>
              <ThemedText
                style={{ fontSize: 20, marginBottom: 16 }}
                darkColor={Colors.light.middleGray}
              >
                Vídeos Populares
              </ThemedText>

              <Trending posts={objs ?? []} />
            </View>
            <ThemedText type="default" style={{ fontSize: 20, marginTop: 20 }}>
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
            <Post post={item} />
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
