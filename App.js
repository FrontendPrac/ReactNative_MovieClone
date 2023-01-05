import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";

const queryClient = new QueryClient();

const App = () => {
  // 다크모드 적용하기
  const isDark = useColorScheme() === "dark";
  // react query 적용하기
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
