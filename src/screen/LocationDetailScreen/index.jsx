import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailView from "./DetailView";
import ImageView from "./ImageView";

const screenStack = createNativeStackNavigator();

export default function LocationDetailScreen() {
  return (
    <screenStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <screenStack.Screen name="ImageView" component={ImageView} />
      <screenStack.Screen name="DetailView" component={DetailView} />
    </screenStack.Navigator>
  );
}
