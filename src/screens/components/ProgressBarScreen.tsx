import React from "react";
import { Button, CircularProgressBar, LinearProgressBar, Page, Stack } from "../../../tmd";
import { ScrollView } from "react-native";
import { useModal } from "../../../tmd/providers/ModalProvider";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";

export default function ProgressBarScreen() {
  const { showLoadingModal, hideLoadingModal } = useModal();
  const { showLoadingBS, hideLoadingBS } = useBottomSheet();
  return (
    <Page>
      <Toolbar title={"ProgressBar"} />
      <ScrollView>
        <Stack spacing={16} p={16}>
          <CircularProgressBar size={"sm"} />
          <CircularProgressBar size={"md"} />
          <CircularProgressBar size={"lg"} />
          <LinearProgressBar indeterminate />
          <Button onPress={() => {
            showLoadingModal({
              description: "Please wait...",
              title: "Loading",
              // circularProgressProps: {
              //   size: "lg",
              // },
            });
          }}>
            Open Progress Modal
          </Button>
          <Button onPress={() => {
            showLoadingBS({
              description: "Please wait...",
              title: "Loading",
              // linearProgressProps: {
              // color: "green",
              // },
            });
          }}>
            Open Progress Bottom Sheet
          </Button>
        </Stack>
      </ScrollView>

    </Page>
  );
}
