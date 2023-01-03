import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Recommend from "../../components/Movies/Recommend";
import TopView from "../../components/Movies/TopView";
import UpComing from "../../components/Movies/UpComing";

const Movies = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Recommend />
        <TopView />
        <UpComing />
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
