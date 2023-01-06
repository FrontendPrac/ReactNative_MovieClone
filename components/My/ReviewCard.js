import React from "react";
import styled from "@emotion/native";
import { SCREEN_WIDTH } from "../../util";
import { useNavigation } from "@react-navigation/native";
import Vote from "./Vote";
import { useColorScheme } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";

const ReviewCard = ({ review }) => {
  const isDark = useColorScheme() === "dark";

  const { navigate } = useNavigation();

  const goToReview = () => {
    navigate("Review", {
      review,
      from: "Detail",
    });
  };

  return (
    <Column
      onPress={goToReview}
      style={{ borderColor: isDark ? WHITE_COLOR : DARK_COLOR }}
    >
      <AbovePart>
        <ReviewDate style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          {new Date(review.createdAt).toLocaleDateString("kr")}
        </ReviewDate>
        <ReviewTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          {review.title}
        </ReviewTitle>
        <ReviewContents
          numberOfLines={5}
          style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}
        >
          {review.content}
        </ReviewContents>
      </AbovePart>
      <Vote vote_average={review.rating} />
    </Column>
  );
};

export default ReviewCard;

const Column = styled.TouchableOpacity`
  justify-content: space-between;
  border-width: 1px;
  width: ${SCREEN_WIDTH / 2.5 + "px"};
  border-radius: 10px;
  padding: 10px;
  height: 200px;
`;

const AbovePart = styled.View``;

const ReviewDate = styled.Text`
  margin-bottom: 10px;
`;

const ReviewTitle = styled.Text`
  margin-bottom: 10px;
`;

const ReviewContents = styled.Text`
  line-height: 18px;
`;
