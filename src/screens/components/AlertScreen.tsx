/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { Alert } from "../../../tmd";
import Page from "../../../tmd/components/Page";
import Stack from "../../../tmd/components/Layout/Stack";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function AlertScreen() {
  return (
    <Page>
      <Toolbar title={"AlertScreen"} />

    <ScrollView style={{ flex: 1 }}>
      <Stack p={16} spacing={16}>
        <Alert
          dismissible={true}
          title={"Alert Title Here"}
          description={"Put your alert text here "} />

        <Alert
          type={"outlined"}
          title={"Alert Title Here"}
          description={"Put your alert text here "} />

        <Alert
          type={"filled"}
          title={"Alert Title Here"}
          description={"Put your alert text here "} />

        <Alert
          variant={"success"}
          title={"Alert Title Here"}
          description={"Put your alert text here "} />
        <Alert
          variant={"danger"}
          description={"Put your alert text here "} />
        <Alert
          variant={"warning"}
          title={"Alert Title Here"}
          description={"Put your alert text here "} />

        <Alert
          variant={"warning"}
          type={"outlined"}
          title={"Alert Title Here"}
          description={"Put your alert text here"} />
        <Alert
          variant={"warning"}
          type={"outlined"}
          dismissible
          description={"Put your alert text here"} />

      </Stack>
    </ScrollView>
    </Page>
  );
}
