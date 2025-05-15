import { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Input from "@/components/atoms/input";
import { ThemedText } from "@/components/ThemedText";
import Post from "@/components/molecules/post";
import { Colors } from "@/constants/Colors";
import { objs } from "@/utils/mock";

export default function Saved() {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={{ padding: 16, backgroundColor: Colors.light.white }}>
      <FlatList
        style={{ marginTop: 32 }}
        data={objs}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View>
            <ThemedText type="title" darkColor={Colors.light.black}>
              Vídeos guardados
            </ThemedText>

            <View style={{ marginTop: 16 }}>
              <Input
                type="search"
                placeholder="Busca tus vídeos guardados"
                value={search}
                onChangeText={(value) => setSearch(value)}
              />
            </View>
          </View>
        )}
        renderItem={({ item }) => <Post post={item} />}
      />
    </SafeAreaView>
  );
}
