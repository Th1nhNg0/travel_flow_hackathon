import { extendTheme, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screen/SignInScreen";
import DashboardScreen from "./src/screen/DashboardScreen";
import UserAndSettingsScreen from "./src/screen/UserAndSettingsScreen";
import LocationDetailScreen from "./src/screen/LocationDetailScreen";
import { AuthContext, AuthContextProvider } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  colors: {
    primary: {
      1: "#235CA9",
      2: "#3785FD",
    },
  },
});

export default function App() {
  useEffect(() => {
    moment.locale("vi");
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AuthContextProvider>
          <AuthContext.Consumer>
            {({ isLoggedIn }) => (
              <Stack.Navigator initialRouteName="Dashboard">
                {!isLoggedIn ? (
                  <Stack.Screen
                    options={{
                      headerShown: false,
                    }}
                    name="SignIn"
                    component={SignInScreen}
                  />
                ) : (
                  <>
                    <Stack.Screen
                      options={{
                        headerShown: false,
                      }}
                      name="Dashboard"
                      component={DashboardScreen}
                    />
                    <Stack.Screen
                      name="UserAndSettings"
                      component={UserAndSettingsScreen}
                    />
                    <Stack.Screen
                      options={{
                        headerShown: false,
                      }}
                      name="LocationDetail"
                      component={LocationDetailScreen}
                    />
                  </>
                )}
              </Stack.Navigator>
            )}
          </AuthContext.Consumer>
        </AuthContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
