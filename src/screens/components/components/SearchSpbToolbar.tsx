import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Button, Stack } from "../../../../tmd";
import SearchToolbar from "../../../../tmd/components/Toolbar/SearchToolbar";
import { _spbsStatus } from "../../../data/_spbs";
import { FlatList, View } from "react-native";
import { FilterModel } from "../../../models/BaseModel";
import Chip from "../../../../tmd/components/Chip";

interface Props {
    onStatusPressed?: (status: string) => void;
    onTextChange?: (text: string) => void;
    onPressSearch: (text: string) => void;
    onClear: () => void;
    initialStatus: string
}

export default function SearchSpbToolbar(
    {
        onPressSearch,
        onStatusPressed,
        onTextChange,
        onClear,
        initialStatus
    }: Props
) {
    const [status, setStatus] = useState(initialStatus)

    const StatusChip = ({ item, index }) => {
        return (
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

        if (onStatusPressed) {
            onStatusPressed(item.value)
        }
    }

    useEffect(() => {
        if (status != initialStatus) {
            setStatus(initialStatus)
        }
    }, [initialStatus])

    return (
        <Stack>
            <SearchToolbar
                searchPlaceholder={t("search_spb")}
                center
                onClearSearch={onClear}
                onPressSearch={onPressSearch}
                onTextChange={onTextChange}
                searchShape="rounded"
            >
                <FlatList
                    data={_spbsStatus}
                    keyExtractor={({ item, index }) => index}
                    horizontal
                    renderItem={StatusChip}
                    ItemSeparatorComponent={() => (
                        <View style={{ width: 8 }}></View>
                    )}
                />
            </SearchToolbar>

        </Stack>
    )
}