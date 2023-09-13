import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import Typography from '../../../tmd/components/Typography/Typography'
import { colors } from '../../../tmd/styles/colors'
import IllustSPBEmpty from '../../assets/illusts/empty_spb.svg'
import IllustSPBFilterEmpty from '../../assets/illusts/empty_spb_filter.svg'
import IllustPOEmpty from '../../assets/illusts/empty_po.svg'
import { Button } from '../../../tmd'

function EmptySPBStateAdmin() {
    const { t } = useTranslation()
    return (
        <View style={{ alignItems: 'center', padding: 16 }}>
            <IllustSPBEmpty />
            <Typography type='title2' style={{ color: colors.neutral.neutral_100 }}>{t("empty_spb_title")}</Typography>
            <Typography type='body2' style={{ textAlign: 'center', color: colors.neutral.neutral_80 }}>{t("empty_spb_admin_desc")}</Typography>
        </View>
    )
}

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

function EmptySPBFilterState({ onReset }) {
    const { t } = useTranslation()
    return (
        <View style={{ alignItems: 'center', padding: 16 }}>
            <IllustSPBFilterEmpty />
            <Typography type='title2' style={{ color: colors.neutral.neutral_100, marginTop: 24 }}>{t("empty_spb_filter_title")}</Typography>
            <Typography type='body2' style={{ textAlign: 'center', color: colors.neutral.neutral_80, marginTop: 4 }}>{t("empty_spb_filter_desc")}</Typography>
            <Button
                shape='rounded'
                size='lg'
                variant='primary'
                onPress={onReset}
                fullWidth
                style={{ marginTop: 16, alignSelf: 'stretch' }}
            >
                {t('reset_filter')}
            </Button>
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

export { EmptySPBState, EmptyPOState, EmptySPBStateAdmin, EmptySPBFilterState }