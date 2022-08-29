/**
 * Created by Widiana Putra on 06/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import Page from "../../../tmd/components/Page";
import { ScrollView, View } from "react-native";
import Grid from "../../../tmd/components/Layout/Grid";
import { Stack } from "../../../tmd";
import Typography from "../../../tmd/components/Typography/Typography";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function LayoutScreen() {
  return (
    <Page>
      <Toolbar title={"LayoutScreen"} />

      <ScrollView>
        <Stack style={{ padding: 16 }}>
          <Typography type={"title2"}>GRID LAYOUT</Typography>
          <Grid cols={3} spacing={8}>
            <View style={{
              height: 100,
              backgroundColor: "green",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "red",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "blue",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "yellow",
            }}>

            </View>

          </Grid>

          <Typography type={"title2"} style={{ marginTop: 16 }}>STACK (V/H) LAYOUT</Typography>

          <Stack spacing={8}>
            <View style={{
              height: 100,
              backgroundColor: "green",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "red",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "blue",
            }}>

            </View>
            <View style={{
              height: 100,
              backgroundColor: "yellow",
            }}>

            </View>

          </Stack>
        </Stack>
      </ScrollView>
    </Page>
  );
}
