/**
 * Created by Widiana Putra on 20/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef } from "react";
import { Button, Stack, RHFTextField } from "../../index";
import { Modalize } from "react-native-modalize";
import Portal from "../Portal/Portal";
import { SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { useTheme } from "../../core/theming";
import { useTranslation } from "react-i18next";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export interface BSProps {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondary?: boolean;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: (text?: string) => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissible?: boolean;
  withNotes?: boolean
  noteIsRequired?: boolean
}

export default function AlertBottomSheet({ dismissible = true, ...props }: BSProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.open) {
      method.clearErrors()
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.open]);

  const schema = yup.object({
    note: (props.noteIsRequired) ? yup.string().required().label(t("note")) : yup.string().optional(),
  }).required()

  const method = useForm({
    defaultValues: {
      note: ""
    }, resolver: yupResolver(schema)
  })

  const { handleSubmit, watch } = method;

  // useEffect(() => {
  //     const subscription = method.watch((value, { name, type }) => console.log(JSON.stringify(value, null, 2)))
  //     return () => subscription.unsubscribe();
  // }, [watch])

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    if (props.buttonPrimaryAction) {
      props.buttonPrimaryAction(data.note)
    }
  };

  const onError = (errors: any) => {
    console.log(JSON.stringify(errors, null, 2));
  };


  const handleClose = () => {
    modalizeRef?.current?.close();
    props.onClose();
  };

  const handleOpen = () => {
    modalizeRef?.current?.open();
  };

  const theme = useTheme();
  return (
    <Portal>
      <Modalize
        handlePosition={"inside"}
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        onClose={props.onClose}
        closeOnOverlayTap={dismissible}
        withHandle={dismissible}
        adjustToContentHeight
        onBackButtonPress={dismissible == false
          ? () => {
            return true;
          }
          : undefined}
        tapGestureEnabled={dismissible}
        panGestureEnabled={dismissible}
        ref={modalizeRef}
      >
        <SafeAreaView style={{ flex: 1 }}>

          <FormProvider {...method}>
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
              {
                props.withNotes &&
                <RHFTextField
                  mode="contained"
                  counter={true}
                  maxLength={140}
                  numberOfLines={3}
                  requiredLabel={props.noteIsRequired}
                  label={t("note")}
                  placeholder={t("note_placeholder")}
                  name={"note"}
                />
              }
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
                    if (props.withNotes) {
                      handleSubmit(onSubmit, onError)()
                    } else if (props.buttonPrimaryAction) {
                      props.buttonPrimaryAction();
                    } else {
                      handleClose();
                    }
                  }}
                >{props.buttonPrimaryTitle ?? t("back")}</Button>
              </Stack>
            </View>
          </FormProvider>
        </SafeAreaView>

      </Modalize>
    </Portal>
  );
}
