/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native";
import * as yup from "yup";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button, RHFPhoneField, RHFTextField } from "../../../tmd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../providers/AuthProvider";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import RHFSignatureCanvas from "../../../tmd/components/RHF/RHFSignatureCanvas";
import Typography from "../../../tmd/components/Typography/Typography";
import { useTranslation } from "react-i18next";
import { flatMap, head } from "lodash";
import Color from "color";
import { transparent } from "../../../tmd/styles/colors";
import { useDispatch } from "react-redux";
import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { getStatusBarHeight } from "react-native-iphone-x-helper";


export default function LoginScreen() {
  const { t } = useTranslation()
  const { login, isLoadingLogin } = useAuth();
  const dispatch = useDispatch();
  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required().min(8),
  }).required();
  const { showErrorBS } = useBottomSheet()

  const defaultValues = {
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(JSON.stringify(data, null, 2));
    try {
      await login(data?.username, data?.password);
    } catch (e) {
      console.log("ANJENG", e)
      showErrorBS(e)
    }
  };

  const [scrollable, setScrollable] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          scrollEnabled={scrollable}
          style={{
            flex: 1,
          }}>
          <View style={{
            top: 0,
            left: 0,
            right: 0
          }}>
            <Image
              style={{ width: "100%" }}
              source={require("../../assets/icons/ic_header/header.png")} />
          </View>

          <FormProvider {...method}>
            <Stack p={16} spacing={16} style={{
              flex: 1,
            }}>

              <Stack spacing={8} style={{ flex: 1 }}>
                <Typography type={"title1"}>{t("welcome_title")}</Typography>
                <Typography type={"body1"}>{t("welcome_desc")}</Typography>
              </Stack>
              <View>
                <RHFTextField
                  requiredLabel
                  mode={"contained"}
                  isRequired={true}
                  name={"username"}
                  placeholder={t('placeholder.username')}
                  label={t('labels.username')}
                />
              </View>

              <View>
                <RHFTextField
                  requiredLabel
                  name={"password"}
                  label={"Password"}
                  mode={"contained"}
                  placeholder={t('placeholder.password')}
                  password
                />
              </View>

              <Button
                loading={isLoadingLogin}
                onPress={method.handleSubmit(onSubmit, (e) => {
                  console.log(e);
                })}
                style={{
                  marginTop: 24,
                }}
                fullWidth
              >Login</Button>

            </Stack>
          </FormProvider>
        </ScrollView>

      </KeyboardAvoidingView>
    </View>
  );
}
