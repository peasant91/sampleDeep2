import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, View, ViewProps, ViewStyle } from 'react-native'
import { Alert, Button, Divider, Icon, Image, Page, RHFDatePicker, RHFTextField, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import { yupResolver } from "@hookform/resolvers/yup";
import IcImage from "../assets/icons/ic_image.svg";
import IcLocation from '../assets/icons/location_marker.svg'
import * as yup from "yup";
import TextButton from '../../tmd/components/Button/TextButton'
import { _projectMock, _spbMock } from '../../tmd/data/_mock'
import ImagePicker from '../../tmd/components/picker/ImagePicker'
import MultiImagePicker from '../../tmd/components/picker/MultiImagePicker'
import { FlatList } from 'react-native-gesture-handler'
import { BahanModel, ListBahan } from '../models/spb/bahan'
import { navigate } from '../navigations/RootNavigation'

export interface IBahan {
    setItems: (arg: ListBahan) => void
}

export default function FormSPB() {
    const { t } = useTranslation()
    const [imageLoaded, setImageLoaded] = useState(false)
    const [imageURI, setImageURI] = useState("")
    const [items, setItems] = useState<BahanModel[]>([{
        nama: "ANJENG TANAH",
        quantity: 15,
        unit: "GRAM"
    }])
    const projectData = _projectMock

    const schema = yup.object({
        // phone_code: yup.string().required(),
        username: yup.string().required(),
        // phone: yup.string().required().min(6).max(13),
        password: yup.string().required().min(8),
        // signature: yup.string().required(),
    }).required();

    const defaultValues = {
        // phone_code: "62",
        // phone: "82146456432",
        // password: "password",
        // signature: "",
    };

    const method = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    const header = () => {
        return (
            <>
                <Stack spacing={10} style={_s.padding}>
                    <Typography type='title3' style={{ color: colors.neutral.neutral_100 }}>{t("spb_form_title")}</Typography>


                    <RHFTextField
                        requiredLabel
                        disabled={true}
                        name='no_spb'
                        label={t("no_spb")}
                        placeholder={t("no_spb")}
                    />

                    <RHFDatePicker
                        style={{ backgroundColor: colors.neutral.neutral_70 }}
                        requiredLabel
                        name='submission_date'
                        label={t("send_date")}
                        placeholder={t("select_date")}
                    />

                    <Typography type='title3' style={{ color: colors.neutral.neutral_100 }}>{t("item_photo")}</Typography>

                    <ImagePicker
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
                                <Typography type='label1' style={{ paddingLeft: 8, color: colors.neutral.neutral_90 }}>{projectData.location.address}</Typography>
                                <Typography type='body3' style={{ paddingLeft: 8 }}>{projectData.location.address}</Typography>
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
                                defaultBahan: [{
                                    // nama: "ANJENG TANAH",
                                    // quantity: 15,
                                    // unit: "GRAM"
                                }]
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
                    renderItem={() => {
                        return <View />
                    }}
                />


            </FormProvider>
        </Page >
    )
}

const _s = StyleSheet.create({
    padding: {
        paddingHorizontal: 16,
        paddingVertical: 16
    }
})