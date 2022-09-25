/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Typography from "../../tmd/components/Typography/Typography";
import { CatalogItem } from "../models/catalog/Catalog";
import { FlatList, StatusBar, View } from "react-native";
import useCatalogInfiniteQuery from "../services/catalog/useCatalogInfiniteQuery";
import Page from "../../tmd/components/Page";
import GridList from "../../tmd/components/FlatList/GridList";
import { Surface } from "../../tmd";
import Toolbar from "../../tmd/components/Toolbar/Toolbar";
import { _spbMock } from "../../tmd/data/_mock";
import SpbList, { StatusSPB } from "./components/item/SpbList";
import { useTranslation } from "react-i18next";
import { transparent } from "../../tmd/styles/colors";
import { navigate } from "../navigations/RootNavigation";
import useProjectInfiniteQuery from "../services/project/useProjectQuery";

export default function ListSPB() {
    const {
        spbLists,
        isLoadingCatalog,
        isFetchingNextPage,
        fetchNext,
        refresh,
        isRefreshing,

    } = useProjectInfiniteQuery({search: "", status: StatusSPB.waiting});
    const { t } = useTranslation()

    return (
        <Page>
            <Toolbar title={t("list_spb")} center />

            <View style={{
                flex: 1,
            }}>
                {
                    isLoadingCatalog &&
                    <Typography>Loading...</Typography>
                }
                {
                    <View style={{ flex: 1, padding: 16 }}>
                        <FlatList
                            data={spbLists}
                            ItemSeparatorComponent={() => {
                                return <View style={{ height: 16 }} />
                            }}
                            renderItem={(item) => {
                                return (
                                    <SpbList
                                        isAdmin={false}
                                        isPM={true}
                                        item={item.item}
                                        index={item.index}
                                        onPress={() => {
                                            navigate("DetailSPB", {
                                                spbID: item.item.no_spb,
                                                isPMPage: true
                                            })
                                        }}
                                    />
                                )
                            }}
                            onRefresh={refresh}
                            refreshing={isRefreshing}
                            style={{
                                flexGrow: 1,
                            }}
                            onEndReachedThreshold={0.5}
                            onEndReached={fetchNext}
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
