import { Center, Image, Heading, Box } from "native-base";
import React from "react";

export default function NotificationsScreen() {
  return (
    <Center flex={1}>
      <Box maxW="4/5">
        <Image
          resizeMode="contain"
          source={require("../../../assets/images/404.png")}
          alt="No notification"
        />
      </Box>
      <Heading textAlign="center" fontSize="md" color="trueGray.500">
        Hiện tại không có thông báo mới nào
      </Heading>
    </Center>
  );
}
