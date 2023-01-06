import React, { useEffect } from "react";
import styled from "@emotion/native";
import { TouchableOpacity, useColorScheme, View } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { authService } from "../../firebase";
import { Feather } from "@expo/vector-icons";

const Review = ({
  navigation,
  route: {
    params: { review, from },
  },
}) => {
  const isDark = useColorScheme() === "dark";

  // reviewEdit으로 이동하는 함수
  const onEdit = () => {
    navigation.navigate("ReviewEdit", { review, from });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => {
        if (authService.currentUser) {
          return (
            <TouchableOpacity onPress={onEdit}>
              <Feather
                name="edit"
                size={24}
                color={isDark ? WHITE_COLOR : DARK_COLOR}
              />
            </TouchableOpacity>
          );
        }
      },
    });
  }, []);

  return (
    <Container>
      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        평점
      </SectionTitle>

      <Ratings style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        ⭐️ {review.rating} / 10
      </Ratings>

      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        제목
      </SectionTitle>

      <Title style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        {review.title}
      </Title>

      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        내용
      </SectionTitle>

      <Content style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        {review.content}
      </Content>
    </Container>
  );
};

export default Review;

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const Ratings = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;
export const Content = styled.Text`
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
`;
