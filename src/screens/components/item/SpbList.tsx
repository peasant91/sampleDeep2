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
import moment from "moment"
import { EmptySPBState } from "../EmptyState"

export enum StatusSPB {
    inProgress = "in_progress",
    waiting = "waiting_confirmation",
    approved = "approved",
    rejected = "reject",
    ongoing = "ongoing",
    done = "done",
    cancel = "cancel",
    complaint = "complaint",
    revision = "revision",
    finish = "finish"
}

type StatusType = {
    status: string;
    style?: StyleProp<ViewStyle>;
}

type PageType = {
    isPM: boolean
    isAdmin: boolean
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
            {status == StatusSPB.complaint &&
                <Tag variant="warning" text={t("complain")} />
            }
            {status == StatusSPB.revision &&
                <Tag variant="warning" text={t("revision")} />
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
            {status == StatusSPB.finish &&
                <Tag variant="success" text={t("finish")} />
            }
            {status == StatusSPB.cancel &&
                <Tag variant="danger" text={t("cancel")} />
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
    withProjectName?: boolean
}

const SpbList = ({ item, index, type, onPress, withProjectName, isPM, isAdmin }: Props & PageType) => {
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
        <Stack style={{ borderWidth: 1, borderRadius: 16, borderColor: colors.neutral.neutral_40, backgroundColor: colors.neutral.neutral_10, marginBottom: 16 }}>
            {
                withProjectName && (
                    <>
                        <View style={{ flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 12 }}>
                            <IcProject height={40} width={40} style={{ alignSelf: 'center' }} />
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1, marginLeft: 8, marginRight: 8, flex: 1 }}>
                                <Typography type="label1" style={{ color: colors.neutral.neutral_90 }}>{item.name}</Typography>
                                <Typography type="body3" style={{ color: colors.neutral.neutral_80 }}>{item.location.address}</Typography>
                            </View>
                        </View>
                        <Divider />
                    </>
                )
            }

            <View style={{ paddingVertical: 12, paddingHorizontal: 12, flexDirection: "row", justifyContent: 'space-between' }}>
                <Stack spacing={8} style={{ flexShrink: 1 }} direction="row">
                    <View style={{ alignSelf: 'center' }}>
                        {getIcon()}
                    </View>
                    <Stack spacing={4} style={{ justifyContent: 'space-between', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{item.no_spb}</Typography>
                        <Typography type={"body4"}>{moment(item.created_at).format("DD MMM YYYY")}</Typography>
                    </Stack>
                </Stack>

                <StatusButton status={item.spb_status} style={{ alignSelf: 'center' }} />
            </View>

            <Divider />

            {((item.total_unapproved ?? 0) > 0 && isAdmin) && (
                <Stack spacing={8} direction={'row'} style={{
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    backgroundColor: colors.warning.surface,
                    marginHorizontal: 12,
                    marginTop: 12,
                    marginBottom: 8,
                    borderWidth: 2,
                    borderColor: colors.warning.main,
                    borderRadius: 8
                }}>
                    <Icon icon="warning" style={{ width: 20, aspectRatio: 1 }} />
                    <Typography type="body3" style={{ flexGrow: 1, textAlignVertical: 'center' }}>{t("total_unapproved", { count: item.total_unapproved! })}</Typography>
                </Stack>

            )}
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