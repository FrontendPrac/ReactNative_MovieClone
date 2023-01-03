import { View, Text, Image } from "react-native";
import styled from "@emotion/native";

const Recommend = () => {
  return (
    <StRecommendContainer>
      <StImage source={require("../../assets/movie.jpeg")} />
      <Text>올빼미</Text>
      <Text>⭐8.74/10</Text>
      <StText numberOfLines={5} ellipsizeMode="tail">
        > 맹인이지만 뛰어난 침술 실력을 지닌 ‘경수’는 어의 ‘이형익’에게 그
        재주를 인정받아 궁으로 들어간다. 그 무렵, 청에 인질로 끌려갔던
        ‘소현세자’가 8년 만에 귀국하고, ‘인조’는 아들을 향한 반가움도 잠시 정체
        모를 불안감에 휩싸인다. 그러던 어느 밤, 어둠 속에서는 희미하게 볼 수
        있는 ‘경수’가 ‘소현세자’의 죽음을 목격하게 되고 진실을 알리려는 찰나 더
        큰 비밀과 음모가 드러나며 목숨마저 위태로운 상황에 빠진다. 아들의 죽음
        후 ‘인조’의 불안감은 광기로 변하여 폭주하기 시작하고 세자의 죽음을
        목격한 ‘경수’로 인해 관련된 인물들의 민낯이 서서히 드러나게 되는데...
      </StText>
    </StRecommendContainer>
  );
};

export default Recommend;

const StRecommendContainer = styled.View`
  margin-bottom: 20px;
`;

const StImage = styled.Image`
  width: 100%;
  height: 500px;
  object-fit: cover;
`;

// Todo: 다크모드 폰트 색상 적용
const StText = styled.Text`
  color: ${(props) => props.theme.title};
`;
