import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Typography from '../../../tmd/components/Typography/Typography'
import { colors } from '../../../tmd/styles/colors'
import IllustSPBEmpty from '../../assets/illusts/empty_spb.svg'
import IllustPOEmpty from '../../assets/illusts/empty_po.svg'

function EmptySPBState() {
    const { t } = useTranslation()
    return (
        <View style={{ alignItems: 'center', padding: 16 }}>
            <IllustSPBEmpty />
            <Typography type='title2' style={{ color: colors.neutral.neutral_100 }}>{t("empty_spb_title")}</Typography>
            <Typography type='body2' style={{ textAlign: 'center', color: colors.neutral.neutral_80 }}>{t("empty_spb_desc")}</Typography>
        </View>
    )
}

function EmptyPOState() {
    const { t } = useTranslation()
    return (
        <View style={{ alignItems: 'center', padding: 16 }}>
            <IllustPOEmpty />
            <Typography type='title2' style={{ color: colors.neutral.neutral_100 }}>{t("empty_po_title")}</Typography>
            <Typography type='body2' style={{ textAlign: 'center', color: colors.neutral.neutral_80 }}>{t("empty_po_desc")}</Typography>
        </View>
    )
}

export { EmptySPBState, EmptyPOState }