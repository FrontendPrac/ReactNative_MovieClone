import React, { useState } from "react";
import styled from "@emotion/native";
import { Rating } from "react-native-ratings";
import { Alert, AsyncStorage, useColorScheme, View } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { useMutation } from "react-query";
import { deleteReview, editReview } from "../../api";
import { async } from "@firebase/util";

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

  // reviseReview : useMutation - 데이터베이스 데이터에 변경을 가할때 사용
  const { isLoading: isLoadingEditing, mutate: reviseReview } = useMutation(
    ["editReview", review.id],
    (body) => editReview(body),
    {
      onSuccess: () => {
        console.log("수정 성공");
      },
      onError: (err) => {
        console.log("수정 에러");
      },
    }
  );

  // removeReview : useMutation - 데이터베이스 데이터에 변경을 가할때 사용
  const { isLoading: isLoadingDeleting, mutate: removeReview } = useMutation(
    ["deleteReview", review.id],
    (body) => deleteReview(body),
    {
      onSuccess: () => {
        console.log("삭제 성공");
      },
      onError: (err) => {
        console.log("삭제 에러");
      },
    }
  );

  // 편집 버튼 로직
  const onEditDone = () => {
    if (!newTitle && !newContent && !ratings) {
      alert("수정한 부분이 없습니데이");
    }

    // 입력 값이 3개 중 하나라도 있으면 patch하도록 객체 구성
    let editingObj = {};

    if (newTitle) {
      Object.assign(editingObj, { title: newTitle });
    }
    if (newContent) {
      Object.assign(editingObj, { content: newContent });
    }
    if (ratings) {
      Object.assign(editingObj, { rating: ratings });
    }

    // console.log(editingObj);

    Alert.alert("리뷰 수정", "리뷰를 수정하시겠습니꺼?", [
      { text: "취소", style: "destructive" },
      {
        text: "수정",
        onPress: async () => {
          try {
            await reviseReview({ reviewId: review.id, editingObj });
            setNewTitle("");
            setNewContent("");
            setRatings(0);
            if (from === "Detail") {
              navigation.reset({
                index: 1,
                routes: [
                  { name: "Detail", params: { movieId: review.movieId } },
                  {
                    name: "Review",
                    params: { review: { ...review, ...editingObj }, from },
                  },
                ],
              });
            } else if (from === "My") {
              navigation.reset({
                routes: [{ name: "Tabs", params: { screen: "My" } }],
              });
            }
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  // 삭제 버튼 로직
  const onDelete = () => {
    Alert.alert("리뷰 삭제", "리뷰를 삭제하시겠습니꺼?", [
      { text: "취소", style: "destructive" },
      {
        text: "삭제",
        onPress: async () => {
          try {
            await removeReview(review.id);
            if (from === "Detail") {
              navigation.navigate("Detail", { movieId: review.movieId });
            } else if (from === "My") {
              navigation.navigate("Tabs", { screen: "My" });
            }
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  // 별점 로직
  const getRatings = (ratings) => {
    setRatings(ratings);
  };

  // 인풋 로직
  const onChangeTitle = (title) => {
    setNewTitle(title);
  };

  return (
    <Container>
      <EditButton
        // disabled={!newTitle && !newContent && !ratings}
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
