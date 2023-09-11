import React from "react";
import { t } from "i18next";
import { Button, Stack } from "../../../../tmd";
import SearchToolbar from "../../../../tmd/components/Toolbar/SearchToolbar";
import { _spbsStatus } from "../../../data/_spbs";
import { FlatList } from "react-native";

export default function SearchSpbToolbar() {

    const StatusChip = ({ item, index }) => {
        return (
            <Button
                style={{ alignSelf: 'center' }}
                variant="secondary"
                shape="rounded"
                onPress={onPressFilter}
                size="sm">
                {item.name}
            </Button>
        )
    }

    const onPressFilter = () => {
        console.log("pencet")
    }

    return (
        <Stack>
            <SearchToolbar
                searchPlaceholder={t("search_spb")}
                searchStyle={{
                    shape: 'rounded'
                }}
                center
            />

            <FlatList
                data={_spbsStatus}
                keyExtractor={({ item, index }) => index}
                horizontal
                renderItem={StatusChip}
            />

        </Stack>
    )
}