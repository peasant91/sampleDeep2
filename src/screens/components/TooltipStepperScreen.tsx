import React from "react";
import { Button, Page, Stack, Tag } from "../../../tmd";
import { ScrollView, View } from "react-native";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { TooltipStepperItem } from "../../../tmd/model/TooltipStepper";
import TooltipStepperProvider from "../../../tmd/providers/TooltipStepperProvider";
import TooltipStepper from "../../../tmd/components/Tooltip/TooltipStepper";

export default function TooltipStepperScreen() {
  const stepper: TooltipStepperItem[] = [
    {
      position: 1,
      id: "1",
    },
    {
      position: 2,
      id: "2",
    },
    {
      position: 3,
      id: "3",
    },
  ];

  return (
    <Page>
      <TooltipStepperProvider steppers={stepper} initialPosition={1}>
        <ScrollView>
          <Toolbar title={"Tooltip Stepper"} />
          <Stack spacing={16} direction={"column"} p={16}>
            <TooltipStepper
              dark={false}
              stepperId={"1"}
              position={"bottom"}
              title={"First Tooltip"}
              description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum ligula lobortis, molestie nisi ut, hendrerit ipsum. Sed vulputate dapibus auctor. Mauris euismod, enim nec egestas semper, turpis sapien condimentum elit, in suscipit sapien dolor vel magna. Aliquam erat volutpat. In suscipit vehicula odio at hendrerit. Fusce id condimentum sapien."}
            >
              <>
                <Button
                  onPress={() => {
                  }}>First Tooltip</Button>
              </>
            </TooltipStepper>

            <View style={{ marginTop: 16 }}>
              <TooltipStepper
                dark={false}
                stepperId={"2"}
                position={"bottom"}
                title={"Second Tooltip"}
                description={"Lorem ipsum dolor sit"}
              >
                <Stack spacing={8}>
                  <Button onPress={() => {
                  }} style={{
                    width: "100%",
                  }}>Second Tooltip</Button>
                </Stack>
              </TooltipStepper>
            </View>

            <View style={{ marginTop: 16 }}>
              <TooltipStepper
                dark={false}
                stepperId={"3"}
                position={"bottom"}
                title={"Third Tooltip"}
                description={"Lorem ipsum dolor sit"}
              >
                <Stack spacing={8}>
                  <Tag text={"Third Tooltip"} size={"lg"} variant={"success"} />
                </Stack>
              </TooltipStepper>
            </View>

          </Stack>
        </ScrollView>
      </TooltipStepperProvider>
    </Page>
  );
}
