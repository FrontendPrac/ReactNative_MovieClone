import { View, Text, useColorScheme } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { getImgPath } from "../../util";
import { useNavigation } from "@react-navigation/native";

const TopView = ({ topViewData, fetchNextPage, hasNextPage }) => {
  const { navigate } = useNavigation();

  const isDark = useColorScheme() === "dark";

  // 스크롤 마지막에 실행하는 함수
  const fetchMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };

  return (
    <View>
      <View>
        <StTitle
          style={{
            color: isDark ? WHITE_COLOR : DARK_COLOR,
            marginBottom: 20,
            fontSize: 30,
          }}
        >
          무비차트
        </StTitle>
      </View>

      {/* FlatList: date, renderItem, keyExtractor */}
      {/* navigate : navigator, screen, params */}
      <StTopViewList
        onEndReached={fetchMore}
        // onEndReachedThreshold={0.5}
        ItemSeparatorComponent={<View style={{ width: 10 }} />}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={topViewData.pages.map((page) => page.results).flat()}
        renderItem={({ item }) => (
          <StTopView
            onPress={() =>
              navigate("Stacks", {
                screen: "Detail",
                params: { movieId: item.id },
              })
            }
          >
            <StImage source={{ uri: getImgPath(item.poster_path) }} />
            <StText>
              <Text style={{ color: WHITE_COLOR }}>
                ⭐{item.vote_average}/10
              </Text>
              <Text style={{ color: WHITE_COLOR }}>{item.title}</Text>
            </StText>
          </StTopView>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TopView;

const StTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const StTopViewList = styled.FlatList`
  height: 270px;
`;

const StTopView = styled.TouchableOpacity`
  width: 150px;
  height: 200px;
  margin-bottom: 20px;
`;

const StImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const StText = styled.View`
  background-color: #4d4d4d;
  width: 100%;
  height: 70px;
  border-radius: 10px;
  padding: 5px;
`;
