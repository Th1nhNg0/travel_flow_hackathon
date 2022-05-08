import { useNavigation } from "@react-navigation/native";
import {
  AspectRatio,
  Box,
  FlatList,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
  Modal,
  FormControl,
  Input,
  Button,
  useDisclose,
  Actionsheet,
} from "native-base";
import { useState } from "react";
import { AntDesign } from "@native-base/icons";

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
  const [showModal, setShowModal] = useState(false);
  return (
    <Box px={5} py={3}>
      <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Tạo kế hoạch mới</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Tên kế hoạch</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Hủy
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Tạo
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack justifyContent="space-between" alignItems="center" mb={5}>
        <Heading>Kế hoạch</Heading>
        <IconButton
          onPress={() => setShowModal(true)}
          variant="solid"
          background="primary.1"
          size="md"
          icon={<Icon as={AntDesign} name="plus" />}
        />
      </HStack>
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
  const [showModal, setShowModal] = useState(false);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("PlanDetailScreen", {
          screen: "DetailView",
        })
      }
      mb={5}
    >
      <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Chỉnh sửa kế hoạch</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Tên kế hoạch</FormControl.Label>
              <Input defaultValue={item.name} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Hủy
              </Button>
              <Button
                colorScheme="danger"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Xóa
              </Button>
              <Button
                backgroundColor="primary.2"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Chỉnh sửa
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
      <Box position="absolute" left={3} bottom={3}>
        <IconButton
          onPress={() => setShowModal(true)}
          variant="solid"
          colorScheme="info"
          size="sm"
          icon={<Icon as={AntDesign} name="edit" />}
        />
      </Box>
      <Heading position="absolute" right={3} bottom={3} color="primary.1">
        {item.count}{" "}
        <Text color="white" fontSize="md">
          địa điểm
        </Text>
      </Heading>
    </Pressable>
  );
}
