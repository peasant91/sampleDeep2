import React from "react";
import { Button, Page, Stack, Toast, Toolbar, useTheme } from "../../../tmd";
import StepperProvider, { StepperContext } from "../../../tmd/providers/StepperProvider";
import { StepperItem } from "../../../tmd/model/StepperItem";
import { View } from "react-native";
import Step from "../../../tmd/components/Stepper/Step";
import Typography from "../../../tmd/components/Typography/Typography";
import ProgressStepper from "../../../tmd/components/Stepper/ProgressStepper";
import LabelStepper from "../../../tmd/components/Stepper/LabelStepper";

export default function StepperScreen() {
  const { colors } = useTheme();
  const _mockStepper: StepperItem[] = [
    {
      id: 1,
      title: "1",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      title: "2",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      title: "3",
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      title: "4",
      description: "Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <Page>
      <Toolbar title={"Stepper Screen"} elevation={0} />
      <StepperProvider steppers={_mockStepper} initialPosition={1}>
        <StepperContext.Consumer>
          {({ next, prev, isLast, isFirst }) => {
            return <>
              <Stack style={{
                flex: 1,
              }}>
                <LabelStepper orientation={"vertical"} />
                <ProgressStepper shape={'rect'}/>

                <View style={{
                  flex: 1, flexGrow: 1,
                }}>
                  <Step stepperId={1}>
                    <Typography>Step1</Typography>
                  </Step>

                  <Step stepperId={2}>
                    <Typography>Step2</Typography>
                  </Step>

                  <Step stepperId={3}>
                    <Typography>Step3</Typography>
                  </Step>

                  <Step stepperId={4}>
                    <Typography>Step4</Typography>
                  </Step>

                </View>
                <Stack direction={"row"} p={16} spacing={16} style={{ width: "100%" }}>
                  {
                    !isFirst &&
                    <Button
                      fullWidth
                      onPress={() => {
                        prev();
                      }}>Previous</Button>
                  }

                  <Button
                    fullWidth
                    onPress={() => {
                      if (isLast) {
                        Toast.show("You are on the last step");
                      } else {
                        next();
                      }
                    }}>Next</Button>
                </Stack>
              </Stack>
            </>;
          }}
        </StepperContext.Consumer>

      </StepperProvider>
    </Page>
  );
}
