import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

import Rozdzielacz from "../../components/Rozdzielacz";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const { width } = Dimensions.get("window");

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = useCallback(async () => {
    if (!user) return;

    try {
      const cachedData = await AsyncStorage.getItem(`@posts_${user.id}`);
      if (cachedData) {
        setPosts(JSON.parse(cachedData));
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setPosts(data);
        await AsyncStorage.setItem(`@posts_${user.id}`, JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.postContainer}>
        {item.location && (
          <View style={styles.locationWrapper}>
            <ThemedText>{item.location}</ThemedText>
          </View>
        )}
        <View style={styles.imagesRow}>
          <Image source={{ uri: item.photo_back }} style={styles.image} />
          <Image source={{ uri: item.photo_front }} style={styles.image} />
        </View>
        <Rozdzielacz height={10} />
        <View style={styles.dateWrapper}>
          <ThemedText>
            {new Date(item.created_at).toLocaleDateString()}{" "}
            {new Date(item.created_at).toLocaleTimeString()}
          </ThemedText>
        </View>
      </View>
    ),
    [],
  );

  return (
    <ThemedView style={styles.container}>
      <Rozdzielacz height={50} />
      <ThemedText>Profil</ThemedText>
      <ThemedText>{user?.email}</ThemedText>

      <Rozdzielacz height={20} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <ThemedText>Brak zdjęć do wyświetlenia.</ThemedText>
        }
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={5}
      />

      <Rozdzielacz height={10} />
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    borderBottomWidth: 1,
  },
  listContainer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  postContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  locationWrapper: {
    alignSelf: "flex-start",
    marginLeft: width * 0.05,
    marginBottom: 5,
  },
  imagesRow: {
    flexDirection: "row",
    width: width * 0.9,
    justifyContent: "space-between",
  },
  image: {
    width: width * 0.43,
    height: 250,
    borderRadius: 15,
    resizeMode: "cover",
  },
  dateWrapper: {
    alignSelf: "flex-end",
    marginRight: width * 0.05,
  },
});
