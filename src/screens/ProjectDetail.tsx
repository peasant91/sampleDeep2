import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Button, Colors, Divider, Icon, Image, Page, Skeleton, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { _projectMock, _spbMock } from '../../tmd/data/_mock'
import { ProjectModel } from '../models/project/project'
import SpbList, { StatusButton, StatusSPB } from './components/item/SpbList'
import IcLocation from '../assets/icons/location_marker.svg'
import TextButton from '../../tmd/components/Button/TextButton'
import { colors } from '../../tmd/styles/colors'
import { SpbListItem } from '../models/spb/spb'
import { iteratee } from 'lodash'
import { navigate } from '../navigations/RootNavigation'
import { EmptySPBState } from './components/EmptyState'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StorageKey from '../utils/StorageKey'
import moment from 'moment'
import useProjectInfiniteQuery from '../services/project/useProjectQuery'
import { useFocusEffect } from '@react-navigation/native'
import { SPBListShimmer } from './components/shimmer/shimmer'
import { SelectedMap } from '../../tmd/components/picker/MapPicker'

export default function ProjectDetail() {
    const { t } = useTranslation()
    const spbData: SpbListItem[] = _spbMock
    const [projectData, setProjectData] = useState<ProjectModel>()
    const {
        spbLists,
        refetch,
        isRefetching,
        isFetchingNextPage
    } = useProjectInfiniteQuery({ status: StatusSPB.approved });

    useEffect(() => {
        loadDefault()
    }, [])


    useFocusEffect(
        useCallback(() => {
            refetch() // fetch Project Detail
        }, [])
    )

    const loadDefault = async () => {
        var data = JSON.parse(await AsyncStorage.getItem(StorageKey.PROJECT_DATA) || "")
        setProjectData(data)
    }

    const DetailProjectShimmer = () => {
        return (
            <View style={{ flex: 1 }}>
                <Stack spacing={16}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
                        <Stack spacing={8} style={{ flex: 1, justifyContent: 'center', marginRight: 16 }}>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </Stack>
                        <Skeleton style={{ width: '20%', height: 60 }} />
                    </View>
                    <Divider />

                    <Stack spacing={16} direction="row" style={{ paddingHorizontal: 16 }}>
                        <Skeleton style={{ flex: 1 }} />
                        <Skeleton style={{ flex: 1 }} />
                    </Stack>

                    <Divider />

                    <Stack spacing={16} direction="row" style={{ paddingHorizontal: 16 }}>
                        <Skeleton style={{ flex: 1 }} />
                        <Skeleton style={{ flex: 1 }} />
                    </Stack>

                    <View style={{ padding: 16 }}>
                        <Skeleton height={200} />
                    </View>

                    <Stack style={{ padding: 16 }}>
                        <SPBListShimmer />
                        <View style={{ height: 16 }} />
                        <SPBListShimmer />
                        <View style={{ height: 16 }} />
                        <SPBListShimmer />
                        <View style={{ height: 16 }} />
                    </Stack>

                </Stack>
            </View>
        )
    }

    const header = () => {
        return (
            <View style={{ backgroundColor: Colors.white, marginBottom: 16 }}>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData?.name}</Typography>
                        <Typography type={"body4"}>{moment(projectData?.created_at).format("Do MMMM YYYY")}</Typography>
                    </Stack>
                    <View style={{ width: '25%' }}>
                        <Image style={{ aspectRatio: 1 }} borderRadius={4} source={{ uri: projectData?.photo }} />
                    </View>
                </View>

                <Divider />

                <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }, _s.padding]}>
                    <Typography type={"body3"}>{t("status_spb")}</Typography>
                    <StatusButton
                        status={projectData?.status ?? ""}
                    />
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("project_location")}</Typography>
                    <View style={{ marginTop: 11, flexDirection: 'row', alignItems: 'center' }}>
                        <IcLocation />
                        <Typography type='label2' style={{ flexGrow: 1, paddingLeft: 8 }}>{projectData?.location.address}</Typography>
                        <TextButton size='sm'
                            onPress={() => {
                                navigate("MapPickerScreen", {
                                    initial: {
                                        fullAddress: projectData?.location.address,
                                        location: {
                                            latitude: projectData?.location.lat,
                                            longitude: projectData?.location.lng
                                            // latitude: -8.6815,
                                            // longitude: 115.2395
                                        },
                                        nameAddress: projectData?.location.address
                                    },
                                    viewOnly: true
                                })
                            }}
                        >{t("see_in_map")}</TextButton>
                    </View>
                    <Typography type='body4'>{projectData?.location.address}</Typography>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type='body3' style={{ color: colors.neutral.neutral_90 }}>{projectData?.description}</Typography>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Stack spacing={4}>
                        <View style={{ flexDirection: 'row' }}>
                            <Typography type='label2' style={{ flex: 1, color: colors.neutral.neutral_100 }}>{projectData?.construction_type}</Typography>
                            <Typography type='label2' style={{ flex: 1, color: colors.neutral.neutral_100 }}>{projectData?.duration}</Typography>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Typography type='body3' style={{ flex: 1, color: colors.neutral.neutral_80 }}>{t("construction_type")}</Typography>
                            <Typography type='body3' style={{ flex: 1, color: colors.neutral.neutral_80 }}>{t("duration")}</Typography>
                        </View>
                    </Stack>

                    <FlatList style={{ marginTop: 16 }}
                        scrollEnabled={false}
                        data={projectData?.pm}
                        renderItem={(item) => {
                            return (
                                <Typography type='label2' style={{ flex: 1, color: colors.neutral.neutral_100 }}>{item.item}</Typography>
                            )
                        }}
                    />
                    <Typography type='body3' style={{ marginTop: 4, color: colors.neutral.neutral_80 }}>{t("PM")}</Typography>
                </View>

                <Divider />

                {(spbLists?.length ?? 0) > 0 &&
                    <Typography style={_s.padding} type="title3">{t("list_spb_complete", { count: spbLists?.length })}</Typography>
                }
            </View>
        )
    }
    return (
        <Page>
            <Toolbar title={t("project_detail")} />
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: colors.neutral.neutral_20 }}>
                {(spbLists && isRefetching) ? (
                    <DetailProjectShimmer />
                ) : (
                    <FlatList
                        style={{ flexGrow: 1 }}
                        ListHeaderComponent={header}
                        ListEmptyComponent={EmptySPBState}
                        data={spbLists}
                        renderItem={(item) => {
                            return (
                                <View style={{ paddingHorizontal: 16 }}>
                                    <SpbList
                                        isAdmin={false}
                                        isPM={true}
                                        item={item.item}
                                        index={item.index}
                                        onPress={() => {
                                            navigate("DetailSPB", {
                                                spbID: item.item.no_spb,
                                                isPMPage: true
                                            })
                                        }}
                                    />
                                </View>
                            )
                        }}
                    />

                )
                }

                <View style={[_s.padding, { backgroundColor: Colors.white }]}>
                    <Button
                        style={{ flexBasis: 64 }}
                        fullWidth={true}
                        variant="primary"
                        icon={{ icon: "document-attach" }}
                        shape={"rounded"}
                        size={"lg"}
                        onPress={() => {
                            navigate("FormSPB", {
                                defaultSPB: null
                            })
                        }}
                    >{t("ajukan_spb")}</Button>
                </View>
            </View>
        </Page>
    )
}

const _s = StyleSheet.create({
    padding: {
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})