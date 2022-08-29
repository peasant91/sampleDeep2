import React, { useState } from "react";
import { Button, Page, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { ScrollView, View } from "react-native";
import Tooltip from "../../../tmd/components/Tooltip/Tooltip";
import { navigate } from "../../navigations/RootNavigation";

export default function TooltipScreen() {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isShowTopTooltip, setIsShowTopTooltip] = useState(false);

  return (
    <Page>
      <Toolbar title={"Tooltip Screen"} />
      <ScrollView style={{ flex: 1 }}>
        <Stack p={16} direction={"column"} spacing={16}>
          <Tooltip
            position={"bottom"}
            open={isOpenPopover}
            onClose={() => {
              setIsOpenPopover(false);
            }}
            title={"Bottom Tooltip"}
            description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut interdum ligula lobortis, molestie nisi ut, hendrerit ipsum. Sed vulputate dapibus auctor. Mauris euismod, enim nec egestas semper, turpis sapien condimentum elit, in suscipit sapien dolor vel magna. Aliquam erat volutpat. In suscipit vehicula odio at hendrerit. Fusce id condimentum sapien."}
          >
            <>
              <Button
                onPress={() => {
                  setIsOpenPopover(true);
                }}>Bottom Tooltip</Button>
            </>
          </Tooltip>

          <View style={{ marginTop: 16 }}>
            <Tooltip
              position={"top"}
              open={isShowTopTooltip}
              onClose={() => {
                setIsShowTopTooltip(false);
              }}
              title={"Top Tooltip"}
              description={"Lorem ipsum dolor sit "}
            >
              <Stack spacing={8}>
                <Button
                  onPress={() => {
                    setIsShowTopTooltip(true);
                  }} style={{
                  width: "100%",
                }}>Top Tooltip</Button>
              </Stack>
            </Tooltip>
          </View>

          <Button
            onPress={() => {
              navigate("TooltipStepperScreen");
            }}
          >Stepper Tooltips</Button>
        </Stack>
      </ScrollView>
    </Page>
  );
}
