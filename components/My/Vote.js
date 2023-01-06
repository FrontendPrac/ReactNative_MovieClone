import React from "react";
import styled from "@emotion/native";
import { useColorScheme } from "react-native";
import { DARK_COLOR, WHITE_COLOR } from "../../colors";

const Vote = ({ vote_average }) => {
  const isDark = useColorScheme() === "dark";
  return (
    <Rating style={{ color: isDark ? WHITE_COLOR : DARK_COLOR }}>
      ⭐️{vote_average}/10
    </Rating>
  );
};

export default Vote;

const Rating = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
`;
