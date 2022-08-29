/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Typography from "../../../../tmd/components/Typography/Typography";
import { CatalogItem } from "../../../models/catalog/Catalog";
import { View } from "react-native";
import useCatalogInfiniteQuery from "../../../services/catalog/useCatalogInfiniteQuery";
import Page from "../../../../tmd/components/Page";
import GridList from "../../../../tmd/components/FlatList/GridList";
import { Surface } from "../../../../tmd";
import Toolbar from "../../../../tmd/components/Toolbar/Toolbar";

export default function PaginationScreen() {
  const {
    catalogs,
    isLoadingCatalog,
    isFetchingNextPage,
    fetchNext,
    refresh,
    isRefreshing,

  } = useCatalogInfiniteQuery();

  const renderItem = (item: CatalogItem, index: number) => {
    return <Surface
      elevation={4}
      style={{
        padding: 16,
        flex: 1,
        borderRadius: 8,
      }}>
      <Typography>{item?.name}</Typography>
    </Surface>;
  };

  return (
    <Page>
      <Toolbar title={"PaginationScreen"} />

      <View style={{
        flex: 1,
      }}>
        {
          isLoadingCatalog &&
          <Typography>Loading...</Typography>
        }
        {
          <View style={{ flexDirection: "column", flex: 1 }}>
            <GridList
              padding={16}
              onRefresh={refresh}
              refreshing={isRefreshing}
              spacing={16}
              cols={3}
              style={{
                flexGrow: 1,
              }}
              onEndReached={fetchNext}
              data={catalogs}
              keyExtractor={(item, number) => item?.id}
              renderItem={({ item, index }) => renderItem(item, index)}
              ListEmptyComponent={() => {
                if (!isLoadingCatalog) {
                  return <Typography>empty</Typography>;
                } else {
                  return <></>;
                }
              }}
            />
            {
              isFetchingNextPage &&
              <Typography style={{
                padding: 16,
              }}>Fetching next page...</Typography>
            }
          </View>
        }
      </View>
    </Page>
  );
}
