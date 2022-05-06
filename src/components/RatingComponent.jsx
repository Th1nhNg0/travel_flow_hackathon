import { Box, HStack, Icon, Text } from "native-base";
import { AntDesign } from "@native-base/icons";

export default function RatingComponent({ rating, count }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
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
          ({count} đánh giá)
        </Text>
      </HStack>
    </Box>
  );
}
