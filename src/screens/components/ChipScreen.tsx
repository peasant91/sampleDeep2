/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { ScrollView } from "react-native";
import Chip from "../../../tmd/components/Chip";
import _countries from "../../../tmd/data/_countries";
import { PickerItem } from "../../../tmd/model/PickerItem";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function ChipScreen() {
  return (
    <Page>
      <Toolbar title={"Chip Screen"} />
      <ScrollView>
        <Stack p={16} spacing={8}>
          <Stack direction={'row'} spacing={8}>
            <Chip
              text={"Widiana"}
              selected
            />
            <Chip text={"Widiana"} />
            <Chip text={"Widiana"} />
          </Stack>
          <Stack direction={'row'} spacing={8}>
            <Chip text={"Widiana"} selected variant={"outlined"} />
            <Chip text={"Widiana"} variant={"outlined"} />
            <Chip text={"Widiana"} variant={"outlined"} />
          </Stack>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Stack direction={'row'} spacing={8}>
              <Chip
                shape={"rect"}
                onResetPicker={() => {
                }}
                variant={"outlined"}
                type={"picker"}
                pickerList={_countries.map(it => {
                  const i: PickerItem = {
                    id: it.code,
                    name: it.name,
                  };
                  return i;
                })}
                initial={"ID"}
                icon={{
                  icon: "camera",
                }}
                text={"Widiana"}
              />
              <Chip
                pickerList={_countries.slice(0,5).map(it => {
                  const i: PickerItem = {
                    id: it.code,
                    name: it.name,
                  };
                  return i;
                })}
                type={"picker"}
                text={"Widiana"} />
              <Chip text={"Widiana"} />
            </Stack>

          </ScrollView>
        </Stack>
      </ScrollView>
    </Page>
  )
}
