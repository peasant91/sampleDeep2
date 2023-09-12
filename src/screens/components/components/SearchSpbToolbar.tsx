import React, { useState } from "react";
import { t } from "i18next";
import { Button, Stack } from "../../../../tmd";
import SearchToolbar from "../../../../tmd/components/Toolbar/SearchToolbar";
import { _spbsStatus } from "../../../data/_spbs";
import { FlatList } from "react-native";
import { FilterModel } from "../../../models/BaseModel";
import Chip from "../../../../tmd/components/Chip";

export default function SearchSpbToolbar() {
    const [status, setStatus] = useState(_spbsStatus[0].value)

    const StatusChip = ({ item, index }) => {
        return (
            // <Button
            //     style={{ alignSelf: 'center' }}
            //     variant={status == item.value ? "primary" : "secondary"}
            //     shape="rounded"
            //     onPress={() => onPressFilter(item)}
            //     size="sm">
            //     {item.name}
            // </Button>
            <Chip
                shape="rounded"
                variant="outlined"
                text={item.name}
                type="filter"
                initial={status}
                selected={item.value == status}
                onPress={() => onPressFilter(item)}
            />
        )
    }

    const onPressFilter = (item: FilterModel) => {
        setStatus(item.value)
    }

    return (
        <Stack>
            <SearchToolbar
                searchPlaceholder={t("search_spb")}
                searchStyle={{
                    shape: 'rounded'
                }}
                center
            >
                <FlatList
                    data={_spbsStatus}
                    keyExtractor={({ item, index }) => index}
                    horizontal
                    renderItem={StatusChip}
                />
            </SearchToolbar>

        </Stack>
    )
}