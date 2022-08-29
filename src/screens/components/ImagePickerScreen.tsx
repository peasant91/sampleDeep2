/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Page from "../../../tmd/components/Page";
import { ScrollView } from "react-native";
import ImagePicker from "../../../tmd/components/picker/ImagePicker";
import MultiImagePicker from "../../../tmd/components/picker/MultiImagePicker";
import { Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function ImagePickerScreen() {
  return (
    <Page>
      <Toolbar title={"ImagePicker Screen"} />

      <ScrollView>
        <Stack p={16}>
          <ImagePicker
            label={"Select Image"}
            description={"Pick an image from your camera roll"}
            buttonProps={{
              icon: {
                icon: "camera",
              },
            }}
          />

          <MultiImagePicker
            style={{marginTop: 16}}
            label={"Multiple Image"}
            description={"Pick an image from your camera roll"}
            buttonProps={{
              icon: {
                icon: "camera",
              },
            }}
          />

        </Stack>
      </ScrollView>
    </Page>
  );
}
