import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { Button, Image, Page, Stack } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import ICSuccess from '../assets/illusts/success_submit_spb.svg'
import { navigate, navigationRef } from '../navigations/RootNavigation'

export default function SuccessPage() {
    const { t } = useTranslation()
    const width = Dimensions.get('window').width

    return (
        <Page>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <Stack>
                    <ICSuccess width={width / 2} style={{ aspectRatio: 1, alignSelf: 'center' }} />

                    <Typography type='title2' style={{ color: colors.neutral.neutral_100, alignSelf: 'center', marginTop: 24 }}>{t("success_send_title")}</Typography>

                    <Typography type='body2' style={{ color: colors.neutral.neutral_80, alignSelf: 'center', marginTop: 4, textAlign: 'center' }}>{t("success_send_desc")}</Typography>
                </Stack>
            </View>

            <View style={{ flexBasis: 80, flexGrow: 0, padding: 16 }}>
                <Button
                    fullWidth={true}
                    variant='primary'
                    shape='rounded'
                    size='lg'
                    onPress={() => {
                        navigate("ProjectDetail")
                    }}
                // onPress={() => navigationRef.reset({
                //     // index: 1,
                //     routes: [
                //         // { name: 'HomePM' },
                //         { name: "ProjectDetail" }
                //     ]
                // })}
                >
                    {t("to_detail_project")}
                </Button>
            </View>

        </Page>
    )
}