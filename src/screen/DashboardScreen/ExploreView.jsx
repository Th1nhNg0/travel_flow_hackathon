import React, { useState, useEffect } from "react";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  Icon,
  Image,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@native-base/icons";
import { useNavigation } from "@react-navigation/native";
import RatingComponent from "../../components/RatingComponent";
import useDebounce from "../../components/useDebounce";
import LocationAPI from "../../api/location";

export default function ExploreScreen() {
  const [search, setsearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const flatListRef = React.useRef();
  const navigation = useNavigation();

  useEffect(() => {
    setisLoading(true);
    LocationAPI.getLocations({ page, search: search }).then((res) => {
      setdata((old) => [...old, ...res.locations]);
      setisLoading(false);
    });
  }, [page, debouncedSearch]);
  useEffect(() => {
    flatListRef.current.scrollToOffset({ x: 0, y: 0, animated: true });
    setpage(1);
    setdata([]);
  }, [debouncedSearch]);
  useEffect(() => {
    setsearch("");
  }, [navigation]);

  function loadMore() {
    setpage(page + 1);
  }

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
          onChangeText={(text) => setsearch(text)}
          value={search}
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
        ref={flatListRef}
        px={5}
        mt={5}
        data={data}
        renderItem={({ item }) => <CardItem item={item} />}
        initialNumToRender={10}
        ListFooterComponent={
          <Button
            mb={5}
            onPress={loadMore}
            backgroundColor="primary.1"
            isLoading={isLoading}
          >
            Load more
          </Button>
        }
      />
    </Box>
  );
}

const CardItem = ({ item }) => {
  const navigation = useNavigation();
  let color = "green.500";
  let text = "Bình thường";
  if (item.intendedPeople < 100) {
    color = "blue.500";
    text = "Ít người";
  }
  if (item.intendedPeople > 1000) {
    color = "red.500";
    text = "Quá tải";
  }
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
            bg={color}
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
            {text}
          </Center>
        </Box>
        <Stack p="4">
          <Heading size="md" ml="-1" isTruncated noOfLines={2}>
            {item.name}
          </Heading>
          <RatingComponent rating={item.review} count={item._count.Review} />
          <Text fontWeight="400">
            <Text fontWeight="bold" color="primary.1">
              {item.intendedPeople}
            </Text>{" "}
            người sẽ đến
          </Text>
        </Stack>
      </Box>
    </Pressable>
  );
};
