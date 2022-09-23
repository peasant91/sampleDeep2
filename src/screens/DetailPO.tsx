import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Button, Colors, Divider, Icon, Page, Stack, Toolbar } from '../../tmd'
import AlertBottomSheet from '../../tmd/components/BottomSheet/AlertBottomSheet'
import TextButton from '../../tmd/components/Button/TextButton'
import Typography from '../../tmd/components/Typography/Typography'
import { _poDetailMock, _poListMock, _projectMock, _spbDetailMock, _spbMock } from '../../tmd/data/_mock'
import { useBottomSheet } from '../../tmd/providers/BottomSheetProvider'
import { colors } from '../../tmd/styles/colors'
import { ProjectModel } from '../models/project/project'
import { PODetailModel, StatusPO } from '../models/spb/po'
import { SPBDetailModel, SpbListItem } from '../models/spb/spb'
import AppNavigationType from '../navigations/AppNavigationType'
import usePODetailQuery from '../services/project/usePODetailQuery'
import StorageKey from '../utils/StorageKey'
import ItemList from './components/item/itemList'
import { StatusButton, StatusSPB } from './components/item/SpbList'

export default function DetailPO({ route }: NativeStackScreenProps<AppNavigationType, "DetailPO">) {
    const isAdminPage = route.params.isAdminPage
    const isPMPage = route.params.isPMPage
    const poID = route.params.poID
    const spbID = route.params.spbID
    const {
        showConfirmationBS,
        hideConfirmationBS
    } = useBottomSheet();

    const { t } = useTranslation()
    const minItemShown: number = 3
    var projectData = useRef<ProjectModel>()
    // const data: PODetailModel = _poDetailMock
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("")
    const { data, isLoading } = usePODetailQuery(spbID, poID)

    useEffect(() => {
        if (!showAll) {
            setButtonTitle(t("see_more_items", { count: data.items.length - minItemShown }))
        } else {
            setButtonTitle(t("see_less"))
        }
    }, [showAll])

    useEffect(() => {
        loadDefault()
    }, [])

    const loadDefault = async () => {
        projectData.current = JSON.parse(await AsyncStorage.getItem(StorageKey.PROJECT_DATA) || "")
    }

    const header = () => {
        return (
            <>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData.current?.name}</Typography>
                        <Typography type={"body4"}>{moment(projectData.current?.created_at).format("Do MMMM YYYY")}</Typography>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon icon={"location"} />
                            <Typography type={"body4"}>{projectData.current?.location.address}</Typography>
                        </View>
                    </Stack>
                    <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
                </View>

                <Divider />

                <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }, _s.padding]}>
                    <Typography type={"body3"}>{t("status_po")}</Typography>
                    <StatusButton
                        status={data.po_status}
                    />
                </View>

                <Divider />

                <View style={[_s.padding]}>
                    <Stack spacing={16}>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.no_spb}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{moment(data.spb_created_at).format("Do MMMM YYYY")}</Typography>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("id_spb")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("date_spb")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.no_po}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{moment(data.po_created_at).format("Do MMMM YYYY")}</Typography>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("id_po")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("date_po")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.supplier.name}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.supplier.address}</Typography>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("order_recipient")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("address")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{moment(data.delivery_estimation).format("Do MMMM YYYY")}</Typography>

                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("estimated_delivery")}</Typography>
                            </View>
                        </View>



                    </Stack>
                </View>

                <Divider />

                <View style={_s.padding}>
                    <Typography type="title3">{t("item_list")}</Typography>
                </View>
            </>
        )
    }

    const footer = () => {
        return (
            <>
                <View style={{ marginTop: 16, marginBottom: 12 }}>
                    {data.items.length > minItemShown &&
                        <TextButton
                            style={{ alignSelf: "center" }}
                            underline
                            size="md"
                            onPress={() => {
                                setShowAll(!showAll)
                            }}
                        >{buttonTitle}</TextButton>
                    }
                </View>
                {/* <View>
                    <TextButton
                        style={{ alignSelf: "center", marginTop: 16, marginBottom: 12 }}
                        underline
                        size="md"
                        onPress={() => {
                            setShowAll(!showAll)
                        }}
                    >{buttonTitle}</TextButton> */}
                {/* </View> */}

                <Divider />

                {isAdminPage && (
                    <>

                        <View style={{ padding: 16 }}>
                            <Typography type='title3' style={{ color: colors.neutral.neutral_90 }}>{t("payment_rule")}</Typography>
                            <Stack spacing={12} style={{ marginTop: 16 }}>
                                {data.payment_term.map(function (item, index) {
                                    return <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{`\u2022 ${item}`}</Typography>
                                })}
                            </Stack>
                        </View>

                        <Divider />

                        <Stack spacing={12} style={{ padding: 16 }}>
                            <Typography type='title3' style={{ color: colors.neutral.neutral_90 }}>{t("payment_summary")}</Typography>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("po_subtotal", { count: data.total_item })}</Typography>
                                <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{data.total_price}</Typography>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("amount_discount", { count: data.total_discount })}</Typography>
                                <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>-{data.total_discount}</Typography>
                            </View>

                            <Divider />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography type='label1' style={{ color: colors.neutral.neutral_90 }}>{t("grand_total")}</Typography>
                                <Typography type='label1' style={{ color: colors.neutral.neutral_90 }}>{data.grand_total}</Typography>
                            </View>


                        </Stack>

                        <Divider />

                    </>
                )}

                <View style={[_s.padding, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Typography type="title3" style={{ color: colors.neutral.neutral_90 }}>{t("total_bahan")}</Typography>
                    <Typography type="body1" style={{ color: colors.neutral.neutral_90 }}>{data.total_item} {t("bahan")}</Typography>
                </View>

                <View style={{ height: 16, backgroundColor: colors.neutral.neutral_20 }} />

                {(data.po_status == StatusPO.done || data.po_status == StatusPO.complaint) &&
                    <>
                        <View style={_s.padding}>
                            <Typography type="title3">{t("pm_note")}</Typography>
                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_70 }} type={"body3"}>{t("note_desc")}</Typography>
                                <Typography style={{ flex: 2, color: colors.neutral.neutral_90 }} type={"body3"}>{data.notes ?? "-"}</Typography>
                            </View>
                        </View>

                        <Divider />
                    </>
                }

            </>
        )
    }

    const ButtonPage = () => {
        if (data.po_status == StatusPO.waiting) {
            if (isPMPage) {
                return (
                    <View style={_s.padding}>
                        <Stack direction='row' spacing={16}>
                            <Button
                                fullWidth={true}
                                shape='rounded'
                                size='lg'
                                variant='secondary'
                                onPress={() => {
                                    showConfirmationBS({
                                        title: t("po_complain_title"),
                                        description: t("po_complain_desc"),
                                        withNotes: true,
                                        noteIsRequired: true,
                                        buttonPrimaryTitle: t("complain"),
                                        buttonSecondaryTitle: t("cancel"),
                                        buttonPrimaryAction: ((text) => {
                                            console.log(text)
                                            hideConfirmationBS()
                                        })
                                    })
                                }}
                            >{t("complain")}</Button>

                            <Button
                                fullWidth={true}
                                shape='rounded'
                                size='lg'
                                variant='primary'
                                onPress={() => {
                                    showConfirmationBS({
                                        title: t("po_confirmation_title"),
                                        description: t("po_confirmation_desc"),
                                        withNotes: true,
                                        noteIsRequired: false,
                                        buttonPrimaryTitle: t("confirm"),
                                        buttonSecondaryTitle: t("cancel"),
                                        buttonPrimaryAction: ((text) => {
                                            console.log(text)
                                            hideConfirmationBS()
                                        })
                                    })
                                }}
                            >{t("confirm_po")}</Button>
                        </Stack>
                    </View>
                )
            } else {
                return (
                    <View style={_s.padding}>
                        <Stack direction='row' spacing={16}>
                            <Button
                                fullWidth={true}
                                shape='rounded'
                                size='lg'
                                variant='secondary'
                            >{t("tolak")}</Button>

                            <Button
                                fullWidth={true}
                                shape='rounded'
                                size='lg'
                                variant='primary'
                            >{t("setujui")}</Button>
                        </Stack>
                    </View>
                )

            }
        }

        return <View />
    }

    return (
        <Page>
            <Toolbar title={t("po_detail")} />
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <FlatList
                    style={{ backgroundColor: Colors.white }}
                    ListHeaderComponent={header}
                    ListFooterComponent={footer}
                    extraData={showAll}
                    data={(showAll) ? data.items : data.items.slice(0, minItemShown)}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 12 }} />
                        )
                    }}
                    renderItem={(item) => {
                        return (
                            <ItemList
                                item={item.item}
                                index={item.index}
                                config={{
                                    withPrice: (isAdminPage) ? true : false
                                }}
                            />
                        )
                    }}
                />

                <ButtonPage />

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