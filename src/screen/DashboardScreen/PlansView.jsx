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
  Toast,
  Center,
} from "native-base";
import { useState, useEffect } from "react";
import { AntDesign } from "@native-base/icons";
import PlanAPI from "../../api/plan";

export default function PlansScreen() {
  const [showModal, setShowModal] = useState(false);
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  function fetchData() {
    setloading(true);
    PlanAPI.getPlans()
      .then((res) => {
        setdata(res.plans);
      })
      .finally(() => setloading(false));
  }
  useEffect(() => {
    fetchData();
  }, []);

  const [newPlanName, setnewPlanName] = useState("");

  function createNewPlan() {
    PlanAPI.createPlan({ name: newPlanName }).then(() => {
      setShowModal(false);
      setnewPlanName("");
      fetchData();
      Toast.show({
        title: "Tạo kế hoạch thành công",
      });
    });
  }
  if (loading) {
    return (
      <Center flex={1}>
        <Text>Loading...</Text>
      </Center>
    );
  }
  return (
    <Box px={5} py={3}>
      <Modal size="xl" isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Tạo kế hoạch mới</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Tên kế hoạch</FormControl.Label>
              <Input
                value={newPlanName}
                onChangeText={(text) => setnewPlanName(text)}
              />
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
              <Button onPress={createNewPlan}>Tạo</Button>
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
        renderItem={({ item }) => (
          <CardItem item={item} fetchData={fetchData} />
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}

function CardItem({ item, fetchData }) {
  const navigation = useNavigation();
  const [newName, setnewName] = useState(item.name);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  function updatePlan() {
    setisLoading(true);
    PlanAPI.updatePlan({ id: item.id, name: newName })
      .then(() => {
        setShowModal(false);
        fetchData();
        Toast.show({
          title: "Cập nhật thành công",
        });
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  function deletePlan() {
    setisLoading(true);
    PlanAPI.deletePlan(item.id)
      .then(() => {
        setShowModal(false);
        Toast.show({
          title: "Xóa kế hoạch thành công",
        });
        fetchData();
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("PlanDetailScreen", {
          screen: "DetailView",
          params: {
            id: item.id,
            headerTitle: item.name,
          },
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
              <Input
                value={newName}
                onChangeText={(text) => setnewName(text)}
              />
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
                isLoading={isLoading}
                colorScheme="danger"
                onPress={deletePlan}
              >
                Xóa
              </Button>
              <Button
                isLoading={isLoading}
                backgroundColor="primary.2"
                onPress={updatePlan}
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
        background="rgba(0, 0, 0 ,0.25)"
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
        {item._count.PlanLocation}{" "}
        <Text color="white" fontSize="md">
          địa điểm
        </Text>
      </Heading>
    </Pressable>
  );
}
