import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Text, Avatar, View, Icon, Pressable } from "native-base";
import { Feather } from "@native-base/icons";
import HomeView from "./Home";
import ExploreScreen from "./ExploreScreen";

const Tab = createBottomTabNavigator();

export default function DashboardScreen() {
  const navigation = useNavigation();
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
                  uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                }}
              />
            </Pressable>
          );
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon as={Feather} name="home" color={color} size={size} />;
          },
        }}
        name="Home"
        component={HomeView}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Icon as={Feather} name="compass" color={color} size={size} />
            );
          },
        }}
        name="Explore"
        component={ExploreScreen}
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

function PlansScreen() {
  return (
    <View>
      <Text>Bookmark and planning screen</Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View>
      <Text>NotificationsScreen</Text>
    </View>
  );
}
