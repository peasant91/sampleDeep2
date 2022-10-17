import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import NumberFormat from 'react-number-format'
import { Button, Colors, Divider, Icon, Page, Skeleton, Stack, Toolbar } from '../../tmd'
import AlertBottomSheet from '../../tmd/components/BottomSheet/AlertBottomSheet'
import TextButton from '../../tmd/components/Button/TextButton'
import { CurrencyText } from '../../tmd/components/TextInput/helpers'
import Typography from '../../tmd/components/Typography/Typography'
import { _poDetailMock, _poListMock, _projectMock, _spbDetailMock, _spbMock } from '../../tmd/data/_mock'
import { useBottomSheet } from '../../tmd/providers/BottomSheetProvider'
import { colors } from '../../tmd/styles/colors'
import { ProjectModel } from '../models/project/project'
import { PODetailModel, StatusPO } from '../models/spb/po'
import { SPBDetailModel, SpbListItem } from '../models/spb/spb'
import AppNavigationType from '../navigations/AppNavigationType'
import { goBack } from '../navigations/RootNavigation'
import usePODetailQuery from '../services/project/usePODetailQuery'
import useProjectService from '../services/project/useProjectService'
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
        hideConfirmationBS,
        showAlertBS,
        hideAlertBS,
    } = useBottomSheet();

    const { t } = useTranslation()
    const minItemShown: number = 3
    var projectData = useRef<ProjectModel>()
    // const data: PODetailModel = _poDetailMock
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("")
    const { data, isLoading, refetchPO, isRefetchingPO } = usePODetailQuery(spbID, poID)
    const { isLoadingProject, patchPOStatus } = useProjectService()

    useEffect(() => {
        if (!showAll) {
            setButtonTitle(t("see_more_items", { count: data.total_item - minItemShown }))
        } else {
            setButtonTitle(t("see_less"))
        }
    }, [showAll])

    useEffect(() => {
        loadDefault()
    }, [])

    const DetailPOShimmer = () => {
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

                    <Stack spacing={16} direction="row" style={{ paddingHorizontal: 16 }}>
                        <Skeleton style={{ flex: 1 }} />
                        <Skeleton style={{ flex: 1 }} />
                    </Stack>

                    <Stack spacing={16} direction="row" style={{ paddingHorizontal: 16 }}>
                        <Skeleton style={{ flex: 1 }} />
                        <Skeleton style={{ flex: 1 }} />
                    </Stack>
                </Stack>
            </View>
        )
    }

    const loadDefault = async () => {
        try {
            projectData.current = JSON.parse(await AsyncStorage.getItem(StorageKey.PROJECT_DATA) || "")
        } catch {
        }
    }

    useFocusEffect(
        useCallback(() => {
            refetchPO()
        }, [])
    )

    const setujuiPO = async () => {
        await patchPOStatus(data.no_spb, data.no_po, StatusPO.approved)
            .then((response) => {
                if (response != undefined) {
                    showAlertBS({
                        title: `Success`,
                        description: `PO ${data.no_po} dari ${data.no_spb} telah disetujui`,
                        buttonPrimaryTitle: "OK",
                        buttonPrimaryAction: () => {
                            hideAlertBS()
                            goBack()
                        }
                    })
                }
            })

    }

    const totalPO = async () => {
        await patchPOStatus(data.no_spb, data.no_po, StatusPO.rejected)
            .then((response) => {
                if (response != undefined) {
                    showAlertBS({
                        title: `Success`,
                        description: `PO ${data.no_po} dari ${data.no_spb} telah ditolak`,
                        buttonPrimaryTitle: "OK",
                        buttonPrimaryAction: () => {
                            hideAlertBS()
                            goBack()
                        }
                    })
                }
            })
    }

    const complaintPO = async (text: string) => {
        await patchPOStatus(data.no_spb, data.no_po, StatusPO.complaint, text)
            .then((response) => {
                if (response != undefined) {
                    showAlertBS({
                        title: `Berhasil Komplain`,
                        description: `PO ${data.no_po} dari ${data.no_spb} telah dikomplain`,
                        buttonPrimaryTitle: "OK",
                        buttonPrimaryAction: () => {
                            hideAlertBS()
                            goBack()
                        }
                    })
                }
            })
    }

    const receivedPO = async (text: string) => {
        await patchPOStatus(data.no_spb, data.no_po, StatusPO.received, text)
            .then((response) => {
                if (response != undefined) {
                    showAlertBS({
                        title: `Success`,
                        description: `Barang barang PO ${data.no_po} dari ${data.no_spb} telah diterima`,
                        buttonPrimaryTitle: "OK",
                        buttonPrimaryAction: () => {
                            hideAlertBS()
                            goBack()
                        }
                    })
                }
            })
    }

    const header = () => {
        return (
            <>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData.current?.name ?? data.project.name}</Typography>
                        <Typography type={"body4"}>{moment(projectData.current?.created_at ?? data.project.created_at).format("Do MMMM YYYY")}</Typography>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon icon={"location"} />
                            <Typography type={"body4"}>{projectData.current?.location.address ?? data.project.location.address}</Typography>
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
                                <CurrencyText value={data.total_price} />
                            </View>
                            {(data.total_discount > 0) &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {/* <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("amount_discount", { count: data.total_discount })}</Typography> */}
                                    <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("amount_discount_title")}</Typography>
                                    <CurrencyText value={data.total_discount} />
                                </View>
                            }

                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
                            {/* <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("amount_ppn", { count: data.total_discount })}</Typography> */}
                            {/* <Typography type='body2' style={{ color: colors.neutral.neutral_90 }}>{t("amount_ppn")}</Typography> */}
                            {/* <CurrencyText value={data.} /> */}
                            {/* </View> */}

                            <Divider />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Typography type='label1' style={{ color: colors.neutral.neutral_90 }}>{t("grand_total")}</Typography>
                                <CurrencyText value={data.grand_total} />
                            </View>


                        </Stack>

                        <Divider />

                    </>
                )}

                {isPMPage &&
                    <View style={[_s.padding, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <Typography type="title3" style={{ color: colors.neutral.neutral_90 }}>{t("total_bahan")}</Typography>
                        <Typography type="body1" style={{ color: colors.neutral.neutral_90 }}>{data.total_item} {t("bahan")}</Typography>
                    </View>
                }

                <View style={{ height: 16, backgroundColor: colors.neutral.neutral_20 }} />

                {(data.po_status == StatusPO.received || data.po_status == StatusPO.complaint) &&
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
        // kondisi barang belom di approve oleh admin, button hanya muncul di admin saja
        if (data.po_status == StatusPO.waiting) {
            return (
                <View style={_s.padding}>
                    <Stack direction='row' spacing={16}>
                        <Button
                            loading={isLoadingProject}
                            fullWidth={true}
                            shape='rounded'
                            size='lg'
                            variant='secondary'
                            onPress={() => {
                                totalPO()
                            }}
                        >{t("tolak")}</Button>

                        <Button
                            loading={isLoadingProject}
                            fullWidth={true}
                            shape='rounded'
                            size='lg'
                            variant='primary'
                            onPress={() => {
                                showConfirmationBS({
                                    title: t("po_setujui_title"),
                                    description: t("po_setujui_desc"),
                                    buttonPrimaryTitle: t("confirm"),
                                    buttonSecondaryTitle: t("cancel"),
                                    buttonPrimaryAction: ((text) => {
                                        hideConfirmationBS()
                                        setujuiPO()
                                    })
                                })
                            }}
                        >{t("setujui")}</Button>
                    </Stack>
                </View>
            )
        } else if (data.po_status == StatusPO.approved && isPMPage) {
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
                                        complaintPO(text ?? "")
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
                                        receivedPO(text ?? "")
                                        hideConfirmationBS()
                                    })
                                })
                            }}
                        >{t("confirm_po")}</Button>
                    </Stack>
                </View>
            )
        }

        return <View />
    }

    return (
        <Page>
            <Toolbar title={t("po_detail")} />
            <View style={{ flex: 1, flexDirection: 'column' }}>

                {(isLoading || isRefetchingPO) ? (
                    <DetailPOShimmer />
                ) : (
                    <>
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
                    </>
                )}


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