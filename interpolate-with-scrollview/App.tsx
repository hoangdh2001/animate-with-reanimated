import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Page from "./src/components/Page";

const WORDS = ["what's", "up", "mobile", "dev?"];

export default function App() {
  const translateX = useSharedValue(0);

  const scrollHandle = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      style={styles.container}
      scrollEventThrottle={16}
      onScroll={scrollHandle}
    >
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
