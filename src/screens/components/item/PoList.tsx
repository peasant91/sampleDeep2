import React from "react"
import { FlatList, Image, StyleProp, View, ViewStyle } from "react-native"
import { Button, Divider, Icon, Stack, Tag } from "../../../../tmd"
import Typography from "../../../../tmd/components/Typography/Typography"
import { colors } from "../../../../tmd/styles/colors"
import { SpbItem, SpbListItem } from "../../../models/spb/spb"
import IcPipe from '../../../assets/icons/pipe.svg'
import IcPO from '../../../assets/icons/ic_po.svg'
import IcProject from '../../../assets/illusts/icon_project.svg'
import { useTranslation } from "react-i18next"
import { t } from "i18next"
import { POItem, POList, StatusPO } from "../../../models/spb/po"
import moment from "moment"
import { momentWita } from "../../../utils/Helper"

type StatusType = {
    status: string;
    style?: StyleProp<ViewStyle>;
}

const Item = ({ item, index }: { item: POItem, index: number }) => {
    const _item: POItem = item;
    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography type="body3">{item.name}</Typography>
            <Typography type="body3">x{item.quantity} {item.unit}</Typography>
        </View>
    )
}

const CustomItem = ({ items }: { items: POItem[] }) => {
    var qty = items.reduce((a, item) => { return a + item.quantity }, 0)
    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography type="body3">{items.length} Bahan Lainnya</Typography>
            <Typography type="body3">x{qty}</Typography>
        </View>
    )
}

export function StatusButton({ status, style }: StatusType) {
    const { t } = useTranslation()

    return (
        <View style={style}>
            {status == StatusPO.waiting &&
                <Tag variant="warning" text={t("waiting_confirmation")} />
            }
            {status == StatusPO.complaint &&
                <Tag variant="warning" text={t("complaint")} />
            }
            {status == StatusPO.approved &&
                <Tag variant="success" text={t("approved")} />
            }
            {status == StatusPO.rejected &&
                <Tag variant="danger" text={t("rejected")} />
            }
            {status == StatusPO.cancel &&
                <Tag variant="danger" text={t("cancel")} />
            }
            {status == StatusPO.received &&
                <Tag variant="primary" text={t("received")} />
            }
        </View>
    )

}

type Usage = "PO" | "SPB";

interface Props {
    item: POList,
    index: number,
    type?: Usage,
    onPress?: () => void
    withProjectName?: boolean
}

const POListItem = ({ item, index, type, onPress, withProjectName }: Props) => {
    return (
        <Stack style={{ borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40, backgroundColor: colors.neutral.neutral_10 }}>
            <View style={{ paddingVertical: 12, paddingHorizontal: 12, flexDirection: "row", justifyContent: 'space-between', flexWrap: 'nowrap' }}>
                <Stack spacing={8} style={{ flexShrink: 1 }} direction="row">
                    <View style={{ alignSelf: 'center' }}>
                        <IcPO />
                    </View>
                    <Stack spacing={4} style={{ justifyContent: 'space-between', flexShrink: 1 }}>
                        <Typography type={"title3"} numberOfLines={2}>{item.no_po}</Typography>
                        <Typography type={"body4"}>{momentWita(item.created_at).format("DD MMM YYYY HH:mm")}</Typography>
                    </Stack>
                </Stack>

                <StatusButton status={item.po_status} style={{ alignSelf: 'center', flexShrink: 0, marginLeft: 8 }} />
            </View>

            <Divider />

            <FlatList
                scrollEnabled={false}
                style={{ paddingHorizontal: 12, paddingVertical: 12 }}
                // data={item.items}
                data={(item.items.length > 3) ? item.items.slice(0, 3) : item.items}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 8 }} />
                    )
                }}
                // renderItem={Item}
                renderItem={(_item) => {
                    return (
                        (item.items.length == 3 || _item.index < 2) ?
                            <Item
                                item={_item.item}
                                index={_item.index}
                            />
                            :
                            <CustomItem
                                items={item.items.slice(2, item.items.length)}
                            />
                    )

                }}
            />

            <Divider />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 12 }}>
                <Stack spacing={4}>
                    <Typography type="body3">{t("total")}</Typography>
                    <Typography type="label2">x{item.total} {t("bahan")}</Typography>
                </Stack>

                <Button
                    style={{ alignSelf: 'center' }}
                    variant="secondary"
                    shape="rounded"
                    onPress={onPress}
                    size="sm">
                    {t("see_detail")}
                </Button>
            </View>

        </Stack>
    )
}

export default POListItem