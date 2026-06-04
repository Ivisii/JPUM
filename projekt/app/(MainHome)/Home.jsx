import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useContext, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";

import Rozdzielacz from "../../components/Rozdzielacz";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";

const { width } = Dimensions.get("window");

const Home = () => {
  const { user } = useContext(AuthContext);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();
  const [facing, setFacing] = useState("back");
  const [photoBack, setPhotoBack] = useState(null);
  const [photoFront, setPhotoFront] = useState(null);
  const [location, setLocation] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const cameraRef = useRef(null);

  const handleStartCamera = async () => {
    let camPerm = cameraPermission;
    if (!camPerm || !camPerm.granted) {
      camPerm = await requestCameraPermission();
    }

    let locPerm = locationPermission;
    if (!locPerm || !locPerm.granted) {
      locPerm = await requestLocationPermission();
    }

    if (camPerm?.granted && locPerm?.granted) {
      setIsCameraActive(true);
    } else {
      Alert.alert(
        "Aby kontynuować, aplikacja wymaga dostępu do aparatu i lokalizacji.",
      );
    }
  };

  const takePhotos = async () => {
    if (!cameraRef.current) return;
    setIsCapturing(true);

    try {
      const backPic = await cameraRef.current.takePictureAsync({
        quality: 0.5,
      });
      setPhotoBack(backPic.uri);

      setFacing("front");

      setTimeout(async () => {
        if (cameraRef.current) {
          const frontPic = await cameraRef.current.takePictureAsync({
            quality: 0.5,
          });
          setPhotoFront(frontPic.uri);

          const loc = await Location.getCurrentPositionAsync({});

          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });

          if (reverseGeocode.length > 0) {
            const address = reverseGeocode[0];
            const cityName =
              address.city ||
              address.subregion ||
              address.district ||
              "Nieznana miejscowość";
            setLocation(cityName);
          } else {
            setLocation(
              `Szer: ${loc.coords.latitude.toFixed(4)}, Dł: ${loc.coords.longitude.toFixed(4)}`,
            );
          }
        }
        setIsCapturing(false);
        setFacing("back");
      }, 1000);
    } catch (error) {
      Alert.alert("Błąd", "Nie udało się zrobić zdjęcia");
      console.log(error);
      setIsCapturing(false);
      setFacing("back");
    }
  };

  const resetPhotos = () => {
    setPhotoBack(null);
    setPhotoFront(null);
    setLocation(null);
  };

  const handlePublish = async () => {
    if (!user) {
      Alert.alert("Zaloguj się, aby opublikować");
      return;
    }

    setIsPublishing(true);

    const { error } = await supabase.from("posts").insert([
      {
        user_id: user.id,
        photo_front: photoFront,
        photo_back: photoBack,
        location: location,
      },
    ]);

    setIsPublishing(false);

    if (error) {
      console.log("BŁĄD SUPABASE:", error);
      Alert.alert("Błąd bazy", error.message || "Sprawdź konsolę");
    } else {
      Alert.alert("Sukces", "Zdjęcia zostały opublikowane!");
      resetPhotos();
      setIsCameraActive(false);
    }
  };

  if (photoBack && photoFront) {
    return (
      <ThemedView style={[styles.container, { alignItems: "center" }]}>
        <ThemedText>Twoje zdjęcia</ThemedText>
        {location && <ThemedText>{location}</ThemedText>}

        <Rozdzielacz height={20} />

        <View style={styles.sliderContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <Image source={{ uri: photoBack }} style={styles.image} />
            <Image source={{ uri: photoFront }} style={styles.image} />
          </ScrollView>
        </View>

        <Rozdzielacz height={30} />

        <ThemedButton onPress={resetPhotos} disabled={isPublishing}>
          <Text style={{ color: "white" }}>Zrób nowe</Text>
        </ThemedButton>

        <Rozdzielacz height={15} />

        <ThemedButton onPress={handlePublish} disabled={isPublishing}>
          <Text style={{ color: "white" }}>
            {isPublishing ? "Publikowanie..." : "Opublikuj"}
          </Text>
        </ThemedButton>

        <Rozdzielacz height={30} />
      </ThemedView>
    );
  }

  if (isCameraActive) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
        <View style={styles.cameraOverlay}>
          <ThemedButton onPress={takePhotos} disabled={isCapturing}>
            <ThemedText>
              {isCapturing ? "Robienie..." : "Zrób zdjęcia"}
            </ThemedText>
          </ThemedButton>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { alignItems: "center" }]}>
      <ThemedText>Czas na zdjęcia!</ThemedText>
      <Rozdzielacz height={30} />
      <ThemedButton onPress={handleStartCamera}>
        <ThemedText>Zrób zdjęcia</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  link: {
    borderBottomWidth: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  sliderContainer: {
    height: 450,
    width: width * 0.85,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: width * 0.85,
    height: 450,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
  },
});
