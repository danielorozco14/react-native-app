import * as React from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function App() {
  //Marker states
  const [marker, setMarker] = React.useState({
    latitude: 13.6918401,
    longitude: -89.2900995,
  });

  const [region, setRegion] = React.useState({
    latitude: 13.6918401,
    longitude: -89.2900995,
  });

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.6918401,
          longitude: -89.2900995,
          latitudeDelta: 0.0922, //Zoom del mapa vertical
          longitudeDelta: 0.0421, //Zoom del mapa horizontal
        }}
      >
        <Marker
          coordinate={marker}
          draggable={true}
          onDragStart={(e) => {
            console.log("onDrag", e.nativeEvent.coordinate);
          }}
          onDragEnd={(e) => {
            setMarker({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>Estoy Aquí</Text>
          </Callout>
        </Marker>
        <Circle center={marker} radius={500}></Circle>
      </MapView>

      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyAnvm1p4yGJgkpo9FB_NaNjIiFm2en6QQ4", //Own API Key
          language: "en",
          components: "country: sv",
          types: "address",
          radius: "1000",
          location: `${region.latitude}, ${region.longitude}`,
        }}
        styles={{
          container: {
            flex: 1,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
