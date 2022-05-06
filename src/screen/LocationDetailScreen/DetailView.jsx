import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import { AntDesign } from "@native-base/icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import RatingComponent from "../../components/RatingComponent";
import Swiper from "react-native-swiper";
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
export default function DetailView() {
  const { params } = useRoute();
  const { id } = params;
  const [item, setitem] = useState({});
  useEffect(() => {
    let item = data.find((item) => item.id === id);
    if (item) {
      setitem(item);
    }
  }, []);

  return (
    <Box h="full" bg="white" p={5} safeArea>
      <ThumbnailComponent thumbnail={item.thumbnail} />
      <ScrollView mt={5} stickyHeaderIndices={[0]}>
        <Box pb={1} background="white">
          <Heading size="md">{item.title}</Heading>
        </Box>
        <Stack space={5}>
          <VisitorInfoComponent />
          <AboutComponent />
        </Stack>
        <Box h="10"></Box>
      </ScrollView>
      <Flex
        direction="row"
        background="white"
        position="absolute"
        bottom={0}
        py={2}
        left={5}
      >
        <Button flex={1} mr={2} backgroundColor="primary.2" rounded="xl">
          Tôi dự định đến đây
        </Button>
        <Button flex={1} ml={2} backgroundColor="primary.1" rounded="xl">
          Thêm vào kế hoạch
        </Button>
      </Flex>
    </Box>
  );
}

function AboutComponent() {
  const MAX_TEXT_LENGTH = 300;
  const text =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. InLorem ipsum dolor sit, amet consectetur adipisicing elit. In In ipsa repudiandae ipsam nihil ullam soluta, rem autem accusamus quod voluptatem quibusdam vero consequuntur ratione cum! Quia sequi similique unde nemo.";
  const [viewMore, setviewMore] = useState(text.length < MAX_TEXT_LENGTH);
  function getText() {
    if (viewMore) {
      return text;
    }
    return text.substring(0, MAX_TEXT_LENGTH);
  }
  return (
    <Box>
      <Heading size="sm">About</Heading>
      <Text zIndex={0}>{getText()}</Text>
      {!viewMore && (
        <Box position="absolute" w="full" bottom={0}>
          <LinearGradient colors={["transparent", "white"]}>
            <Pressable
              h="24"
              justifyContent="flex-end"
              onPress={() => setviewMore(true)}
            >
              <Text textAlign="center" color="primary.1" fontWeight="bold">
                View more
              </Text>
            </Pressable>
          </LinearGradient>
        </Box>
      )}
    </Box>
  );
}

function VisitorInfoComponent() {
  return (
    <VStack space={5}>
      <Box>
        <RatingComponent />
        <Text>
          Sức chứa tối đa:{" "}
          <Text fontWeight="bold" fontSize="md" color="primary.2">
            {Math.floor(Math.random() * 500) * 100}
          </Text>{" "}
          người.
        </Text>
      </Box>
      <VStack space={3}>
        <Heading size="sm">Vào ngày {moment().format("L")}:</Heading>
        <HStack space={5} alignItems="center" justifyContent="center">
          <Box>
            <Heading textAlign="center" size="xl" color="primary.2">
              {Math.floor(Math.random() * 50000)}
            </Heading>
            <Text textAlign="center" color="blueGray.500">
              số người dự định đến
            </Text>
          </Box>
          <Box>
            <Heading textAlign="center" size="xl" color="primary.1">
              {Math.floor(Math.random() * 50000)}
            </Heading>
            <Text textAlign="center" color="blueGray.500">
              số người ít nhất sẽ đến
            </Text>
          </Box>
        </HStack>
        <Button rounded="xl" size="md">
          Xem chi tiết
        </Button>
      </VStack>
    </VStack>
  );
}

function ThumbnailComponent({ thumbnail }) {
  const navigation = useNavigation();
  const image_urls = [
    thumbnail,
    "http://unsplash.it/1000?gravity=center",
    "http://unsplash.it/1005?gravity=center",
  ];
  return (
    <Box>
      <Pressable
        onPress={() =>
          navigation.navigate("ImageView", {
            image_urls,
          })
        }
      >
        <AspectRatio w="100%" ratio={16 / 9}>
          <Swiper
            loadMinimal={true}
            showsPagination={false}
            autoplay={true}
            autoplayTimeout={2.5}
          >
            {image_urls?.map((image, index) => (
              <Image
                rounded="3xl"
                key={index}
                source={{ uri: image }}
                flex={1}
                alt="image"
              />
            ))}
          </Swiper>
        </AspectRatio>
      </Pressable>

      <IconButton
        onPress={() => navigation.goBack()}
        position="absolute"
        variant="solid"
        backgroundColor="primary.1"
        rounded="full"
        m={3}
        icon={<Icon as={AntDesign} name="arrowleft" />}
      />
      <HStack space={3} position="absolute" right="0" m={3}>
        <IconButton
          variant="solid"
          rounded="full"
          backgroundColor="primary.1"
          icon={<Icon as={AntDesign} name="sharealt" />}
        />
        <IconButton
          variant="solid"
          rounded="full"
          backgroundColor="primary.1"
          icon={<Icon as={AntDesign} name="heart" />}
        />
      </HStack>
    </Box>
  );
}
