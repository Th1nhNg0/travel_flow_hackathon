import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { Feather } from "@native-base/icons";

export default function HomeView() {
  return (
    <Box py={5}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="3" px={5} justifyContent="center">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
            <Center key={e}>
              <IconButton
                borderRadius="full"
                bg="primary.1"
                variant="solid"
                p="3"
                icon={
                  <Icon color="white" name="wifi" as={Feather} size="2xl" />
                }
              />
              <Text textAlign="center">Wi-Fi</Text>
            </Center>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
}
