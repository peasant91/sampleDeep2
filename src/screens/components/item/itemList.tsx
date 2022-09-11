import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Button, IconButton, Stack } from "../../../../tmd"
import Typography from "../../../../tmd/components/Typography/Typography"
import { colors } from "../../../../tmd/styles/colors"
import { SpbItem } from "../../../models/spb/spb"

interface Props {
    item: SpbItem
    index: number
    withNotes?: boolean
    withEdit?: boolean
    onDelete?: (index: number) => void
}

const ItemList = ({ item, index, withNotes, withEdit, onDelete }: Props) => {
    const { t } = useTranslation()
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Stack spacing={12} style={{ borderWidth: 1, paddingHorizontal: 16, paddingTop: 12, borderRadius: 16, borderColor: colors.neutral.neutral_40 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Typography style={{ color: colors.neutral.neutral_100 }} type={"label1"}>{item.name}</Typography>
                    <Typography style={{ color: colors.neutral.neutral_80, }} type={"body2"}>X{item.quantity}</Typography>
                </View>
                <Typography style={{ color: colors.neutral.neutral_80, marginTop: -12 }} type={"body3"}>{t("unit")} : {item.unit}</Typography>

                {withNotes &&
                    <View style={{ marginBottom: 12 }}>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"label2"}>{t("notes")}</Typography>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"body3"}>{item.notes ?? "-"}</Typography>
                    </View>
                }

                {withEdit &&
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
                            }}
                        >{t("edit")}</Button>
                    </View>

                }
            </Stack>

        </View>

    )
}

export default ItemList