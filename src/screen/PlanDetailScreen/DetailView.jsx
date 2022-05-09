import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Badge,
  Text,
  VStack,
  Pressable,
  FlatList,
  Actionsheet,
  useDisclose,
  Modal,
  FormControl,
  Input,
  Button,
  useToast,
  Center,
  Image,
  Select,
  Toast,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import PlanAPI from "../../api/plan";
import moment from "moment";
import LocationAPI from "../../api/location";

export default function DetailView() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { id, headerTitle } = params;
  const [item, setitem] = useState(null);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    });
    PlanAPI.getPlan(id).then((res) => {
      setitem(res);
    });
  }, [id]);

  return item && item.PlanLocation.length ? (
    <Box h="full" bg="white" px={5} safeArea>
      <FlatList
        data={item.PlanLocation}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => <ItemComponent item={item} />}
      />
    </Box>
  ) : (
    <Center px={10} flex={1}>
      <Box>
        <Image
          mb={5}
          resizeMode="contain"
          source={require("../../../assets/images/sad.png")}
          alt="No items"
        />
      </Box>
      <Heading textAlign="center" fontSize="md" color="trueGray.500">
        Hiện tại không có địa điểm nào trong kế hoạch
      </Heading>
    </Center>
  );
}

const ItemComponent = ({ item }) => {
  const [data, setdata] = useState(null);
  const toast = useToast();
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);
  async function fetch() {
    const res = await LocationAPI.getOneLocation(item.locationId);
    setdata(res);
    console.log(res);
  }
  useEffect(() => {
    fetch();
  }, []);

  if (!data) return <Text>Loading...</Text>;
  let color = "success";
  let text = "Bình thường";
  if (data.intendedPeople < 100) {
    color = "info";
    text = "Ít người";
  }
  if (data.intendedPeople > 1000) {
    color = "danger";
    text = "Quá tải";
  }

  return (
    <Pressable mb={3} onPress={onOpen}>
      <HStack background="trueGray.100" rounded="2xl">
        <ModalComponent
          showModal={showModal}
          setShowModal={setShowModal}
          item={item}
          data={data}
        />
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" fontWeight="bold" color="gray.500">
                {data.name}
              </Text>
            </Box>
            <Actionsheet.Item
              onPress={() =>
                navigation.navigate("LocationDetail", {
                  screen: "DetailView",
                  params: {
                    id: item.id,
                  },
                })
              }
            >
              Xem chi tiết
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                setShowModal(true);
                onClose();
              }}
            >
              Chỉnh sửa
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={() => {
                toast.show({
                  backgroundColor: "green.500",
                  title: "Xóa thành công",
                });
                onClose();
              }}
            >
              Xóa
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>

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
            {data.name}
          </Heading>
          <HStack space={2}>
            <Badge _text={{ fontSize: "2xs" }} colorScheme="indigo">
              {item.numberOfPeople + " người"}
            </Badge>
            <Badge _text={{ fontSize: "2xs" }} colorScheme={color}>
              {text}
            </Badge>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

function ModalComponent({ showModal, setShowModal, item, data }) {
  const [numberOfPeople, setnumberOfPeople] = useState(item.numberOfPeople);
  const [date, setDate] = useState(new Date(item.date));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function editLocationInPlan() {
    PlanAPI.editLocationInPlan({
      id: item.id,
      numberOfPeople,
      date: date,
    })
      .then(() => {
        Toast.show({
          title: "Sửa thành công",
        });
      })
      .catch(() => {
        Toast.show({
          title: "Sửa thất bại",
        });
      })
      .finally(() => {
        setShowModal(false);
      });
  }

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{data.name}</Modal.Header>
        <Modal.Body>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
          <FormControl>
            <FormControl.Label>Ngày đến</FormControl.Label>
            <Text
              onPress={showDatepicker}
              color="primary.1"
              fontWeight="bold"
              fontSize="3xl"
            >
              {moment(date).format("DD/MM/YYYY")}
            </Text>
          </FormControl>
          <FormControl>
            <FormControl.Label>Giờ đến</FormControl.Label>
            <Text
              onPress={showTimepicker}
              color="primary.1"
              fontWeight="bold"
              fontSize="3xl"
            >
              {moment(date).format("hh:mm")}
            </Text>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Số lượng</FormControl.Label>
            <Input
              value={numberOfPeople}
              onChangeText={(text) => setnumberOfPeople(text)}
              keyboardType="numeric"
              defaultValue="1"
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
              Cancel
            </Button>
            <Button onPress={editLocationInPlan}>Edit</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
