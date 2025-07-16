import { use, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/atoms/input";
import Post from "@/components/molecules/post";
import { Colors } from "@/constants/Colors";
import { objs } from "@/utils/mock";
import { ThemedText } from "@/components/ThemedText";
import { useAppwriteData } from "@/hooks/useAppwriteData";
import { getCurrentUser, getUserPosts } from "@/services/appwrite";
import NoVideosMessage from "@/components/atoms/no-videos-msg";

export default function Profile() {
  const [search, setSearch] = useState("");
  //const user = use(getCurrentUser());
  const { data: userPosts, isLoading } = useAppwriteData(
    getUserPosts(user?.id)
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ backgroundColor: Colors.light.white, height: "100%" }}
      >
        <View style={{ padding: 16 }}>
          <ThemedText type="title" darkColor={Colors.light.black}>
            Cargando...
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: Colors.light.white, height: "100%" }}
    >
      <View style={{ padding: 16 }}>
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item?.id}
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  padding: 50,
                  gap: 16,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: user?.avatar,
                  }}
                  style={{ width: 100, height: 100, borderRadius: 20 }}
                />
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  {user?.fullname}
                </Text>

                <View
                  style={{ display: "flex", flexDirection: "row", gap: 16 }}
                >
                  <View style={styles.col}>
                    <Text style={styles.textBold}>{userPosts?.length}</Text>
                    <ThemedText style={{ color: Colors.light.middleGray }}>
                      Publicaciones
                    </ThemedText>
                  </View>

                  <View style={styles.col}>
                    <Text style={styles.textBold}>{objs.length}</Text>
                    <ThemedText style={{ color: Colors.light.middleGray }}>
                      Vistas
                    </ThemedText>
                  </View>
                </View>
              </View>

              <Input
                type="search"
                placeholder="Busca un vídeo"
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
            </>
          )}
          renderItem={({ item }) => (
            <View style={{ marginTop: 32 }}>
              <Post key={item.id} post={item} />
            </View>
          )}
          ListEmptyComponent={() => <NoVideosMessage />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  col: {
    display: "flex",
    flexDirection: "column",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.light.black,
  },
});
