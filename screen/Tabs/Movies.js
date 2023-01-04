import styled from "@emotion/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Recommend from "../../components/Movies/Recommend";
import TopView from "../../components/Movies/TopView";
import UpComing from "../../components/Movies/UpComing";
import { API_KEY, BASE_URL } from "../../util";

const Movies = () => {
  // state 생성하기
  const [recommed, setRecommed] = useState([]);
  const [topView, setTopView] = useState([]);
  const [upComing, setUpComing] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 추천 데이터 받아오는 함수
  const getRecommend = async () => {
    try {
      const { results } = await fetch(
        `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      ).then((res) => res.json());
      // console.log(results);
      setRecommed(results);
    } catch {
      console.log("Error");
    }
  };

  // 무비차트 데이터 받아오는 함수
  const getTopView = async () => {
    try {
      const { results } = await fetch(
        `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      ).then((res) => res.json());
      // console.log(results);
      setTopView(results);
    } catch {
      console.log("Error");
    }
  };

  // 개봉예정 데이터 받아오는 함수
  const getUpComing = async () => {
    try {
      const { results } = await fetch(
        `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      ).then((res) => res.json());
      // console.log(results);
      setUpComing(results);
    } catch {
      console.log("Error");
    }
  };

  // 데이터 받아오는 함수 합치는 함수
  const getData = async () => {
    await Promise.all([getRecommend(), getTopView(), getUpComing()]);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // 로딩 시 보여주는 화면
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  // 새로고침 시 실행되는 함수
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        // 새로고침 속성
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Recommend recommed={recommed} />
        <TopView topView={topView} />
        <UpComing upComing={upComing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
