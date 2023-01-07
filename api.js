import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";
import { API_KEY, BASE_URL } from "./util";

// 추천 데이터 받아오는 함수
export const getRecommend = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

// 무비차트 데이터 받아오는 함수 : 무한 스크롤
export const getTopView = ({ pageParam = 1 }) => {
  // console.log("pageParam: ", pageParam);
  return fetch(
    `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  ).then((res) => res.json());
};

// 개봉예정 데이터 받아오는 함수
export const getUpComing = () =>
  fetch(`${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then(
    (res) => res.json()
  );

// 유튜브 데이터 받아오는 함수
export const getDetail = (params) => {
  // console.log("params: ", params);
  const [_, movieId] = params.queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json());
};

// 데이터베이스의 데이터를 수정하는 함수
export const editReview = async ({ reviewId, editingObj }) => {
  await updateDoc(doc(dbService, "reviews", reviewId), editingObj);
};

// 데이터베이스의 데이터를 삭제삭제하는 함수
export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(dbService, "reviews", reviewId));
};

/////////// use query 사용하기 이전의 코드 ///////////

// // 추천 데이터 받아오는 함수
// const getRecommend = async () => {
//   try {
//     const { results } = await fetch(
//       `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
//     ).then((res) => res.json());
//     // console.log(results);
//     setRecommed(results);
//   } catch {
//     console.log("Error");
//   }
// };

// // 무비차트 데이터 받아오는 함수
// const getTopView = async () => {
//   try {
//     const { results } = await fetch(
//       `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
//     ).then((res) => res.json());
//     // console.log(results);
//     setTopView(results);
//   } catch {
//     console.log("Error");
//   }
// };

// // 개봉예정 데이터 받아오는 함수
// const getUpComing = async () => {
//   try {
//     const { results } = await fetch(
//       `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
//     ).then((res) => res.json());
//     // console.log(results);
//     setUpComing(results);
//   } catch {
//     console.log("Error");
//   }
// };

// // 데이터 받아오는 함수 합치는 함수
// const getData = async () => {
//   await Promise.all([getRecommend(), getTopView(), getUpComing()]);
//   setIsLoading(false);
// };

// useEffect(() => {
//   getData();
// }, []);

//  // 유튜브 데이터 받아오는 함수
//  const getDetail = async () => {
//   const response = await fetch(
//     `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
//   ).then((res) => res.json());

//   setData(response);
//   setIsLoading(false);
// };

// useEffect(() => {
//   getDetail();
// }, []);
