import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Button, Divider, Page, RHFTextField, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import { BahanModel } from '../models/spb/bahan'
import AppNavigationType from '../navigations/AppNavigationType'
import AddBahanCell from './AddBahanCell'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddBahan({ route }: NativeStackScreenProps<AppNavigationType, "AddBahan">) {
    const { t } = useTranslation()
    const { defaultBahan } = route.params
    const [listBahan, setListBahan] = useState<BahanModel[]>([])

    const schema = yup.object({
        name: yup.string().required().label(t("nama_bahan")),
        unit: yup.string().required().label(t("unit_bahan")),
        note: yup.string().optional().label(t("note_bahan")),
        qty: yup.number().required().label(t("jumlah"))
    }).required();

    const arrayOfSchema = yup.object({
        values: yup.lazy((value) => yup.array().of(schema))
    })

    interface FormValues {
        values: {
            name: string
            qty: number
            unit: string
        }[]
    }

    const method = useForm<FormValues>({
        defaultValues: {
            values: [
                {
                    qty: 10,
                    name: "",
                    unit: ""
                },
            ]
        },
        resolver: yupResolver(arrayOfSchema),
    });


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<FormValues>({
        control: method.control,
        name: "values"
    })

    const { handleSubmit } = method;

    const addMore = () => {
        setListBahan([...listBahan, {
            nama: "",
            unit: "",
            quantity: 1
        }])
    }

    const onSubmit = (data: any) => {
        console.log("ANJENG ON SUBMIT")
        console.log(JSON.stringify(data, null, 2));
    };

    const onError = (errors: any) => {
        console.log("ANJENG ON ERROR", errors)
        console.log(JSON.stringify(errors, null, 2));
    };

    useEffect(() => {
        if (defaultBahan.length == 0) {
            setListBahan([{
                nama: "",
                unit: "",
                quantity: 1
            }])
        } else {
            setListBahan(defaultBahan)
        }
    }, [defaultBahan])

    useEffect(() => {
    }, [])

    return (
        <Page>
            <Toolbar title={t("add_bahan")} />
            <ScrollView>
                <Stack>
                    <FormProvider {...method}>
                        {listBahan.map(function (item, index) {
                            return (
                                <>
                                    <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                                        <Controller
                                            control={method.control}
                                            render={(_render) => {
                                                return <AddBahanCell
                                                    yName={`values.${index}.name`}
                                                    yQty={`values.${index}.qty`}
                                                    yNote={`values.${index}.note`}
                                                    yUnit={`values.${index}.unit`}
                                                    onDelete={() => {
                                                        const item = listBahan
                                                        setListBahan(listBahan.splice(index, 1))
                                                    }}
                                                    item={item}
                                                    index={index} />
                                            }}
                                            name={`values.${index}`} />
                                    </View>
                                    <Divider />
                                </>
                            )
                        })}

                        <Button
                            onPress={addMore}
                        >AddMore</Button>
                        <Button
                            onPress={handleSubmit(onSubmit, onError)}
                        >Pisang</Button>
                    </FormProvider>
                </Stack>

            </ScrollView>
        </Page>
    )
}