import React, { ComponentProps } from "react";
import { Modal, Pressable, SafeAreaView } from "react-native";
import { CircularProgressBar, Stack, useTheme } from "../../index";
import Color from "color";
import Portal from "../Portal/Portal";
import Typography from "../Typography/Typography";

interface ProgressModalProps {
  open: boolean;
  onClose: () => void;
  dismissible?: boolean;
  description?: string;
  title?: string;
  circularProgressProps?: ComponentProps<typeof CircularProgressBar>;
}

export default function ProgressModal({
                                        open,
                                        onClose,
                                        dismissible = true,
                                        description,
                                        title,
                                        circularProgressProps,
                                      }: ProgressModalProps) {
  const { colors } = useTheme();
  return (
    <Portal>
      <Modal visible={open} transparent={true} animationType={"fade"}
             onRequestClose={dismissible ? onClose : undefined}>
        <SafeAreaView style={{
          flex: 1,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Pressable
            onPress={dismissible ? onClose : undefined}
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              height: "100%",
              width: "100%",
              backgroundColor: Color(colors.neutral.neutral_100).alpha(0.4).rgb().string(),
            }}>

          </Pressable>
          <Stack
            pt={24}
            pb={description ? 16 : 24}
            pl={24}
            pr={24}
            spacing={8}
            items={"center"}
            content={"center"}
            style={{
              backgroundColor: "white",
              borderRadius: 8,
            }}>
            <CircularProgressBar size={"lg"} style={{
              alignSelf: "center",
            }} {...circularProgressProps} />
            {
              (title || description) &&
              <Stack items={"center"}>
                {
                  title &&
                  <Typography type={"title1"}>{title}</Typography>
                }

                {
                  description &&
                  <Typography>{description}</Typography>
                }
              </Stack>
            }
          </Stack>

        </SafeAreaView>
      </Modal>
    </Portal>
  );
}
