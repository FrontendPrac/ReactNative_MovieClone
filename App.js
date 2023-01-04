import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import Root from "./navigation/Root";

const App = () => {
  // 다크모드 적용하기
  const isDark = useColorScheme() === "dark";
  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Root />
    </NavigationContainer>
  );
};

export default App;
