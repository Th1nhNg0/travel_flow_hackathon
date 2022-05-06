import React from "react";
import {
  AspectRatio,
  Box,
  Center,
  FlatList,
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
import data from "../../mock.json";

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

      <FlatList
        px={5}
        mt={5}
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        initialNumToRender={10}
        keyExtractor={(item) => item.id}
        windowSize={3}
      />
    </Box>
  );
}

const CardItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      mb={5}
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
            {item.name}
          </Heading>
          <RatingComponent
            rating={item.review.score}
            count={item.review.count}
          />
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
