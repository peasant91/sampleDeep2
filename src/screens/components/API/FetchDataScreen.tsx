/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { ScrollView } from "react-native";
import useFeaturedCatalogQuery from "../../../services/catalog/useFeaturedCatalogQuery";
import Typography from "../../../../tmd/components/Typography/Typography";
import { Button, Stack } from "../../../../tmd";
import Page from "../../../../tmd/components/Page";
import Toolbar from "../../../../tmd/components/Toolbar/Toolbar";

export default function FetchDataScreen() {
  const { catalogs, isLoadingCatalog, refetch, isRefetching } = useFeaturedCatalogQuery();

  return (
    <Page>
      <Toolbar title={"FetchDataScreen"} />

      <ScrollView>
        <Stack p={16}>
          {
            (isLoadingCatalog) &&
            <Typography>Loading...</Typography>
          }
          {
            catalogs &&
            <>
              {
                catalogs?.data?.map((it, index) => {
                  return <Typography key={index}>{it.name}</Typography>;
                })
              }
            </>
          }

          <Button containerStyle={{
            marginTop: 8,
          }} onPress={refetch} loading={isLoadingCatalog}>Refetch Data</Button>
        </Stack>
      </ScrollView>
    </Page>
  )
}
