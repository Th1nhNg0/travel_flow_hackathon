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
} from "native-base";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign } from "@native-base/icons";

export default function UserAndSettingsScreen() {
  const { user, logout } = useContext(AuthContext);
  return (
    <ScrollView>
      <VStack space={5} p={5}>
        <HStack space={3} mt={2}>
          <Avatar
            bg="green.500"
            size="md"
            rounded="xl"
            _image={{
              rounded: "xl",
            }}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            AJ
          </Avatar>
          <Box>
            <Heading fontSize="md">{user.name}</Heading>
            <Text color="trueGray.500">Điểm uy tín: 30</Text>
          </Box>
        </HStack>
        <Divider my="2" />
        <VStack space={5}>
          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
              colorScheme="trueGray"
              icon={<Icon as={AntDesign} name="setting" />}
            />
            <Text fontSize="md">Cài đặt</Text>
          </HStack>
          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
              colorScheme="trueGray"
              icon={<Icon as={AntDesign} name="questioncircleo" />}
            />
            <Text fontSize="md">FAQ</Text>
          </HStack>
          <HStack alignItems="center" space={5}>
            <IconButton
              variant="solid"
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
