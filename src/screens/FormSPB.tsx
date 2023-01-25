import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import { Alert, Button, Divider, Icon, Page, RHFDatePicker, RHFTextField, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { _projectMock, _spbMock } from '../../tmd/data/_mock'
import ImagePicker from '../../tmd/components/picker/ImagePicker'
import { FlatList } from 'react-native-gesture-handler'
import { BahanModel, ListBahan } from '../models/spb/bahan'
import { goBack, navigate, navigationRef } from '../navigations/RootNavigation'
import ItemList from './components/item/itemList'
import { SPBDetailModel, SpbItem } from '../models/spb/spb'
import BottomSheet from '@gorhom/bottom-sheet';
import AddBahanBottomSheet from './AddBahanBottomSheet'
import { useBottomSheet } from '../../tmd/providers/BottomSheetProvider'
import useGetSPBNumberQuery from '../services/project/useGetSPBQuery'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AppNavigationType from '../navigations/AppNavigationType'
import useProjectService from '../services/project/useProjectService'
import moment from 'moment'
import RNFS from 'react-native-fs'
import { curry, defaults } from 'lodash'
import { ProjectLocationModel, ProjectModel } from '../models/project/project'
import AsyncStorage from '@react-native-async-storage/async-storage'
import StorageKey from '../utils/StorageKey'
import { Modalize } from 'react-native-modalize'


export interface IBahan {
    setItems: (arg: ListBahan) => void
}

export default function FormSPB({ route }: NativeStackScreenProps<AppNavigationType, "FormSPB">) {
    const { t } = useTranslation()
    const { showConfirmationBS, hideConfirmationBS, showAlertBS, hideAlertBS } = useBottomSheet()
    const [projectLocation, setprojectLocation] = useState<ProjectLocationModel>()
    const [editIndex, setEditIndex] = useState(0)
    const [items, setItems] = useState<BahanModel[]>(() => {
        var array: BahanModel[] = []
        route.params.defaultSPB?.items.map(item => {
            var _bahan: BahanModel = {
                id: item.id,
                name: item.name,
                unit: item.unit,
                notes: item.notes ?? "",
                quantity: item.quantity
            }
            array.push(_bahan)
        })
        return array
    })
    // const projectData = _projectMock
    var projectData = useRef<ProjectModel>()
    const defaultSPB = route.params.defaultSPB ?? null
    const { isLoadingProject, postSPB, patchSPB } = useProjectService()

    if (defaultSPB == null) {
        const { noSPB } = useGetSPBNumberQuery()

        useEffect(() => {
            method.reset({ "no_spb": noSPB })
        }, [noSPB])
    }

    useEffect(() => {
        loadDefault()
    }, [])

    const loadDefault = async () => {
        try {
            projectData.current = JSON.parse(await AsyncStorage.getItem(StorageKey.PROJECT_DATA) || "")
            setprojectLocation(projectData.current?.location)
        } catch {
        }
    }

    const submitForm = async () => {
        var query: any = {}

        const date = moment(new Date()).format("hh:mm:ss")
        const _date = moment(method.getValues().submission_date).format("YYYY-MM-DD") + " " + date
        query["delivery_date"] = _date
        query["items"] = items
        console.log(query);

        try {
            query["photo"] = await RNFS.readFile(imageURL.current, 'base64').then(value => value)
        } catch (e) {
            console.log(e)
        }
        if (defaultSPB == null) {
            await postSPB(method.getValues().no_spb ?? "", query)
                .then((response) => {
                    if (response != undefined) {
                        navigationRef.reset({
                            routes: [
                                { name: "HomePM" },
                                { name: "ProjectDetail" }
                            ]
                        })
                        navigate("SuccessPage")
                        // showAlertBS({
                        //     title: "Success Ajukan SPB Baru",
                        //     buttonPrimaryTitle: "OK",
                        //     buttonPrimaryAction: () => {
                        //         hideAlertBS()
                        //         goBack()
                        //     }
                        // })
                    }
                })
        } else {
            await patchSPB(method.getValues().no_spb ?? "", query)
                .then((response) => {
                    if (response != undefined) {
                        showAlertBS({
                            title: `Sukses Mengubah SPB ${defaultSPB.no_spb}`,
                            buttonPrimaryTitle: "OK",
                            buttonPrimaryAction: () => {
                                hideAlertBS()
                                goBack()
                            }
                        })
                    }
                })
        }
    }

    const handleShowConfirmation = () => {
        if (isLoadingProject) { return }
        showConfirmationBS({
            title: t("confirmation_send_spb_title"),
            description: t("confirmation_send_spb_desc"),
            buttonPrimaryAction: () => {
                hideConfirmationBS();
                // setisLoading(true)
                submitForm()
            },
        });
    };

    const schema = yup.object({
        no_spb: yup.string().required().label(t("no_spb")),
        submission_date: yup.string().required().label(t("send_date")),
        image: yup.string().optional(),
    }).required();

    const defaultValues = {
        no_spb: defaultSPB?.no_spb,
        submission_date: moment(defaultSPB?.estimated_date ?? defaultSPB?.created_at).format(),
    };

    const method = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const doDelete = (index: number) => {
        var array = [...items]
        array.splice(index, 1)
        setItems(array)
    }

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const modalizeRef = useRef<Modalize>(null);
    const imageURL = useRef<string>(defaultSPB?.image ?? "")

    // variables
    useEffect(() => {
        bottomSheetRef.current?.forceClose()
    }, [])

    const onSubmit = (data: any) => {
        if (items.length == 0) {
            showAlertBS({
                title: "Daftar Bahan minimal 1"
            })
            return
        }
        handleShowConfirmation()
    };

    const onError = (errors: any) => {
        console.log(JSON.stringify(errors, null, 2));
    };

    const header = () => {
        return (
            <>
                <Stack spacing={10} style={_s.padding}>
                    <Typography type='title3' style={{ color: colors.neutral.neutral_100 }}>{t("spb_form_title")}</Typography>


                    <RHFTextField
                        multiline
                        requiredLabel
                        disabled={true}
                        name='no_spb'
                        label={t("no_spb")}
                        // value={SPBNo}
                        // defaultValue={SPBNo}
                        placeholder={t("no_spb")}
                    />

                    <RHFDatePicker
                        style={{ backgroundColor: colors.neutral.neutral_70 }}
                        requiredLabel
                        name='submission_date'
                        minimumDate={new Date()}
                        label={t("send_date")}
                        placeholder={t("select_date")}
                        date={method.getValues().submission_date}
                    />

                    <Typography type='title3' style={{ color: colors.neutral.neutral_100 }}>{t("item_photo")}</Typography>

                    <ImagePicker
                        onDelete={() => {
                            imageURL.current = ""
                        }}
                        onChangeImageUrl={(url) => {
                            imageURL.current = url
                        }}
                        initialImageUrl={imageURL.current}
                        description={t("pick_image_desc")}
                        buttonProps={{
                            children: {
                                icon: {
                                    icon: "camera",
                                },
                            }
                        }}
                    />

                </Stack>

                <Divider />

                <Stack spacing={10} style={_s.padding}>
                    <View>
                        <Typography type="body3" style={{ color: colors.neutral.neutral_70 }}>{t("project_location")}</Typography>
                        <View style={{ marginTop: 11, flexDirection: 'row' }}>
                            <Icon icon='location' size={18} />
                            <Stack>
                                {/* <Typography type='label1' style={{ paddingLeft: 8, color: colors.neutral.neutral_90 }}>{projectData.current?.location.address}</Typography> */}
                                <Typography type='label1' style={{ paddingLeft: 8, color: colors.neutral.neutral_90 }}>{projectLocation?.address_title ?? projectLocation?.address}</Typography>
                                <Typography type='body3' style={{ paddingLeft: 8 }}>{projectLocation?.address}</Typography>
                            </Stack>
                        </View>
                    </View>
                    <Alert
                        variant='info'
                        type='outlined'
                        description={t("info_shipment")}
                    />
                </Stack>

                <Divider />

                <Stack spacing={12} style={_s.padding}>
                    <Typography type='title3'>{t("daftar_bahan")}</Typography>
                    <Button
                        shape='rounded'
                        icon={{ icon: 'add-circle' }}
                        variant="secondary"
                        size='md'
                        fullWidth
                        onPress={() => {
                            navigate("AddBahan", {
                                defaultBahan: [...items],
                                save: (_item: BahanModel[]) => {
                                    setItems(_item)
                                }
                            })
                        }}
                    >{t("tambah_bahan")}</Button>
                </Stack>
            </>
        )
    }

    return (
        <Page>
            <Toolbar title={t("item_submission")} />
            <FormProvider {...method}>
                <FlatList
                    ListHeaderComponent={header}
                    data={items}
                    ItemSeparatorComponent={() => {
                        return <View style={{ height: 16 }} />
                    }}
                    renderItem={({ item, index }) => {
                        return <ItemList
                            item={{
                                id: 0,
                                name: item.name,
                                quantity: item.quantity,
                                notes: item.notes,
                                unit: item.unit
                            }} index={index}
                            config={{
                                withNote: true,
                                withEdit: true
                            }}
                            doEdit={() => {
                                setEditIndex(index)
                                modalizeRef.current?.open()
                                // setShowBS({
                                //     index: index,
                                //     show: true
                                // })
                            }}
                            onDelete={(index) => {
                                return doDelete(index)
                            }}
                        />
                    }}
                />

                <View style={{ flexBasis: 70, padding: 16 }}>
                    <Button
                        loading={isLoadingProject}
                        fullWidth={true}
                        onPress={method.handleSubmit(onSubmit, onError)}
                    >{t("ajukan")}</Button>
                </View>


            </FormProvider>

            <Modalize
                ref={modalizeRef}
                closeOnOverlayTap={true}
                handlePosition={"inside"}
                adjustToContentHeight
                modalStyle={{
                    borderTopRightRadius: 16,
                    borderTopLeftRadius: 16,
                }}
            >
                <AddBahanBottomSheet
                    item={items[editIndex]}
                    index={editIndex}
                    onSave={(data: BahanModel) => {
                        var array = [...items]
                        array[editIndex] = data
                        setItems(array)
                        modalizeRef.current?.close()
                    }}
                />
            </Modalize>

        </Page >
    )
}

const _s = StyleSheet.create({
    padding: {
        paddingHorizontal: 16,
        paddingVertical: 16
    }
})