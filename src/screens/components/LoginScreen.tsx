/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useState } from "react";
import { Image, ScrollView, StatusBar, View } from "react-native";
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


export default function LoginScreen() {
  const { t } = useTranslation()
  const { login, isLoadingLogin } = useAuth();
  const dispatch = useDispatch();
  const schema = yup.object({
    // phone_code: yup.string().required(),
    username: yup.string().required(),
    // phone: yup.string().required().min(6).max(13),
    password: yup.string().required().min(8),
    // signature: yup.string().required(),
  }).required();

  const defaultValues = {
    // phone_code: "62",
    // phone: "82146456432",
    // password: "password",
    // signature: "",
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });



  const onSubmit = async (data: any) => {
    console.log("ANJENG", data?.username)
    console.log(JSON.stringify(data, null, 2));
    // if (data.username == "pm") {
    //   dispatch({
    //     type: "LOGINPM",
    //     payload: {
          // user: res.data.user_data,
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: "LOGINADMIN",
    //     payload: {
          // user: res.data.user_data,
    //     },
    //   });
    // }
    await login(data?.username, data?.password);
  };

  // const watchSignature = useWatch({
  //   control: method.control,
  //   name: "signature",
  // });

  const [scrollable, setScrollable] = useState(true);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        translucent={true}
        backgroundColor={transparent}
      />
      <ScrollView
        scrollEnabled={scrollable}
        style={{
          flex: 1,
        }}>
        <View style={{
          // marginTop: -(StatusBar.currentHeight || 0),
          // zIndex: 1000,
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


            {/* <View>
              <RHFSignatureCanvas
                onProgress={(isOnProgress) => {
                  setScrollable(!isOnProgress);
                }}
                name={"signature"}
                label={"Signature"}
                canvasStyle={{
                  height: 200,
                }}
              />
            </View> */}


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

            {/* {
              (watchSignature != "") &&
              <>
                <Image
                  source={{ uri: watchSignature }}
                  style={{
                    width: 100, height: 100,
                  }} />
                <Typography>{watchSignature}</Typography>
              </>
            } */}
          </Stack>
        </FormProvider>
      </ScrollView>
    </View>
  );
}
