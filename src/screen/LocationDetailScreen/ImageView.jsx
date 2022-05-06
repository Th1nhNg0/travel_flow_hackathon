import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Icon, IconButton, Image } from "native-base";
import Swiper from "react-native-swiper";
import { AntDesign } from "@native-base/icons";

export default function ImageView() {
  const route = useRoute();
  const navigation = useNavigation();
  const image_urls = route?.params?.image_urls;
  return (
    <Box background="black" safeArea h="full" w="full">
      <IconButton
        onPress={() => navigation.goBack()}
        position="absolute"
        top={5}
        left={5}
        icon={<Icon size="2xl" color="white" as={AntDesign} name="close" />}
      />
      {image_urls && (
        <Swiper dotColor="gray">
          {image_urls?.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              flex={1}
              resizeMode="contain"
              alt="image"
            />
          ))}
        </Swiper>
      )}
    </Box>
  );
}
