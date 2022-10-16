import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type PageProps = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
};

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = (props) => {
  const { title, index, translateX } = props;

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          scale,
        },
      ],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY: translateY,
        },
      ],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        { backgroundColor: `rgba(0, 0, 256, .${index + 2})` },
      ]}
    >
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{ position: "absolute" }, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: SIZE,
    height: SIZE,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 256, .4)",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 70,
    color: "white",
    textTransform: "uppercase",
    fontWeight: "700",
  },
});

export default Page;
