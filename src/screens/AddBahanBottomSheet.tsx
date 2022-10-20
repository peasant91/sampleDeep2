import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Button, Colors, Divider, IconButton, RHFTextField, Stack, TextField } from '../../tmd'
import { BahanModel } from '../models/spb/bahan'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import { goBack } from '../navigations/RootNavigation'

interface Props {
    item: BahanModel
    index: number
    onSave: (model: BahanModel) => void
}

export default function AddBahanBottomSheet({ item, index, onSave }: Props) {
    const { t } = useTranslation()
    const [qty, setQty] = useState(1)

    useEffect(() => setQty(item.quantity), [])
    useEffect(() => {
        method.setValue('quantity', qty)
    }, [qty])
    

    const schema = yup.object({
        name: yup.string().required().label(t("nama_bahan")),
        unit: yup.string().required().label(t("unit_bahan")),
        note: yup.string().optional().label(t("note_bahan")),
        quantity: yup.number().required().label(t("jumlah"))
    }).required();

    var method = useForm({
        defaultValues: item,
        resolver: yupResolver(schema)
    })

    const { handleSubmit } = method;

    const onSubmit = (data: BahanModel) => {
        onSave(data)
    };

    const onError = (errors: any) => {
        console.log(errors)
        // console.log("ANJENG ON ERROR", errors)
        // console.log(JSON.stringify(errors, null, 2));
    };

    return (
        <FormProvider {...method}>
            <Stack>
                <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                    <RHFTextField
                        requiredLabel
                        name={'name'}
                        defaultValue={item.name}
                        label={t("nama_bahan")}
                        placeholder={t('nama_bahan_placeholder')}
                    />

                    <View style={{ flexDirection: 'row' }}>
                        <RHFTextField
                            style={{ flex: 1, marginRight: 8 }}
                            requiredLabel
                            name={'unit'}
                            defaultValue={item.unit}
                            label={t("unit_bahan")}
                            placeholder={t('unit_bahan_placeholder')}
                        />

                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Typography type='label1'>{t("jumlah")}</Typography>
                                <Typography type='label1' style={{ color: Colors.red900 }}>*</Typography>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <IconButton
                                    shape={"rounded"}
                                    icon={"remove-outline"}
                                    variant={'secondary'}
                                    onPress={() => {
                                        console.log(qty)
                                        if (qty == 1) {
                                            setQty(1)
                                        } else {
                                            setQty(qty - 1)
                                        }
                                    }}
                                />

                                <View style={{ flex: 1, marginLeft: 4, marginRight: 4 }}>
                                    <Controller
                                        control={method.control}
                                        name={'quantity'}
                                        render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                            return <TextField
                                                onBlur={onBlur}
                                                onChangeText={(text) => {
                                                    console.log(text)
                                                    if (text !== '') {
                                                        setQty(parseInt(text))
                                                        onChange(text)
                                                    } else {
                                                        setQty(0)
                                                        onChange(0)
                                                    }
                                                    return
                                                }}
                                                value={String(qty)}
                                                defaultValue={String(qty)}
                                                error={fieldState.error != undefined}
                                                underlineColor={colors.primary.main}
                                                mode={'flat'}
                                                style={{textAlign: 'center'}}
                                                textAlign="center"
                                                errorText={
                                                    fieldState.error?.message?.charAt(0).toUpperCase() +
                                                    (fieldState.error?.message?.slice(1) ?? "")
                                                }
                                                // defaultValue={String(qty)}
                                                keyboardType='number-pad'
                                                numberOfLines={1}
                                            />
                                        }}
                                    />
                                </View>

                                <IconButton
                                    shape={"rounded"}
                                    icon={"add-outline"}
                                    variant={'secondary'}
                                    onPress={() => {
                                        setQty(qty + 1)
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <RHFTextField
                        name={'notes'}
                        defaultValue={item.notes}
                        label={t("note_bahan")}
                        placeholder={t("note_bahan_placeholder")}
                    />
                </View>

                <Divider />

                <Button
                    style={{ flexBasis: 80, padding: 16 }}
                    variant='primary'
                    size='lg'
                    fullWidth={true}
                    onPress={handleSubmit(onSubmit, onError)}
                >{t("save")}</Button>

            </Stack >
        </FormProvider>
    )
}