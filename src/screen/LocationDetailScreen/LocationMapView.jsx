import { Box, Center, Icon, IconButton } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@native-base/icons";
import { Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LocationMapView() {
  const navigation = useNavigation();
  const route = useRoute();
  const { latitude, longitude, address, name } = route.params;
  return (
    <Box safeArea>
      <Box>
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          region={{
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title={name}
            description={address}
          />
        </MapView>
        <IconButton
          onPress={() => navigation.goBack()}
          top={5}
          left={5}
          position="absolute"
          variant="solid"
          background="primary.1"
          icon={<Icon size="lg" as={AntDesign} name="close" />}
        />
      </Box>
    </Box>
  );
}
