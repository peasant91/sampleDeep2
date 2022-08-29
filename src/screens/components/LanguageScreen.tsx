/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Typography from "../../../tmd/components/Typography/Typography";
import { ScrollView } from "react-native";
import { Button, Stack } from "../../../tmd";
import { useLocale } from "../../providers/LocaleProvider";
import Page from "../../../tmd/components/Page";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function LanguageScreen() {
  const { changeLanguage, t, currentLanguage } = useLocale();
  return (
    <Page>
      <Toolbar title={"LanguageScreen"} />

      <ScrollView>
        <Stack spacing={16} p={16}
               style={{
                 alignItems: "center",
                 justifyContent: "center",
               }}
        >
          <Typography>{t("welcome_to_rnstarterkit")}</Typography>
          <Typography>current lang: {currentLanguage}</Typography>
          <Stack spacing={8} items={"center"}>
            <Button
              onPress={() => {
                changeLanguage("en");
              }}
            >Change to English</Button>
            <Button
              onPress={() => {
                changeLanguage("id");
              }}
            >Change to Indonesia</Button>
          </Stack>
        </Stack>
      </ScrollView>
    </Page>
  );
}
