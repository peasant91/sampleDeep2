import React from "react";
import { Badge, Page, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { ScrollView } from "react-native";
import Ribbon from "../../../tmd/components/Badge/Ribbon";

export default function BadgeScreen() {
  return (
    <Page>
      <Toolbar title={"BadgeScreen"} />
      <ScrollView style={{ flex: 1 }}>
        <Stack p={16} spacing={16}>
          <Badge label={"99+"} size={"sm"} variant={"danger"} />
          <Badge label={"99+"} size={"md"} variant={"danger"} />
          <Badge label={"99+"} size={"lg"} variant={"success"} />
          <Badge label={"99+"} size={"md"} variant={"primary"} />
          <Badge label={"99+"} size={"lg"} shape={"rect"} variant={"info"} />
          <Badge label={"99+"} size={"sm"} variant={"warning"} />
          <Badge variant={"danger"} type={"alert"} size={"sm"} />
          <Ribbon label={"Diskon sm"} icon={{ icon: "checkmark-circle" }} size={"sm"} />
          <Ribbon label={"Diskon md"} icon={{ icon: "checkmark-circle" }} variant={"success"} size={"md"} />
          <Ribbon label={"Diskon lg"} variant={"warning"} size={"lg"} icon={{ icon: "checkmark-circle" }} />
          <Ribbon label={"Diskon"} variant={"info"} mirror />
          <Ribbon label={"Discount 20% OFF"} customGradient={["green", "blue"]} />
        </Stack>
      </ScrollView>
    </Page>
  );
}
