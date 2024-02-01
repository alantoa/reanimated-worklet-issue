import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import React from "react";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

function Press({ scaleTo = 1.05, children }) {
  const value = useSharedValue(1);
  // const controller = {
  //   animateTo: (nextState) => {
  //     "worklet";
  //     value.value = nextState;
  //   },
  // };
  const controller = {
    animateTo(nextState) {
      "worklet";
      value.value = nextState;
    },
  };
  const styles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: value.value }],
    };
  }, []);

  return (
    <GestureDetector
      gesture={Gesture.Tap()
        .onBegin(() => {
          controller.animateTo(scaleTo);
        })
        .onFinalize(() => {
          controller.animateTo(1);
        })}
    >
      <Animated.View style={styles}>{children}</Animated.View>
    </GestureDetector>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Press scaleTo={0.85}>
          <View style={{ backgroundColor: "red" }}>
            <Text>Touch me!</Text>
          </View>
        </Press>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
