import { FlatList } from "react-native";
import TrendingItem from "../atoms/trending-item";
import { useState } from "react";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function Trending({ posts }) {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].id);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        posts.length === 0 ? (
          <ThemedView>
            <ThemedText>
              No hay videos populares. Comienza a subir tus videos.
            </ThemedText>
          </ThemedView>
        ) : (
          <TrendingItem item={item} activeItem={activeItem} />
        )
      }
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      style={{ width: "100%" }}
    />
  );
}
