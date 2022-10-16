import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const image =
  "https://images.unsplash.com/photo-1621569642780-4864752e847e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const { width, height } = Dimensions.get("window");

export default function App() {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);
  const pinchHandle =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      },
      onEnd: (event) => {
        scale.value = withTiming(1);
      },
    });

  const rImageStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: focalX.value,
        },
        {
          translateY: focalY.value,
        },
        {
          translateX: -width / 2,
        },
        {
          translateY: -height / 2,
        },
        {
          scale: scale.value,
        },
        {
          translateX: -focalX.value,
        },
        {
          translateY: -focalY.value,
        },
        {
          translateX: width / 2,
        },
        {
          translateY: height / 2,
        },
      ],
    };
  });
  const rFocalPointStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: focalX.value }, { translateY: focalY.value }],
    };
  });
  return (
    <PinchGestureHandler onGestureEvent={pinchHandle}>
      <Animated.View style={{ flex: 1 }}>
        <AnimatedImage
          source={{ uri: image }}
          style={[{ flex: 1 }, rImageStyle]}
        />
        <Animated.View style={[styles.focalPoint, rFocalPointStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10,
  },
});
