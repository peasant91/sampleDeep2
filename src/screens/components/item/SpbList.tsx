import React from "react"
import { FlatList, Image, StyleProp, View, ViewStyle } from "react-native"
import { Button, Divider, Stack, Tag } from "../../../../tmd"
import Typography from "../../../../tmd/components/Typography/Typography"
import { colors } from "../../../../tmd/styles/colors"
import { SpbItem, SpbListItem } from "../../../models/spb/spb"
import IcPipe from '../../../assets/icons/pipe.svg'
import IcPO from '../../../assets/icons/ic_po.svg'
import { useTranslation } from "react-i18next"
import { t } from "i18next"

export enum StatusSPB {
    inProgress = "in_progress",
    waiting = "waiting_confirmation",
    approved = "approved",
    rejected = "rejected",
    ongoing = "ongoing",
    done = "done"
}

type StatusType = {
    status: string;
    style?: StyleProp<ViewStyle>;
}

const Item = ({ item, index }: { item: SpbItem, index: number }) => {
    const _item: SpbItem = item;
    return (
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
            <Typography type="body3">{item.name}</Typography>
            <Typography type="body3">x{item.quantity} {item.unit}</Typography>
        </View>
    )
}

export function StatusButton({ status, style }: StatusType) {
    const { t } = useTranslation()

    return (
        <View style={style}>
            {status == StatusSPB.waiting &&
                <Tag variant="warning" text={t("waiting_confirmation")} />
            }
            {status == StatusSPB.inProgress &&
                <Tag variant="primary" text={t("in_progress")} />
            }
            {status == StatusSPB.approved &&
                <Tag variant="success" text={t("approved")} />
            }
            {status == StatusSPB.rejected &&
                <Tag variant="danger" text={t("rejected")} />
            }
            {status == StatusSPB.ongoing &&
                <Tag variant="primary" text={t("ongoing")} />
            }
            {status == StatusSPB.done &&
                <Tag variant="success" text={t("success")} />
            }
        </View>
    )

}

type Usage = "PO" | "SPB";

interface Props {
    item: SpbListItem,
    index: number,
    type?: Usage,
    onPress?: () => void
}

const SpbList = ({ item, index, type, onPress }: Props) => {
    const getIcon = () => {
        if (type == "PO") {
            return (
                <IcPO />
            )
        } else {
            return (
                <IcPipe />
            )
        }
    }

    return (
        <Stack style={{ borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40, backgroundColor: colors.neutral.neutral_10 }}>

            <View style={{ paddingVertical: 12, paddingHorizontal: 12, flexDirection: "row", justifyContent: 'space-between' }}>
                <Stack spacing={8} direction="row">
                    <View style={{alignSelf: 'center'}}>
                        { getIcon() }
                    </View>
                    {/* {type == "PO" &&
                        <IcPipe style={{ alignSelf: 'center' }} />
                    }
                    <IcPipe style={{ alignSelf: 'center' }} /> */}
                    <Stack spacing={4} style={{ justifyContent: 'space-between' }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{item.no_spb}</Typography>
                        <Typography type={"body4"}>{item.created_at}</Typography>
                    </Stack>
                </Stack>

                <StatusButton status={item.spb_status} style={{ alignSelf: 'center' }} />
            </View>

            <Divider />

            <FlatList
                scrollEnabled={false}
                style={{ paddingHorizontal: 12, paddingVertical: 12 }}
                data={item.items}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 8 }} />
                    )
                }}
                renderItem={Item}
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

export default SpbList