import { View, Text, ScrollView } from "react-native";
import styled from "@emotion/native";

const TopView = () => {
  return (
    <StTopViewContainer>
      <View>
        <StTitle>무비차트</StTitle>
      </View>

      <StTopViewList horizontal={true} showsVerticalScrollIndicator={true}>
        <StTopView>
          <StImage source={require("../../assets/movie.jpeg")} />
          <StText>
            <Text>⭐8.74/10</Text>
            <Text>올빼미</Text>
          </StText>
        </StTopView>

        <StTopView>
          <StImage source={require("../../assets/movie.jpeg")} />
          <StText>
            <Text>⭐8.74/10</Text>
            <Text>올빼미</Text>
          </StText>
        </StTopView>

        <StTopView>
          <StImage source={require("../../assets/movie.jpeg")} />
          <StText>
            <Text>⭐8.74/10</Text>
            <Text>올빼미</Text>
          </StText>
        </StTopView>
      </StTopViewList>
    </StTopViewContainer>
  );
};

export default TopView;

const StTopViewContainer = styled.View`
  margin-bottom: 20px;
`;

const StTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const StTopViewList = styled.View`
  flex-direction: row;
`;

const StTopView = styled.View`
  width: 150px;
  height: 200px;
  padding-right: 10px;
`;

const StImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StText = styled.View`
  background-color: grey;
`;
