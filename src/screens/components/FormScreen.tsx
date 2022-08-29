/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, RHFDatePicker, RHFPhoneField, RHFTimePicker, Stack } from "../../../tmd";
import RHFTextField from "../../../tmd/components/RHF/RHFTextField";
import RHFSelect from "../../../tmd/components/RHF/RHFSelect";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";
import RHFImagePicker from "../../../tmd/components/RHF/RHFImagePicker";
import { useLocale } from "../../providers/LocaleProvider";
import RHFMultiImagePicker from "../../../tmd/components/RHF/RHFMultiImagePicker";
import RHFDateRangePicker from "../../../tmd/components/RHF/RHFDateRangePicker";
import RHFMapPicker from "../../../tmd/components/RHF/RHFMapPicker";
import RHFMultiSelect from "../../../tmd/components/RHF/RHFMultiSelect";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import RHFAvatarImagePicker from "../../../tmd/components/RHF/RHFAvatarImagePicker";
import RHFPriceField from "../../../tmd/components/RHF/RHFPriceField";

export default function FormScreen() {
  const { t } = useLocale();
  const schema = yup.object({
    firstName: yup.string().required().label(t("labels.first_name")),
    lastName: yup.string().required().label(t("labels.last_name")),
    countryID: yup.string().required().label(t("labels.country")),
    phoneCode: yup.string().required().label(t("labels.phone_code")),
    phone: yup.string().required().min(6).max(12).label(t("labels.phone")),
    date: yup.string().required().label(t("labels.date")),
    dateRange: yup.mixed().required().label(t("labels.date_range")),
    time: yup.string().required().label(t("labels.time")),
    image: yup.string().required().label(t("labels.image")),
    avatar: yup.string().required(),
    multiImage: yup.array().min(2).required(),
    map: yup.mixed().required(),
    multiSelect: yup.array().min(2).required(),
    price: yup.number().min(1000000).required(),
  })

  const method = useForm({
    defaultValues: {
      firstName: "Widiana",
      lastName: "",
      countryID: "",
      phoneCode: "62",
      phone: "",
      date: "",
      time: "",
      multiSelect: undefined,
      image: "",
      avatar: "",
      multiImage: undefined,
      dateRange: undefined,
      map: undefined,
      price: "1000000",
      //  map initial value
      // map: {
      //   location: {
      //     latitude: -8.655302862265442,
      //     longitude: 115.24373250416834,
      //   },
      //   fullAddress: "Jalan kenangan",
      // },
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = method;

  const onSubmit = data => {
    console.log(JSON.stringify(data, null, 2));
  };

  const onError = errors => {
    console.log(JSON.stringify(errors, null, 2));
  };

  return (
    <Page>
      <Toolbar title={"Form Screen"} />

      <ScrollView style={{
        flex: 1,
      }}>

        <FormProvider {...method}>
          <Stack
            p={16}
            spacing={16}
            style={{
              flex: 1,
            }}>
            <RHFTextField
              label={t("labels.first_name")}
              name={"firstName"}
              placeholder={t("labels.first_name")}
            />
            <RHFTextField
              label={t("labels.last_name")}
                name={"lastName"}
                placeholder={t("labels.last_name")}

              />
              <RHFSelect
                label={t("labels.country")}
                name={"countryID"}
                placeholder={t("labels.country")}
                options={_countries.map(it => {
                  const i: PickerItem = {
                    id: it.code,
                    name: it.name,
                  };
                  return i;
                })}
              />

            <RHFMultiSelect
              search
              requiredLabel
              name={"multiSelect"}
              label={"Multi Select"}
              options={_countries.map(it => {
                const i: PickerItem = {
                  id: it.code,
                  name: it.name,
                };
                return i;
              })}
            />

            <RHFPhoneField
              name={"phone"}
              phoneCodeName={"phoneCode"}
              label={t("labels.phone")}
              placeholder={"Enter your phone"}
            />

            <RHFDatePicker
              name={"date"}
              label={t("labels.date")}
              placeholder={t("labels.date")}
            />

            <RHFDateRangePicker
              name={"dateRange"}
              minDate={"2022-06-01"}
              maxDate={"2022-08-05"}
              minDays={7}
              maxDays={30}
              label={"Date Range Picker"}
              placeholder={"Pick date range"}
            />
            <RHFTimePicker
              name={"time"}
              label={t("labels.time")}
              placeholder={t("labels.time")}
            />
            <RHFImagePicker
              description={"Pastikan foto KTP terlihat jelas dan dapat dibaca"}
              buttonProps={{
                icon: {
                  icon: "camera",
                },
              }}
              requiredLabel
              name={"image"}
              label={t("labels.image")} />

            <RHFMultiImagePicker
              ratio={"16:9"}
              description={"Pastikan foto KTP terlihat jelas dan dapat dibaca"}
              buttonProps={{
                icon: {
                  icon: "camera",
                },
              }}
              requiredLabel
              name={"multiImage"}
              label={"Multi Image"}
            />

            <RHFAvatarImagePicker
              name={"avatar"}

            />

            <RHFMapPicker
              label={t("labels.map")}
              requiredLabel
              placeholder={t("labels.map")}
              name={"map"} />

            <RHFPriceField
              prefixText={"Rp"}
              name={"price"}
              placeholder={t("labels.price")}
              label={t("labels.price")} />

            <Button
              containerStyle={{
                marginTop: 16,
              }}
              fullWidth
              onPress={handleSubmit(onSubmit, onError)}
            >Submit Form</Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
