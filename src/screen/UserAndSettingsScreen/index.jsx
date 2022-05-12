import { useContext } from "react";
import {
  Box,
  VStack,
  Divider,
  Avatar,
  ScrollView,
  HStack,
  Heading,
  IconButton,
  Icon,
  Text,
  Toast,
} from "native-base";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign, Feather } from "@native-base/icons";

export default function UserAndSettingsScreen() {
  const { user, logout } = useContext(AuthContext);
  function FeatureNotReady() {
    Toast.show({
      title: "Feature not ready",
    });
  }
  return (
    <ScrollView>
      <VStack space={3} p={5}>
        <HStack space={3}>
          <Avatar
            bg="green.500"
            size="md"
            rounded="xl"
            _image={{
              rounded: "xl",
            }}
            source={{
              uri: `https://avatars.dicebear.com/api/micah/${user.email}.png`,
            }}
          >
            AJ
          </Avatar>
          <Box>
            <Heading fontSize="md">{user.name}</Heading>
            <Text color="trueGray.500">
              Điểm uy tín: {user.reputationPoint}
            </Text>
          </Box>
        </HStack>
        <Divider />
        <VStack space={5}>
          <HStack alignItems="center" space={5}>
            <IconButton
              onPress={FeatureNotReady}
              variant="solid"
              colorScheme="trueGray"
              icon={<Icon as={Feather} name="map-pin" />}
            />
            <Text onPress={FeatureNotReady} fontSize="md">
              Địa điểm đã đến
            </Text>
          </HStack>
          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
              onPress={FeatureNotReady}
              colorScheme="trueGray"
              icon={<Icon as={AntDesign} name="heart" />}
            />
            <Text onPress={FeatureNotReady} fontSize="md">
              Địa điểm yêu thích
            </Text>
          </HStack>
          <HStack alignItems="center" space={5}>
            <IconButton
              onPress={FeatureNotReady}
              variant="solid"
              colorScheme="trueGray"
              icon={<Icon as={Feather} name="message-square" />}
            />
            <Text onPress={FeatureNotReady} fontSize="md">
              Đánh giá
            </Text>
          </HStack>

          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
              onPress={FeatureNotReady}
              colorScheme="trueGray"
              icon={<Icon as={AntDesign} name="setting" />}
            />
            <Text onPress={FeatureNotReady} fontSize="md">
              Cài đặt
            </Text>
          </HStack>
          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
              onPress={() => logout()}
              colorScheme="trueGray"
              icon={<Icon as={AntDesign} name="logout" />}
            />
            <Text onPress={() => logout()} fontSize="md">
              Đăng xuất
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
