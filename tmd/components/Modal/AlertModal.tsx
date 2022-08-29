import React, { useEffect } from "react";
import { Portal } from "react-native-portalize";
import { Modal, Pressable, View } from "react-native";
import { useTheme } from "../../core/theming";
import { useTranslation } from "react-i18next";
import color from "color";
import { Button, Stack } from "../../index";
import Typography from "../Typography/Typography";

export interface ModalProps {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondary?: boolean;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissible?: boolean;
  buttonOrientation?: "horizontal" | "vertical";
}

export default function AlertModal({ dismissible = true, buttonOrientation = "horizontal", ...props }: ModalProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  useEffect(() => {
    if (props.open) {
      console.log(dismissible);
    }
  }, [props.open]);

  const handleClose = () => {
    props.onClose();
  };

  const isHorizontal = buttonOrientation == "horizontal";

  const theme = useTheme();
  return (
    <Portal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.open}
        onRequestClose={dismissible ? handleClose : undefined}
      >
        <View
          style={{
            padding: 32,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}>
          <Pressable
            onPress={dismissible ? handleClose : undefined}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0, left: 0, right: 0,
              backgroundColor: color(colors.neutral.neutral_100).alpha(0.5).rgb().toString(),
            }}>

          </Pressable>
          <View style={{
            margin: 32,
            backgroundColor: colors.neutral.neutral_10,
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: "100%",
          }}>
            <Stack style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
              {
                props.imageNode &&
                <View style={{ paddingBottom: 16 }}>
                  {
                    props.imageNode
                  }
                </View>
              }
              {
                props.title &&
                <Typography type={"title2"} style={{ textAlign: "center" }}>{props.title}</Typography>
              }
              {
                props.description &&
                <Typography type={"body2"} style={{
                  color: theme.colors.neutral.neutral_80, textAlign: "center",
                  marginTop: 8,

                }}>{props.description}</Typography>
              }
            </Stack>

            <Stack
              spacing={isHorizontal ? 16 : 8}
              direction={buttonOrientation == "horizontal" ? "row" : "column-reverse"}
              style={{
                marginTop: 18,
              }}>
              {
                props.buttonSecondary &&
                <Button
                  fullWidth={isHorizontal}
                  style={
                    !isHorizontal && {
                      width: "100%",
                    }
                  }
                  variant={isHorizontal ? "secondary" : "tertiary"}
                  onPress={() => {
                    if (props.buttonSecondaryAction) {
                      props.buttonSecondaryAction();
                    } else {
                      handleClose();
                    }
                  }}
                >{props.buttonSecondaryTitle ?? t("cancel")}</Button>
              }

              <Button
                fullWidth={isHorizontal}
                style={
                  !isHorizontal && {
                    width: "100%",
                  }
                }
                onPress={() => {
                  if (props.buttonPrimaryAction) {
                    props.buttonPrimaryAction();
                  } else {
                    handleClose();
                  }
                }}
              >{props.buttonPrimaryTitle ?? t("back")}</Button>
            </Stack>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
