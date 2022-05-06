import React from "react";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@native-base/icons";
import { useNavigation } from "@react-navigation/native";
import RatingComponent from "../../components/RatingComponent";

const data = [
  {
    id: 0,
    title: "Du Thuyền Sài Gòn Với Bữa Tối Trên Tàu Saigon Princess",
    count: Math.floor(Math.random() * 500),
    thumbnail:
      "https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/fubnzq6m8wq5qtrrkcc5.webp",
  },
  {
    id: 1,
    title: "Vé Đài Quan Sát Landmark 81 Skyview",
    count: Math.floor(Math.random() * 500),
    thumbnail:
      "https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/su1k3yrudfqoo5kmyfiz.webp",
  },
  {
    id: 2,
    title: "Vé Teh Dar Show Tại Nhà Hát TP. Hồ Chí Minh",
    count: Math.floor(Math.random() * 500),
    thumbnail:
      "https://res.klook.com/image/upload/c_fill,w_960,h_460,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/gnr4rwvtfhxtcqrmqg95.webp",
  },
];

export default function ExploreScreen() {
  return (
    <Box backgroundColor="white" height="full">
      <VStack px={5} w="100%" space={5} alignSelf="center">
        <Input
          rounded="3xl"
          placeholder="Search People  Places"
          width="100%"
          p="1"
          fontSize="14"
          backgroundColor="gray.100"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              name="search1"
              as={<AntDesign />}
            />
          }
        />
      </VStack>

      <ScrollView px={5} mt={5}>
        <VStack space={5} pb={10}>
          {data.map((item, id) => (
            <CardItem key={id} item={item} />
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}

const CardItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("LocationDetail", {
          screen: "DetailView",
          params: {
            id: item.id,
          },
        })
      }
    >
      <Box
        rounded="xl"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              rounded="xl"
              source={{
                uri: item.thumbnail,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg={item.count > 300 ? "red.400" : "green.400"}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            top="0"
            px="3"
            py="1.5"
          >
            {item.count > 300 ? "HOT" : "Bình thường"}
          </Center>
        </Box>
        <Stack p="4">
          <Heading size="md" ml="-1" isTruncated noOfLines={2}>
            {item.title}
          </Heading>
          <RatingComponent />
          <Text fontWeight="400">
            <Text fontWeight="bold" color="primary.1">
              {item.count}
            </Text>{" "}
            người sẽ đến
          </Text>
        </Stack>
      </Box>
    </Pressable>
  );
};
