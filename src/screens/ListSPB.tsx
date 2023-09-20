/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useCallback, useRef, useState } from "react";
import Typography from "../../tmd/components/Typography/Typography";
import { CatalogItem } from "../models/catalog/Catalog";
import { FlatList, StatusBar, View } from "react-native";
import useCatalogInfiniteQuery from "../services/catalog/useCatalogInfiniteQuery";
import Page from "../../tmd/components/Page";
import GridList from "../../tmd/components/FlatList/GridList";
import { Stack, Surface } from "../../tmd";
import Toolbar from "../../tmd/components/Toolbar/Toolbar";
import { _spbMock } from "../../tmd/data/_mock";
import SpbList, { StatusSPB } from "./components/item/SpbList";
import { useTranslation } from "react-i18next";
import { navigate } from "../navigations/RootNavigation";
import useProjectInfiniteQuery from "../services/project/useProjectQuery";
import { SPBListShimmer } from "./components/shimmer/shimmer";
import { EmptySPBFilterState, EmptySPBState } from "./components/EmptyState";
import { SpbListItem } from "../models/spb/spb";
import { useFocusEffect } from "@react-navigation/native";
import SearchToolbar from "../../tmd/components/Toolbar/SearchToolbar";
import SearchSpbToolbar from "./components/components/SearchSpbToolbar";
import { _spbsStatus } from "../data/_spbs";

export default function ListSPB() {
    const {
        spbLists,
        isLoadingCatalog,
        isFetchingNextPage,
        fetchNext,
        refresh,
        isRefreshing,
        isRefetching,
        setQuery,
        setStatus,
        doResetFilter
    } = useProjectInfiniteQuery({ status: "" });

    const { t } = useTranslation()
    const queryKey = useRef("")
    const statusKey = useRef(_spbsStatus[0].value)
    const [search, setSearch] = useState("")

    const resetFilter = () => {
        queryKey.current = ""
        statusKey.current = ""
        setSearch("")

        doResetFilter()
    }

    useFocusEffect(
        useCallback(() => {
            refresh()
        }, [])
    )

    const SpbEmpty = () => {
        if (!isLoadingCatalog) {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    {
                        (queryKey.current != "" || statusKey.current != "")
                            ? <EmptySPBFilterState
                                onReset={resetFilter}
                                hasSearch={queryKey.current != ""}
                            />
                            : <EmptySPBState />
                    }
                </View>)
        } else {
            return <></>;
        }
    }

    return (
        <Page>
            <SearchSpbToolbar
                initialStatus={statusKey.current}
                value={search}
                onPressSearch={(text: string) => {
                    queryKey.current = text
                    setQuery(queryKey.current)
                }}
                onTextChange={(text)=>{
                    setSearch(text)
                }}
                onClear={() => {
                    queryKey.current = ""
                    setQuery(queryKey.current)
                }}
                onStatusPressed={(status: string) => {
                    statusKey.current = status
                    setStatus(statusKey.current)
                }}
            />

            <View style={{
                flex: 1,
            }}>
                {
                    (isRefreshing) ?
                        (
                            <Stack
                                spacing={16}
                                direction="column"
                                style={{
                                    padding: 16
                                }}
                            >
                                <SPBListShimmer />
                                <View style={{ height: 16 }} />
                                <SPBListShimmer />
                                <View style={{ height: 16 }} />
                                <SPBListShimmer />
                            </Stack>
                        ) :
                        (
                            <View style={{ flex: 1, padding: 16 }}>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
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
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    ListEmptyComponent={SpbEmpty}
                                />
                            </View>
                        )
                }
                {
                    isFetchingNextPage &&
                    <Typography style={{
                        padding: 16,
                    }}>Fetching next page...</Typography>
                }
            </View>
        </Page>
    );
}