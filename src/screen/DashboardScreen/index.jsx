import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Text, Avatar, View, Icon, Pressable, Image, Box } from "native-base";
import { Feather } from "@native-base/icons";
import HomeView from "./HomeView";
import ExploreView from "./ExploreView";
import PlansScreen from "./PlansView";
import NotificationsScreen from "./NotificationsScreen";
import { AuthContext } from "../../context/AuthContext";

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitle: (prop) => {
          return (
            <Text fontSize="xl" fontWeight="bold" color="#3785FD">
              Travel
              <Text color="primary.1">Flow</Text>.
            </Text>
          );
        },
        tabBarActiveTintColor: "primary.2",
        headerRight: () => {
          return (
            <Pressable onPress={() => navigation.navigate("UserAndSettings")}>
              <Avatar
                mr={3}
                size="sm"
                source={{
                  uri: `https://avatars.dicebear.com/api/micah/${user.email}.png`,
                }}
              />
            </Pressable>
          );
        },
      }}
    >
      {/* <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Feather} name="home" color={color} size={size} />;
          },
        }}
        name="Home"
        component={HomeView}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon as={Feather} name="compass" color={color} size={size} />
            );
          },
        }}
        name="Explore"
        component={ExploreView}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon as={Feather} name="bookmark" color={color} size={size} />
            );
          },
        }}
        name="Plans"
        component={PlansScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Feather} name="bell" color={color} size={size} />;
          },
        }}
        name="Notifications"
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  );
}
