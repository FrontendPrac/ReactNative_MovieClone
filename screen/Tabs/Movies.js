import styled from "@emotion/native";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getRecommend, getTopView, getUpComing } from "../../api";

import Recommend from "../../components/Movies/Recommend";
import TopView from "../../components/Movies/TopView";
import UpComing from "../../components/Movies/UpComing";

const Movies = () => {
  // server state
  // const [recommed, setRecommed] = useState([]);
  // const [topView, setTopView] = useState([]);
  // const [upComing, setUpComing] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // client state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // query client : query key를 가지고 있어 cache에 접근 가능하다
  const queryClient = useQueryClient();

  // useQuery : recommendData
  const {
    data: recommedData,
    isLoading: isLoadingRD,
    // refetch: refetchRD,
  } = useQuery(["Movies", "recommend"], getRecommend);

  // useQuery : topViewData -> 무한 스크롤
  const {
    data: topViewData,
    isLoading: isLoadingTD,
    fetchNextPage,
    hasNextPage,
    // refetch: refetchTD,
  } = useInfiniteQuery(["Movies", "topView"], getTopView, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  // console.log('topViewData: ', topViewData)

  // const {
  //   data: topViewData,
  //   isLoading: isLoadingTD,
  //   // refetch: refetchTD,
  // } = useQuery(["Movies", "topView"], getTopView);

  // useQuery : upComingData
  const {
    data: upComingData,
    isLoading: isLoadingUD,
    // refetch: refetchUD,
  } = useQuery(["Movies", "upComing"], getUpComing);

  const isLoading = isLoadingRD || isLoadingTD || isLoadingUD;

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
    // await refetchRD();
    // await refetchTD();
    // await refetchUD();
    await queryClient.refetchQueries(["Movies"]);
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
        <Recommend recommedData={recommedData} />
        <TopView
          topViewData={topViewData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
        <UpComing upComingData={upComingData} />
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
