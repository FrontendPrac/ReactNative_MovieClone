import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View, Text, useColorScheme } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { authService } from "../../firebase";

const My = ({ navigation: { reset } }) => {
  const isDark = useColorScheme() === "dark";

  // 비로그인 시 로그인 화면으로 이동
  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Movies",
              },
            },
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }
    })
  );
  return (
    <View>
      <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>My</Text>
    </View>
  );
};

export default My;
