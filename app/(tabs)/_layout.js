import { Tabs } from "expo-router";
import { Colors, Header } from "react-native/Libraries/NewAppScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { Color: "#A75D5D" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="tasks" size={24} color="#A75D5D" />
            ) : (
              <FontAwesome name="tasks" size={24} color="#FFC3A1" />
            ),
        }}
      />

      <Tabs.Screen
        name="calender"
        options={{
          tabBarLabel: "Calender",
          tabBarLabelStyle: { Color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
                <AntDesign name="calendar" size={24} color="#A75D5D" />
            ) : (
                <AntDesign name="calendar" size={24} color="#FFC3A1" />
            ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { Color: "#7CB9E8" },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
                <MaterialCommunityIcons name="account-details" size={24} color="#A75D5D" />
            ) : (
                <MaterialCommunityIcons name="account-details" size={24} color="#FFC3A1" />
            ),
        }}
      />
    </Tabs>
  );
}
