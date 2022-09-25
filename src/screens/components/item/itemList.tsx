import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Button, IconButton, Stack, Tag } from "../../../../tmd"
import Typography from "../../../../tmd/components/Typography/Typography"
import { colors } from "../../../../tmd/styles/colors"
import { SpbItem } from "../../../models/spb/spb"

interface Props {
    item: SpbItem
    index: number
    config: {
        withNote?: boolean
        withPrice?: boolean
        withEdit?: boolean
    }
    onDelete?: (index: number) => void
    doEdit?: () => void
}

const ItemList = ({ item, index, config, onDelete, doEdit }: Props) => {
    const { t } = useTranslation()
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Stack spacing={12} style={{ borderWidth: 1, paddingHorizontal: 16, paddingTop: 12, borderRadius: 16, borderColor: colors.neutral.neutral_40 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Typography style={{ color: colors.neutral.neutral_100 }} type={"label1"}>{item.name}</Typography>
                    <Typography style={{ color: colors.neutral.neutral_80, }} type={"body2"}>X{item.quantity}</Typography>
                </View>
                <Typography style={{ color: colors.neutral.neutral_80, marginTop: -12 }} type={"body3"}>{t("unit")} : {item.unit}</Typography>

                {config.withPrice && (
                    <Stack spacing={8} direction={'row'} style={{ marginBottom: 12 }}>
                        <Typography type="label1" style={{ color: colors.neutral.neutral_90 }}>{`${item.quantity} x ${item.final_price}`}</Typography>
                        {item.normal_price != item.final_price && (
                            <Stack spacing={8} direction={'row'}>
                                <Typography type="body2" style={{ color: colors.neutral.neutral_70, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item.normal_price}</Typography>
                                <Tag
                                    text={t("amount_discount", { count: item.discount ?? 0 })}
                                    size="sm"
                                    shape="rounded"
                                    variant="primary" />
                            </Stack>
                        )}
                    </Stack>
                )}

                {config.withNote &&
                    <View style={{ marginBottom: 12 }}>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"label2"}>{t("notes")}</Typography>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"body3"}>{(item.notes?.length ?? 0 > 0) ? item.notes : "-"}</Typography>
                    </View>
                }

                {config.withEdit &&
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginBottom: 16 }}>
                        <IconButton
                            variant={'secondary'}
                            icon='trash'
                            color={colors.danger.main}
                            onPress={() => {
                                onDelete!(index)
                            }}
                        />

                        <Button
                            size="sm"
                            shape="rounded"
                            variant="secondary"
                            icon={{ icon: "pencil" }}
                            onPress={() => {
                                doEdit!()
                            }}
                        >{t("edit")}</Button>
                    </View>
                }
            </Stack>

        </View>

    )
}

export default ItemList