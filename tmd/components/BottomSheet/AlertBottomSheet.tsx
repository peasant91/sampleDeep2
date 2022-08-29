/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { useTheme } from "../../core/theming";
import { Button, Stack } from "../../index";
import { useTranslation } from "react-i18next";

export interface BSProps {
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
}

export default function AlertBottomSheet({ dismissible = true, ...props }: BSProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (props.open) {
      modalizeRef?.current?.open();
    } else {
      modalizeRef.current?.close();
    }
  }, [props.open]);

  const handleClose = () => {
    modalizeRef?.current?.close();
    // props.onClose();
  };

  const theme = useTheme();
  return (
    <Portal>
      <Modalize
        closeOnOverlayTap={dismissible ? dismissible : true}
        handlePosition={"inside"}
        withHandle={dismissible}
        adjustToContentHeight
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}

        onClose={dismissible ? props.onClose : undefined}
        ref={modalizeRef}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <View style={{
            flexDirection: "column",
            paddingVertical: 16,
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
              spacing={16}
              direction={"row"}
              style={{
                marginTop: 18,
              }}>
              {
                props.buttonSecondary &&
                <View style={{ flex: 1 }}>
                  <Button
                    fullWidth
                    variant={"secondary"}
                    onPress={() => {
                      if (props.buttonSecondaryAction) {
                        props.buttonSecondaryAction();
                      } else {
                        handleClose();
                      }
                    }}
                  >{props.buttonSecondaryTitle ?? t("cancel")}</Button>
                </View>
              }
              <Button
                fullWidth
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
        </SafeAreaView>

      </Modalize>
    </Portal>
  );
}
