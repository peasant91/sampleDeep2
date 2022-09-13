import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { TextInput, View } from 'react-native'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { t } from 'i18next';
import { Stack, RHFTextField, Colors, IconButton, Button, configureFonts, TextField } from '../../tmd';
import Typography from '../../tmd/components/Typography/Typography';
import { colors, transparent } from '../../tmd/styles/colors';
import { BahanModel } from '../models/spb/bahan';
import { useTranslation } from 'react-i18next';


interface Props {
    item: BahanModel,
    index: number,
    onDelete: () => void,
    yName: string,
    yUnit: string,
    yNote: string
    yQty: string
}
export default function AddBahanCell({ item, index, yName, yUnit, yNote, yQty, onDelete }: Props) {
    const { t } = useTranslation()
    const { control, setValue, getValues } = useFormContext()
    const [qty, setQty] = useState(1)

    useEffect(() => setValue(yQty, qty), [qty])
    useEffect(() => {
        setTimeout(() => {
            setQty(getValues(yQty))
        }, 100)
    }, [])


    return (
        <Stack spacing={0}>
            <Typography type='title3' style={{ color: colors.neutral.neutral_80 }}>{t("bahan")} {index + 1}</Typography>
            {index > 0 && <IconButton
                variant={'secondary'}
                icon='trash'
                color={colors.danger.main}
                style={{ position: 'absolute', right: 0, top: 0 }}
                onPress={() => onDelete()}
            />
            }

            <RHFTextField
                requiredLabel
                name={yName}
                defaultValue={getValues(yName)}
                label={t("nama_bahan")}
                placeholder={t('nama_bahan_placeholder')}
            />

            <View style={{ flexDirection: 'row' }}>
                <RHFTextField
                    style={{ flex: 1, marginRight: 8 }}
                    requiredLabel
                    name={yUnit}
                    defaultValue={getValues(yUnit)}
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
                                if (qty == 1) {
                                    setQty(1)
                                } else {
                                    setQty(qty - 1)
                                }
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 4, marginRight: 4 }}>
                            <Controller
                                control={control}
                                name={yQty}
                                render={({ field: { onChange, onBlur, value }, fieldState }) => {
                                    return <TextField
                                        onBlur={onBlur}
                                        onChangeText={(text) => {
                                            if (text !== '') {
                                                setQty(parseInt(text))
                                                onChange(text)
                                            } else {
                                                setQty(0)
                                                onChange(0)
                                            }
                                            return
                                        }}
                                        value={String(getValues(yQty))}
                                        defaultValue={String(getValues(yQty))}
                                        error={fieldState.error != undefined}
                                        underlineColor={colors.primary.main}
                                        mode={'flat'}
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
                name={yNote}
                defaultValue={getValues(yNote)}
                label={t("note_bahan")}
                placeholder={t("note_bahan_placeholder")}
            />
        </Stack >

    )
}