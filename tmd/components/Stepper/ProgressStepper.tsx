import React, { ComponentProps, useMemo } from "react";
import { useStepper } from "../../providers/StepperProvider";
import { LinearProgressBar } from "../../index";
import { View } from "react-native";


export default function ProgressStepper({ ...rest }: ComponentProps<typeof LinearProgressBar>) {
  const { currentPosition, totalItem } = useStepper();
  const progress = useMemo(() => {
    return (currentPosition + 1) / totalItem;
  }, [currentPosition, totalItem]);
  return (
    <View style={{ width: "100%" }}>
      <LinearProgressBar indeterminate={false} progress={progress} shape={"rect"} {...rest} />
    </View>
  );
}
