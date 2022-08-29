import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Divider, Icon, Image, Page, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { _projectMock } from '../../tmd/data/_mock'
import { ProjectModel } from '../models/project/project'
import { StatusButton } from './components/item/SpbList'
import IcLocation from '../assets/icons/location_marker.svg'
import TextButton from '../../tmd/components/Button/TextButton'

export default function ProjectDetail() {
    const { t } = useTranslation()
    const projectData: ProjectModel = _projectMock

    const header = () => {
        return (
            <>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData.name}</Typography>
                        <Typography type={"body4"}>{projectData.created_at}</Typography>
                    </Stack>
                    <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
                </View>

                <Divider />

                <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }, _s.padding]}>
                    <Typography type={"body3"}>{t("status_spb")}</Typography>
                    <StatusButton
                        status={projectData.status}
                    />
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("project_location")}</Typography>
                    <View style={{ marginTop: 11, flexDirection: 'row', alignItems: 'center' }}>
                        <IcLocation />
                        <Typography type='label2' style={{ flexGrow: 1, paddingLeft: 8 }}>{projectData.location.address}</Typography>
                        <TextButton size='sm'>{t("see_in_map")}</TextButton>
                    </View>
                    <Typography type='body4'>{projectData.location.address}</Typography>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type='body3'>{projectData.location.address}</Typography>
                </View>

                <Divider />
            </>
        )
    }
    return (
        <Page>
            <Toolbar title={t("job_detail")} />
            {
                header()
            }
        </Page>
    )
}

const _s = StyleSheet.create({
    padding: {
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})