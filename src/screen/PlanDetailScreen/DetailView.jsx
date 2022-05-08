import { useEffect, useState } from "react";
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
  Actionsheet,
  useDisclose,
  Modal,
  FormControl,
  Input,
  Button,
  useToast,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";

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
  const toast = useToast();
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));
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
  return (
    <Pressable mb={3} onPress={onOpen}>
      <HStack background="trueGray.100" rounded="2xl">
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{item.name}</Modal.Header>
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
                <Text fontSize="3xl" onPress={showDatepicker}>
                  {moment(date).format("DD/MM/YYYY")}
                </Text>
              </FormControl>
              <FormControl>
                <FormControl.Label>Giờ đến</FormControl.Label>
                <Text fontSize="3xl" onPress={showTimepicker}>
                  {moment(date).format("hh:mm")}
                </Text>
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Số lượng</FormControl.Label>
                <Input keyboardType="numeric" defaultValue="1" />
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
                <Button
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize="16" fontWeight="bold" color="gray.500">
                {item.name}
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
