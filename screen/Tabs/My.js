import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { authService, dbService } from "../../firebase";
import styled from "@emotion/native";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Vote from "../../components/My/Vote";
import { signOut } from "firebase/auth";

const My = ({ navigation: { reset, navigate, setOptions } }) => {
  const isDark = useColorScheme() === "dark";

  const [reviews, setReviews] = useState([]);

  // 리뷰 페이지로 이동하는 함수
  const goToReview = (theReview) => {
    navigate("Stacks", {
      screen: "Review",
      params: { review: theReview, from: "My" },
    });
  };

  // 로그아웃하는 함수
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate("Movies");
      })
      .catch((err) => alert(err));
  };

  // 로그아웃 컴포넌트 보이기
  setOptions({
    headerRight: () => {
      return (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
          <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
            로그아웃
          </Text>
        </TouchableOpacity>
      );
    },
  });

  useFocusEffect(
    useCallback(() => {
      // 비로그인 시 로그인 화면으로 이동
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

      // 데이터 조회하기
      const q = query(
        collection(dbService, "reviews"),
        orderBy("createdAt", "desc"),
        where("userId", "==", authService.currentUser?.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(newReviews);
        setReviews(newReviews);
      });
      return unsubscribe;
    }, [])
  );

  return (
    <FlatList
      contentContainerStyle={{ padding: 20 }}
      data={reviews}
      ItemSeparatorComponent={VSeperator}
      ListHeaderComponent={<ListTitle>My Reviews</ListTitle>}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewWrapper
          onPress={() => goToReview(item)}
          style={{ borderColor: isDark ? WHITE_COLOR : DARK_COLOR }}
        >
          <Title style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
            {item.title}
          </Title>
          <Contents
            numberOfLines={2}
            style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}
          >
            {item.content}
          </Contents>
          <Row>
            <Vote vote_average={item.rating} />
            <ReviewAt style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
              {new Date(item.createdAt).toLocaleDateString("kr")}
            </ReviewAt>
          </Row>
        </ReviewWrapper>
      )}
    />
  );
};

export default My;

const ListTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const ReviewWrapper = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 5px;
  border-width: 1px;
`;

const Title = styled.Text`
  font-size: 20px;
`;

const Contents = styled(Title)`
  margin: 10px 0;
  height: 50px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ReviewAt = styled.Text`
  font-size: 14px;
`;

const VSeperator = styled.View`
  height: 10px;
`;
