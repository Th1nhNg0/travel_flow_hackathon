import { Box, HStack, Icon, Text } from "native-base";
import { AntDesign } from "@native-base/icons";

export default function RatingComponent() {
  const star = Math.random() * 6;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i <= Math.floor(star)) {
      stars.push(
        <Icon key={i} as={AntDesign} name="star" size="md" color="yellow.500" />
      );
    } else {
      stars.push(
        <Icon
          key={i}
          as={AntDesign}
          name="staro"
          size="md"
          color="yellow.500"
        />
      );
    }
  }
  return (
    <Box>
      <HStack alignItems="center">
        {stars}
        <Text ml={1} fontWeight="semibold" fontSize="sm" color="blueGray.500">
          ({Math.round(Math.random() * 1000)} đánh giá)
        </Text>
      </HStack>
    </Box>
  );
}
