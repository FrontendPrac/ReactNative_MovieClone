import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import { Text, useColorScheme, TouchableOpacity } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../colors";
import { authService } from "../firebase";
import Detail from "../screen/Stacks/Detail";
import Login from "../screen/Stacks/Login";
import Review from "../screen/Stacks/Review";
import ReviewEdit from "../screen/Stacks/ReviewEdit";

const Stack = createNativeStackNavigator();

const Stacks = ({ navigation: { goBack, navigate } }) => {
  const isDark = useColorScheme() === "dark";

  // 비로그인 시 로그인 화면으로 이동하는 함수, 로그인 시 로그아웃 하는 함수
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공");
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      navigate("Login");
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{
        title: "영화 정보",
        headerTitleAlign: "center",
        headerTintColor: isDark ? WHITE_COLOR : DARK_COLOR,
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
              뒤로
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
                {authService.currentUser ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="ReviewEdit" component={ReviewEdit} />
    </Stack.Navigator>
  );
};

export default Stacks;
