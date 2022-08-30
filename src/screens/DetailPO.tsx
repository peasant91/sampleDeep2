import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { Button, Colors, Divider, Icon, Page, Stack, Toolbar } from '../../tmd'
import TextButton from '../../tmd/components/Button/TextButton'
import Typography from '../../tmd/components/Typography/Typography'
import { _poDetailMock, _poListMock, _projectMock, _spbDetailMock, _spbMock } from '../../tmd/data/_mock'
import { colors } from '../../tmd/styles/colors'
import { ProjectModel } from '../models/project/project'
import { PODetailModel } from '../models/spb/po'
import { SPBDetailModel, SpbListItem } from '../models/spb/spb'
import ItemList from './components/item/itemList'
import { StatusButton, StatusSPB } from './components/item/SpbList'

export default function DetailPO() {
    const { t } = useTranslation()
    const minItemShown: number = 3
    const projectData: ProjectModel = _projectMock
    const data: SPBDetailModel = _spbDetailMock
    const poData: PODetailModel = _poDetailMock
    const [imageLoaded, setImageLoaded] = useState(false)
    const [showAll, setShowAll] = useState(false)
    const [buttonTitle, setButtonTitle] = useState("")

    useEffect(() => {
        if (!showAll) {
            setButtonTitle(t("see_more_items", { count: data.items.length - minItemShown }))
        } else {
            setButtonTitle(t("see_less"))
        }
    }, [showAll])

    const header = () => {
        return (
            <>
                <View style={[{ flexDirection: "row", justifyContent: 'space-between' }, _s.padding]}>
                    <Stack spacing={8} style={{ justifyContent: 'flex-start', flexShrink: 1 }}>
                        <Typography type={"title3"} style={{ flexWrap: 'wrap' }}>{projectData.name}</Typography>
                        <Typography type={"body4"}>{projectData.created_at}</Typography>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Icon icon={"location"} />
                            <Typography type={"body4"}>{projectData.location.address}</Typography>
                        </View>
                    </Stack>
                    <Image style={{ aspectRatio: 1, width: '25%' }} borderRadius={4} source={require("../assets/icons/ic_header/header.png")} />
                </View>

                <Divider />

                <View style={[{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }, _s.padding]}>
                    <Typography type={"body3"}>{t("status_po")}</Typography>
                    <StatusButton
                        status={poData.po_status}
                    />
                </View>

                <Divider />

                <View style={[_s.padding]}>
                    <Stack spacing={16}>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.no_spb}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{data.created_at}</Typography>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("id_spb")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("date_spb")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{poData.no_po}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{poData.po_created_at}</Typography>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("id_po")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("date_po")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{poData.supplier.name}</Typography>
                                <Typography style={{ flex: 1 }} type={"label2"}>{poData.supplier.address}</Typography>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("order_recipient")}</Typography>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_80 }} type={"body3"}>{t("address")}</Typography>
                            </View>
                        </View>

                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography style={{ flex: 1 }} type={"label2"}>{poData.delivery_estimation}</Typography>
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
                <View>
                    <TextButton
                        style={{ alignSelf: "center", marginTop: 16, marginBottom: 12 }}
                        underline
                        size="md"
                        onPress={() => {
                            setShowAll(!showAll)
                        }}
                    >{buttonTitle}</TextButton>
                </View>

                <Divider />

                <View style={[_s.padding, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <Typography type="title3" style={{ color: colors.neutral.neutral_90 }}>{t("total_bahan")}</Typography>
                    <Typography type="body1" style={{ color: colors.neutral.neutral_90 }}>{poData.total} {t("bahan")}</Typography>
                </View>


                <View style={{ height: 16, backgroundColor: colors.neutral.neutral_20 }} />

                {(poData.po_status == StatusSPB.done || poData.po_status == StatusSPB.complaint) &&
                    <>
                        <View style={_s.padding}>
                            <Typography type="title3">{t("pm_note")}</Typography>
                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <Typography style={{ flex: 1, color: colors.neutral.neutral_70 }} type={"body3"}>{t("note_desc")}</Typography>
                                <Typography style={{ flex: 2, color: colors.neutral.neutral_90 }} type={"body3"}>{poData.notes ?? "-"}</Typography>
                            </View>
                        </View>

                        <Divider />
                    </>
                }

            </>
        )
    }

    return (
        <Page>
            <Toolbar title={t("job_detail")} />
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
                                withNotes={false}
                            />
                        )
                    }}
                />

                <View style={_s.padding}>
                    <Stack direction='row' spacing={16}>
                        <Button
                            fullWidth={true}
                            shape='rounded'
                            size='lg'
                            variant='secondary'
                        >{t("complain")}</Button>

                        <Button
                            fullWidth={true}
                            shape='rounded'
                            size='lg'
                            variant='primary'
                        >{t("confirm_po")}</Button>
                    </Stack>
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