/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView, View } from "react-native";
import { Tag } from "../../../tmd";
import Page from "../../../tmd/components/Page";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function TagScreen() {
  return (
    <Page>
      <Toolbar title={"TagScreen"} />
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            padding: 16,
            flexDirection: "column",
          }}>
          <Tag
            style={{ marginTop: 8 }}
            text={"Tag Primary"}
            variant={"primary"}
          />
          <Tag
            style={{ marginTop: 8 }}
            text={"Tag Success"} variant={"success"} shape={"rect"} />
          <Tag
            style={{ marginTop: 8 }}
            text={"Tag Warning"} variant={"warning"} />
          <Tag
            style={{ marginTop: 8 }}
            text={"Tag Danger"} variant={"danger"} />
          <Tag
            style={{ marginTop: 8 }}
            text={"Tag Info"} variant={"info"}
          />

          <Tag
            style={{ marginTop: 8 }}
            size={"lg"}
            text={"Tag LG"} variant={"info"}
          />

          <Tag
            style={{ marginTop: 8 }}
            size={"md"}
            text={"Tag MD"} variant={"info"}
          />

          <Tag
            style={{ marginTop: 8 }}
            size={"sm"}
            text={"Tag SM"} variant={"info"}
          />

        </View>
      </ScrollView>
    </Page>
  );
}
