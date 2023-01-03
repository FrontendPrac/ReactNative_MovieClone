import {
  NavigationContainer,
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const isDark = useColorScheme() === "dark";
  // console.log(isDark);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
