import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/atoms/input";
import Post from "@/components/molecules/post";
import { Colors } from "@/constants/Colors";
import { objs } from "@/utils/mock";
import { useState } from "react";

export default function Profile() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: Colors.light.white }}>
      <View style={{ padding: 16 }}>
        <FlatList
          data={objs ?? []}
          keyExtractor={(item) => item.id.toString()}
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
                    uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  style={{ width: 100, height: 100, borderRadius: 20 }}
                />
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                  John Doe
                </Text>

                <View
                  style={{ display: "flex", flexDirection: "row", gap: 16 }}
                >
                  <View style={styles.col}>
                    <Text style={styles.textBold}>10</Text>
                    <Text>Publicaciones</Text>
                  </View>

                  <View style={styles.col}>
                    <Text style={styles.textBold}>1.2k</Text>
                    <Text>Vistas</Text>
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
              <Post post={item} />
            </View>
          )}
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
  },
});
