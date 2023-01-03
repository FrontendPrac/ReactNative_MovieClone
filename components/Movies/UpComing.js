import { View, Text, Image } from "react-native";
import styled from "@emotion/native";

const UpComing = () => {
  return (
    <StUpComingContainer>
      <View>
        <StTitle>개봉예정</StTitle>
      </View>
      <StContentBox>
        <StImageBox>
          <StImage source={require("../../assets/upcoming_movie.jpeg")} />
        </StImageBox>
        <View>
          <Text>엔트맨 : 퀀텀매니아</Text>
          <Text>2023.02</Text>
          <StContent numberOfLines={5} ellipsizeMode="tail">
            하나뿐인 딸에게 멋진 아빠이고 싶지만, 현실은 생계형 도둑인 스캇
            랭(폴 러드). 어느 날 그에게 몸을 자유자재로 늘리거나 줄일 수 있는 핌
            입자를 개발한 과학자 행크 핌(마이클 더글라스)이 찾아와 수트와 헬멧을
            건네며 ‘앤트맨’이 되어 줄 것을 요청한다. 어리둥절 하지만 일단 한번
            해보기로 결심한 스캇 랭은 행크 핌의 딸인 호프(에반젤린 릴리)의
            도움을 받아 점차 히어로의 면모를 갖추어가고, 그의 스승이자 멘토인
            행크 핌 박사를 도와 핌 입자를 악용하려는 세력을 막아야 하는데… 마블
            유니버스의 새로운 세계가 이제 그의 손에 달렸다!
          </StContent>
        </View>
      </StContentBox>

      <StContentBox>
        <StImageBox>
          <StImage source={require("../../assets/upcoming_movie.jpeg")} />
        </StImageBox>
        <View>
          <Text>엔트맨 : 퀀텀매니아</Text>
          <Text>2023.02</Text>
          <StContent numberOfLines={5} ellipsizeMode="tail">
            하나뿐인 딸에게 멋진 아빠이고 싶지만, 현실은 생계형 도둑인 스캇
            랭(폴 러드). 어느 날 그에게 몸을 자유자재로 늘리거나 줄일 수 있는 핌
            입자를 개발한 과학자 행크 핌(마이클 더글라스)이 찾아와 수트와 헬멧을
            건네며 ‘앤트맨’이 되어 줄 것을 요청한다. 어리둥절 하지만 일단 한번
            해보기로 결심한 스캇 랭은 행크 핌의 딸인 호프(에반젤린 릴리)의
            도움을 받아 점차 히어로의 면모를 갖추어가고, 그의 스승이자 멘토인
            행크 핌 박사를 도와 핌 입자를 악용하려는 세력을 막아야 하는데… 마블
            유니버스의 새로운 세계가 이제 그의 손에 달렸다!
          </StContent>
        </View>
      </StContentBox>
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

const StContentBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StImageBox = styled.View`
  width: 150px;
  height: 200px;
  margin-right: 10px;
`;

const StImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StContent = styled.Text`
  width: 200px;
  line-height: 25px;
`;
