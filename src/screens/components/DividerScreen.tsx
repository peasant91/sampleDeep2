import React from "react";
import { ScrollView } from "react-native";
import { Divider, Page, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function DividerScreen() {
  return (
    <Page>
      <Toolbar title={"DividerScreen"} />
      <ScrollView>
        <Stack p={16} spacing={16}>
          <Divider />
          <Divider size={"sm"} />
          <Divider size={"md"} />
          <Divider size={"lg"} />
          <Divider variant={"dotted"} />
          <Divider size={"md"} variant={"dotted"} />
          <Divider size={"sm"} variant={"dotted"} />
        </Stack>
      </ScrollView>
    </Page>
  );
}
