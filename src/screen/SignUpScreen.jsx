import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function SignInScreen() {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <Center w="100%" h="100%">
      <Box safeArea px="4" w="90%">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Sign up
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Create your account to get started
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <Input placeholder="Email" type="text" />
          </FormControl>
          <FormControl>
            <Input placeholder="Fullname" type="text" />
          </FormControl>
          <FormControl>
            <Input placeholder="Password" type="password" />
          </FormControl>
          <Button backgroundColor="primary.1" onPress={() => login()}>
            Continue
          </Button>

          <HStack mt="6">
            <Text fontSize="sm" color="coolGray.600">
              Not a member?{" "}
            </Text>
            <Text
              color="primary.2"
              fontWeight="semibold"
              fontSize="sm"
              onPress={() => navigation.navigate("SignUp")}
            >
              Login now
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
