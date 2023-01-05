import { View, Text, useColorScheme, Alert } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { getImgPath } from "../../util";
import { useNavigation } from "@react-navigation/native";

const UpComing = ({ upComingData }) => {
  const { navigate } = useNavigation();

  const isDark = useColorScheme() === "dark";

  return (
    <StUpComingContainer>
      <View>
        <StTitle
          style={{
            color: isDark ? WHITE_COLOR : DARK_COLOR,
            marginBottom: 20,
            fontSize: 30,
          }}
        >
          개봉예정
        </StTitle>
      </View>
      {/* navigate : navigator, screen, params */}
      {upComingData.results.map((movie) => (
        <StContentBox
          key={movie.id}
          onPress={() =>
            navigate("Stacks", {
              screen: "Detail",
              params: { movieId: movie.id },
            })
          }
        >
          <StImageBox>
            <StImage source={{ uri: getImgPath(movie.poster_path) }} />
          </StImageBox>
          <View>
            <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
              {movie.title}
            </Text>
            <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
              {movie.release_date}
            </Text>
            <StContent
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}
            >
              {movie.overview}
            </StContent>
          </View>
        </StContentBox>
      ))}
    </StUpComingContainer>
  );
};

export default UpComing;

const StUpComingContainer = styled.View`
  margin-top: 40px;
`;

const StTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const StContentBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 10px;
  align-items: center;
`;

const StImageBox = styled.View`
  width: 150px;
  height: 200px;
  margin-right: 10px;
`;

const StImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const StContent = styled.Text`
  width: 200px;
  line-height: 20px;
`;
