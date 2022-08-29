import React from "react"
import { useTranslation } from "react-i18next"
import { View } from "react-native"
import { Stack } from "../../../../tmd"
import Typography from "../../../../tmd/components/Typography/Typography"
import { colors } from "../../../../tmd/styles/colors"
import { SpbItem } from "../../../models/spb/spb"

interface Props {
    item: SpbItem
    index: number
    withNotes?: boolean
}

const ItemList = ({ item, index, withNotes }: Props) => {
    const { t } = useTranslation()
    return (
        <View style={{ paddingHorizontal: 16 }}>
            <Stack spacing={12} style={{ borderWidth: 1, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, borderColor: colors.neutral.neutral_40 }}>
                <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                    <Typography style={{ color: colors.neutral.neutral_100 }} type={"label1"}>{item.name}</Typography>
                    <Typography style={{ color: colors.neutral.neutral_80, }} type={"body2"}>X{item.quantity}</Typography>
                </View>
                <Typography style={{ color: colors.neutral.neutral_80, marginTop: -12 }} type={"body3"}>{t("unit")} : {item.unit}</Typography>

                {withNotes &&
                    <View>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"label2"}>{t("notes")}</Typography>
                        <Typography style={{ color: colors.neutral.neutral_80 }} type={"body3"}>{item.notes ?? "-"}</Typography>
                    </View>
                }
            </Stack>

        </View>

    )
}

export default ItemList