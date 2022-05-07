import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Badge,
  Text,
  VStack,
  Pressable,
  FlatList,
} from "native-base";
import moment from "moment";
import mockdata from "../../mock.json";

export default function DetailView() {
  const navigation = useNavigation();
  const data = mockdata
    .sort((a, b) => Math.random() - 0.5)
    .slice(0, 10)
    .map((e) => ({
      ...e,
      date: new Date(
        new Date().getTime() + Math.random() * (1000 * 60 * 60 * 24 * 10)
      ),
    }))
    .sort((a, b) => a.date - b.date);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Đà Lạt 30/4 - 4/5",
    });
  }, []);

  return (
    <Box h="full" bg="white" px={5} safeArea>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemComponent item={item} />}
      />
    </Box>
  );
}

const ItemComponent = ({ item }) => {
  let color = "success";
  let text = "Bình thường";
  if (item.count < 1000) {
    color = "info";
    text = "Ít người";
  }
  if (item.count > 5000) {
    color = "danger";
    text = "Quá tải";
  }
  const navigation = useNavigation();
  return (
    <Pressable
      mb={3}
      onPress={() =>
        navigation.navigate("LocationDetail", {
          screen: "DetailView",
          params: {
            id: item.id,
          },
        })
      }
    >
      <HStack background="trueGray.100" rounded="2xl">
        <Box background="trueGray.200" py={3} px={2} rounded="2xl">
          <Text
            fontSize="lg"
            color="primary.1"
            fontWeight="bold"
            textAlign="center"
          >
            {moment(item.date).format("hh:mm")}
          </Text>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="blueGray.500"
            textAlign="center"
          >
            {moment(item.date).format("DD/MM/YYYY")}
          </Text>
        </Box>
        <VStack justifyContent="space-between" flex={1} py={2} pl={2} pr={3}>
          <Heading
            fontSize="md"
            textAlign="justify"
            fontWeight="semibold"
            isTruncated
            noOfLines={2}
          >
            {item.name}
          </Heading>
          <HStack>
            <Badge _text={{ fontSize: "2xs" }} colorScheme={color}>
              {text}
            </Badge>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};
