import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  StyleSheet,
  useColorScheme,
} from "react-native";
import styled from "@emotion/native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { API_KEY, BASE_URL, getImgPath, SCREEN_HEIGHT } from "../../util";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { useQuery } from "react-query";
import { getDetail } from "../../api";
import { authService } from "../../firebase";

// 매개변수 받기
const Detail = ({
  route: {
    params: { movieId },
  },
  navigation: { navigate },
}) => {
  // server state
  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  const isDark = useColorScheme() === "dark";

  // useQuery : detailData
  const { data: detailData, isLoading: isLoadingDD } = useQuery(
    ["Detail", movieId],
    getDetail
  );

  // 유튜브로 이동시켜주는 함수
  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    await Linking.openURL(url);
  };

  // 비로그인 시 로그인 화면으로 이동하는 함수
  const handleAdding = () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
  };

  const isLoading = isLoadingDD;

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <Container>
      <View>
        <BackdropImg
          style={StyleSheet.absoluteFill}
          source={{ uri: getImgPath(detailData.backdrop_path) }}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["transparent", "black"]}
        />
        <Title style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          {detailData.title}
        </Title>
      </View>
      <Overview style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        {detailData.overview}
      </Overview>
      <YoutubeList style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        {detailData?.videos?.results.map((video) => (
          <Row key={video.key} onPress={() => openYoutube(video.key)}>
            <AntDesign
              name="youtube"
              size={24}
              color={isDark ? "white" : "black"}
            />
            <VideoName style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
              {video.name}
            </VideoName>
          </Row>
        ))}
      </YoutubeList>
      <SectionTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
        Reviews
      </SectionTitle>
      <AddReview
        onPress={handleAdding}
        style={{ borderColor: isDark ? WHITE_COLOR : DARK_COLOR }}
      >
        <TempText style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          Add Review
        </TempText>
      </AddReview>
    </Container>
  );
};

export default Detail;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView``;

const View = styled.View`
  height: ${SCREEN_HEIGHT / 4 + "px"};
  justify-content: flex-end;
`;

const BackdropImg = styled.Image`
  width: 100%;
  flex: 1;
  border-radius: 10px;
`;

const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-left: 20px;
`;

const Overview = styled.Text`
  font-size: 15px;
  font-weight: 400;
  padding: 20px;
  line-height: 20px;
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;

const VideoName = styled.Text`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-left: 10px;
`;

const YoutubeList = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

const SectionTitle = styled.Text`
  color: ${(props) => props.theme.upcomingText};
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

const AddReview = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  align-items: center;
`;

const TempText = styled.Text`
  font-size: 20px;
`;
