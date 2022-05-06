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

export default function SignInScreen() {
  const { login } = useContext(AuthContext);
  return (
    <Center w="100%" h="100%">
      <Box safeArea px="4" w="90%">
        <Heading size="lg" fontWeight="600" color="coolGray.800">
          Welcome
        </Heading>
        <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <Input placeholder="Email" type="text" />
          </FormControl>
          <FormControl>
            <Input placeholder="Password" type="password" />
          </FormControl>
          <Button backgroundColor="primary.1" onPress={(e) => login()}>
            Continue
          </Button>
          <Link
            _text={{
              color: "primary.2",
              fontWeight: "semibold",
              fontSize: "sm",
              textDecoration: "none",
            }}
            href="#"
          >
            Forgot your password ?
          </Link>
          <HStack mt="6">
            <Text fontSize="sm" color="coolGray.600">
              Not a member?{" "}
            </Text>
            <Link
              _text={{
                color: "primary.2",
                fontWeight: "semibold",
                fontSize: "sm",
                textDecoration: "none",
              }}
              href="#"
            >
              Register now
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
