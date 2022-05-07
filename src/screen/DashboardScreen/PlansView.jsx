import { useNavigation } from "@react-navigation/native";
import {
  AspectRatio,
  Box,
  FlatList,
  Heading,
  Image,
  Pressable,
  Text,
} from "native-base";
import React from "react";

const data = [
  {
    id: 0,
    name: "Đà Lạt 30/4 - 4/5",
    count: 8,
    thumbnail:
      "https://i.picsum.photos/id/61/600/600.jpg?hmac=xO4nHk0Jyt6MeKsA3Ja7ZibPMoPSpMh6O9TsTyBbpC4",
  },
  {
    id: 1,
    name: "Đà Nẵng 1/6 - 6/6",
    count: 16,
  },
];

export default function PlansScreen() {
  return (
    <Box px={5} py={3}>
      <Heading mb={3}>Kế hoạch</Heading>
      <FlatList
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

function CardItem({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("PlanDetailScreen", {
          screen: "DetailView",
        })
      }
      mb={5}
    >
      <AspectRatio w="100%" ratio={22 / 9}>
        {item.thumbnail ? (
          <Image
            flex={1}
            rounded="xl"
            source={{
              uri: item.thumbnail,
            }}
            alt="image"
          />
        ) : (
          <Box rounded="xl" background="black"></Box>
        )}
      </AspectRatio>
      <Box
        h="full"
        w="full"
        rounded="xl"
        position="absolute"
        background="rgba(55, 253, 78 ,0.15)"
      ></Box>
      <Heading position="absolute" left={3} top={3} color="white">
        {item.name}
      </Heading>
      <Heading position="absolute" right={3} bottom={3} color="primary.1">
        {item.count}{" "}
        <Text color="white" fontSize="md">
          địa điểm
        </Text>
      </Heading>
    </Pressable>
  );
}
