import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailView from "./DetailView";

const screenStack = createNativeStackNavigator();

export default function PlanDetailScreen() {
  return (
    <screenStack.Navigator>
      {/* <screenStack.Screen name="ImageView" component={ImageView} /> */}
      <screenStack.Screen name="DetailView" component={DetailView} />
      {/* <screenStack.Screen name="LocationMapView" component={LocationMapView} /> */}
    </screenStack.Navigator>
  );
}
