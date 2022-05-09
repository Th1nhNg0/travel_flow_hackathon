import { extendTheme, NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import moment from "moment";
import "moment/locale/vi";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screen/SignInScreen";
import SignUpScreen from "./src/screen/SignUpScreen";
import DashboardScreen from "./src/screen/DashboardScreen";
import UserAndSettingsScreen from "./src/screen/UserAndSettingsScreen";
import LocationDetailScreen from "./src/screen/LocationDetailScreen";
import PlanDetailScreen from "./src/screen/PlanDetailScreen";

import { AuthContext, AuthContextProvider } from "./src/context/AuthContext";
import * as Location from "expo-location";

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
    Location.requestForegroundPermissionsAsync();
  }, []);

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <AuthContextProvider>
          <AuthContext.Consumer>
            {({ isLoggedIn, isLoading }) =>
              isLoading ? null : (
                <Stack.Navigator initialRouteName="Dashboard">
                  {!isLoggedIn ? (
                    <>
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="SignIn"
                        component={SignInScreen}
                      />
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="SignUp"
                        component={SignUpScreen}
                      />
                    </>
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
                        options={{
                          headerTitle: "Người dùng và cài đặt",
                        }}
                        component={UserAndSettingsScreen}
                      />
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="LocationDetail"
                        component={LocationDetailScreen}
                      />
                      <Stack.Screen
                        options={{
                          headerShown: false,
                        }}
                        name="PlanDetailScreen"
                        component={PlanDetailScreen}
                      />
                    </>
                  )}
                </Stack.Navigator>
              )
            }
          </AuthContext.Consumer>
        </AuthContextProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
