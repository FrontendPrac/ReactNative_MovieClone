import { View, Text, useColorScheme, FlatList } from "react-native";
import styled from "@emotion/native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";
import { getImgPath } from "../../util";

const TopView = ({ topView }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View>
      <View>
        <StTitle style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
          무비차트
        </StTitle>
      </View>

      {/* FlatList: date, renderItem, keyExtractor */}
      <StTopViewList
        ItemSeparatorComponent={<View style={{width: 10}} />}
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={topView}
        renderItem={({ item }) => (
          <StTopView>
            <StImage source={{ uri: getImgPath(item.poster_path) }} />
            <StText>
              <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
                ⭐{item.vote_average}/10
              </Text>
              <Text style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
                {item.title}
              </Text>
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
`;
