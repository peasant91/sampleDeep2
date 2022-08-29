/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import { Button } from "../../../../tmd";
import useCredentialService from "../../../services/credential/useCredentialService";
import { navigate } from "../../../navigations/RootNavigation";
import Page from "../../../../tmd/components/Page";
import Stack from "../../../../tmd/components/Layout/Stack";
import Toolbar from "../../../../tmd/components/Toolbar/Toolbar";

export default function APIScreen() {
  const { checkCredential, isLoadingCheckCredential } = useCredentialService();

  const handlePost = () => {
    checkCredential("082146456432", "widianaputraa@gmail.com");
  };

  return (
    <Page>
      <Toolbar title={"API Screen"} />

      <ScrollView>
        <Stack p={16} spacing={16}>
          <Button
            onPress={() => {
              navigate("FetchDataScreen");
            }}
          >
            Fetch data</Button>
          <Button
            onPress={() => {
              navigate("PaginationScreen");
            }}
          >
            Fetch Pagination</Button>
          <Button
            loading={isLoadingCheckCredential}
            onPress={handlePost}>
            POST / PATCH API
          </Button>
        </Stack>
      </ScrollView>
    </Page>
  );
}
