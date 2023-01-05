// 화면 비율 계산하기
import { Dimensions } from "react-native";

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// 이미지 주소 리턴하는 함수
export const getImgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};

// BASE URL, API KEY
export const BASE_URL = "https://api.themoviedb.org/3/movie";
export const API_KEY = "107e43947a000a55344da6b74ae71a48";

// 정규식
export const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const pwRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
