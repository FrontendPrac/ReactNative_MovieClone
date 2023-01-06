import React, { useState } from "react";
import styled from "@emotion/native";
import { Rating } from "react-native-ratings";
import { useColorScheme, View } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";

const ReviewEdit = ({
  navigation,
  route: {
    params: { review, from },
  },
}) => {
  // console.group("from: ", from);

  const isDark = useColorScheme() === "dark";

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [ratings, setRatings] = useState(0);

  // 편집 이후 로직
  const onEditDone = () => {
    if(!newTitle && !newContent && !ratings) {
      alert("수정한 부분이 없습니데이")
    }
  };

  // 입력 값이 3개 중 하나라도 있으면 patch

  // 삭제 이후 로직
  const onDelete = () => {};

  // 별점 로직
  const getRatings = () => {
    setRatings(ratings);
  };

  // 인풋 로직
  const onChangeTitle = (title) => {
    setNewTitle(title);
  };

  return (
    <Container>
      <EditButton
        disabled={!newTitle && !newContent && !ratings}
        onPress={onEditDone}
        style={{ borderColor: isDark ? WHITE_COLOR : DARK_COLOR }}
      >
        <BtnTitle
          disabled={!newTitle && !newContent && !ratings}
          style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}
        >
          수정하기
        </BtnTitle>
      </EditButton>
      <EditButton
        onPress={onDelete}
        style={{ borderColor: isDark ? WHITE_COLOR : DARK_COLOR }}
      >
        <BtnTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          삭제하기
        </BtnTitle>
      </EditButton>

      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        평점
      </SectionTitle>

      <Rating
        startingValue={review.rating}
        style={{
          alignItems: "flex-start",
          marginBottom: 20,
        }}
        onFinishRating={getRatings}
        ratingCount={10}
        imageSize={25}
        tintColor="black"
      />

      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        제목
      </SectionTitle>

      <TitleEdit
        value={newTitle}
        placeholderTextColor={DARK_COLOR}
        onChangeText={onChangeTitle}
        placeholder="제목"
        maxLength={30}
      />

      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        내용
      </SectionTitle>

      <ContentEdit
        textAlignVertical="top"
        value={newContent}
        onChangeText={(text) => setNewContent(text)}
        multiline
        maxLength={300}
        placeholderTextColor={DARK_COLOR}
        placeholder="내용"
      />
    </Container>
  );
};

export default ReviewEdit;

const TitleEdit = styled.TextInput`
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  padding: 10px 15px;
`;
const ContentEdit = styled(TitleEdit)`
  min-height: 150px;
  margin-bottom: 50px;
`;

const Container = styled.ScrollView`
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const EditButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const BtnTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;
