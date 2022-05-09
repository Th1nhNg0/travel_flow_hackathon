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
  Center,
  Modal,
  Input,
  FormControl,
  Select,
  Toast,
} from "native-base";
import { AntDesign } from "@native-base/icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import RatingComponent from "../../components/RatingComponent";
import Swiper from "react-native-swiper";
import MapView, { Marker } from "react-native-maps";
import LocationAPI from "../../api/location";
import PlanAPI from "../../api/plan";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DetailView() {
  const { params } = useRoute();
  const { id } = params;
  const [item, setitem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    LocationAPI.getOneLocation(id).then((res) => {
      setitem(res);
    });
  }, []);
  if (!item)
    return (
      <Center flex={1}>
        <Text>Loading...</Text>
      </Center>
    );
  return (
    <Box h="full" bg="white" p={5} safeArea>
      <ThumbnailComponent item={item} />
      <ScrollView mt={5} stickyHeaderIndices={[0]}>
        <Box pb={1} background="white">
          <Heading size="md">{item.name}</Heading>
        </Box>
        <Stack space={5}>
          <InfoComponent item={item} />
          <AboutComponent />
          <MapComponent item={item} />
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
        <ModalComponent
          item={item}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Button
          onPress={() => setShowModal(true)}
          flex={1}
          ml={2}
          backgroundColor="primary.1"
          rounded="xl"
        >
          Thêm vào kế hoạch
        </Button>
      </Flex>
    </Box>
  );
}

function ModalComponent({ showModal, setShowModal, item }) {
  const [plans, setplans] = useState([]);
  useEffect(() => {
    PlanAPI.getPlans().then((res) => {
      setplans(res.plans);
    });
  }, []);

  const [planId, setplanId] = useState(null);
  const [numberOfPeople, setnumberOfPeople] = useState(1);
  const [date, setDate] = useState(new Date());
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

  function addLocationToPlan() {
    PlanAPI.addLocationToPlan({
      date: date,
      locationId: item.id,
      numberOfPeople: 1,
      planId: plans[0].id,
    })
      .then(() => {
        Toast.show({
          title: "Thêm địa điểm thành công",
        });
      })
      .catch(() => {
        Toast.show({
          background: "red.100",
          title: "Đã xảy ra lỗi",
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
        <Modal.Header>Thêm địa điểm vào kế hoạch</Modal.Header>
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
          <FormControl>
            <FormControl.Label>Kế hoạch</FormControl.Label>
            <Select
              accessibilityLabel="Chọn kế hoạch"
              selectedValue={planId}
              onValueChange={(value) => setplanId(value)}
              placeholder="Chọn kế hoạch"
            >
              {plans.length > 0 ? (
                plans.map((p) => (
                  <Select.Item label={p.name} value={p.id} key={p.id} />
                ))
              ) : (
                <Select.Item
                  label="Bạn không có kế hoạch nào, vui lòng tạo kế hoạch trước khi thêm địa điểm"
                  disabled
                  value="-1"
                />
              )}
            </Select>
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
            <Button onPress={addLocationToPlan}>Add</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function MapComponent({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("LocationMapView", {
          latitude: item.latitude,
          longitude: item.longitude,
          name: item.name,
          address: item.address,
        })
      }
    >
      <Heading size="sm" mb={2}>
        Địa chỉ
      </Heading>
      <AspectRatio w="100%" ratio={16 / 9}>
        <MapView
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          cacheEnabled={true}
          initialRegion={{
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.01639111111,
          }}
        >
          <Marker
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
          />
        </MapView>
      </AspectRatio>
    </Pressable>
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
      <Heading size="sm">Giới thiệu</Heading>
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

function InfoComponent({ item }) {
  return (
    <VStack space={5}>
      <Box>
        <RatingComponent rating={item.review} count={item._count.Review} />
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
              {item.intendedPeople}
            </Heading>
            <Text textAlign="center" color="blueGray.500">
              số người dự định đến
            </Text>
          </Box>
          <Box>
            <Heading textAlign="center" size="xl" color="primary.1">
              {item.highIntendedPeople}
            </Heading>
            <Text textAlign="center" color="blueGray.500">
              số người ít nhất sẽ đến
            </Text>
          </Box>
        </HStack>
        <Button rounded="xl" size="md" background="primary.2">
          Xem chi tiết
        </Button>
      </VStack>
    </VStack>
  );
}

function ThumbnailComponent({ item }) {
  const navigation = useNavigation();
  const image_urls = item.LocationImages.map((e) => e.image_url);
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
            {image_urls.map((image, index) => (
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
