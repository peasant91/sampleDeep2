import React, { useEffect, useRef } from "react";
import { useStepper } from "../../providers/StepperProvider";
import { Animated } from "react-native";

interface Props {
  stepperId: number;
  children: React.ReactNode;
}

export default function Step({ stepperId, children }: Props) {
  const { currentItem } = useStepper();
  const opacityAnimatedValue = useRef(new Animated.Value(0)).current;
  const isSelected = stepperId == currentItem?.id;
  useEffect(() => {
    if (isSelected) {
      Animated.timing(opacityAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      opacityAnimatedValue.setValue(0);
    }
  }, [currentItem]);

  return (
    <>
      {
        isSelected &&
        <Animated.View style={{
          opacity: opacityAnimatedValue,
          flex: 1,
        }}>
          {children}
        </Animated.View>
      }
    </>
  );
}
