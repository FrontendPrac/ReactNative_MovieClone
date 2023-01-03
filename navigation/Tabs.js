import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Tabs/Movies";
import My from "../screen/Tabs/My";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tab.Screen
        name="영화"
        component={Movies}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="movie" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="내 정보"
        component={My}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
