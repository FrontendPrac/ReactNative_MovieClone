import { Text, useColorScheme } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { getImgPath, SCREEN_HEIGHT } from "../../util";
import { useNavigation } from "@react-navigation/native";

const Recommend = ({ recommedData }) => {
  const { navigate } = useNavigation();

  const isDark = useColorScheme() === "dark";

  return (
    // 슬라이더 라이브러리
    <Swiper height="100%" showsPagination={false} autoplay loop>
      {recommedData.results.map((movie) => (
        <StRecommendContainer key={movie.id}>
          <StBackgroundImage
            source={{
              uri: getImgPath(movie.poster_path),
            }}
            style={StyleSheet.absoluteFill}
          />
          <LinearGradient
            colors={["transparent", "black"]}
            style={StyleSheet.absoluteFill}
          />
          {/* navigate : navigator, screen, params */}
          <Row
            onPress={() =>
              navigate("Stacks", {
                screen: "Detail",
                params: { movieId: movie.id },
              })
            }
          >
            <Poster
              source={{
                uri: getImgPath(movie.backdrop_path),
              }}
            />
            <Column>
              <Text style={{ color: WHITE_COLOR }}>{movie.title}</Text>
              <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
                ⭐{movie.vote_average}/10
              </Text>
              <Text
                numberOfLines={5}
                ellipsizeMode="tail"
                style={{ color: WHITE_COLOR }}
              >
                {movie.overview}
              </Text>
            </Column>
          </Row>
        </StRecommendContainer>
      ))}
    </Swiper>
  );
};

export default Recommend;

const StRecommendContainer = styled.TouchableOpacity`
  /* flex: 1;
  justify-content: flex-end; */
  margin-bottom: 20px;
  height: ${SCREEN_HEIGHT / 2 + "px"};
`;

const StBackgroundImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Row = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Column = styled.View`
  width: 65%;
  margin-left: 10px;
  margin-bottom: 10px;
`;
