import React from "react";
import { Page, Skeleton, Stack } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function SkeletonScreen() {
  return (
    <Page>
      <Toolbar title={"Skeleton Screen"} />

      <Stack p={16} spacing={16}>
        <Skeleton />

        <Skeleton width={50} circle />

        <Skeleton animation={"wave"} />

        <Skeleton height={40} />
      </Stack>
    </Page>
  );
}
