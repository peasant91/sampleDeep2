import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Button, Colors, Divider, Page, RHFTextField, Stack, Toolbar } from '../../tmd'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import { BahanModel } from '../models/spb/bahan'
import AppNavigationType from '../navigations/AppNavigationType'
import AddBahanCell from './AddBahanCell'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { fill, values } from 'lodash'
import ListItem from '../../tmd/components/List/ListItem'
import { goBack } from '../navigations/RootNavigation'
import { print } from '@gorhom/bottom-sheet/lib/typescript/utilities/logger'

export default function AddBahan({ route }: NativeStackScreenProps<AppNavigationType, "AddBahan">) {
    const { t } = useTranslation()
    const { defaultBahan, save } = route.params
    const [listBahan, setListBahan] = useState<BahanModel[]>([])

    const schema = yup.object({
        id: yup.number().optional(),
        name: yup.string().required().label(t("nama_bahan")),
        unit: yup.string().required().label(t("unit_bahan")),
        notes: yup.string().optional().label(t("note_bahan")),
        quantity: yup.number().required().label(t("jumlah"))
    }).required();

    const arrayOfSchema = yup.object({
        values: yup.lazy((value) => yup.array().of(schema))
    })

    interface FormValues {
        values: BahanModel[]
    }

    const method = useForm<FormValues>({
        defaultValues: {
            values: listBahan
        },
        resolver: yupResolver(arrayOfSchema),
    });


    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray<FormValues>({
        control: method.control,
        name: "values"
    })

    // const watchAllFields = method.watch(); // when pass nothing as argument, you are watching everything
    // useEffect(() => {
    //     const subscription = method.watch((value, { name, type }) => console.log(JSON.stringify(value, null, 2)))
    //     return () => subscription.unsubscribe();
    // }, [method.watch])


    const { handleSubmit } = method;

    const addMore = () => {
        setListBahan([...method.getValues().values, {
            id: 0,
            name: "",
            unit: "",
            quantity: 1,
            notes: ""
        }])
    }

    const removeBahan = (index: number) => {
        var array = [...method.getValues().values]
        array.splice(index, 1)
        setListBahan(array)
    }

    const onSubmit = (data: any) => {
        const items: BahanModel[] = data['values']
        save(items)
        goBack()
    };

    const onError = (errors: any) => {
        console.log("ANJENG ON ERROR", errors)
        console.log(JSON.stringify(errors, null, 2));
    };

    useEffect(() => {
        if (defaultBahan.length == 0) {
            setListBahan([...method.getValues('values'), {
                id: 0,
                name: "",
                unit: "",
                quantity: 1,
                notes: ""
            }])
            method.reset()
        } else {
            var array: BahanModel[] = []
            defaultBahan.map(function (item, index) {
                array.push(item)
            })
            setListBahan(array)
        }
    }, [defaultBahan])

    useEffect(() => {
        method.setValue('values', [...listBahan])
    }, [listBahan])


    return (
        <Page>
            <Toolbar title={t("add_bahan")} />
            <View style={{ flex: 1}}>
                <ScrollView style={{ flex: 1}}>
                    <Stack>
                        <FormProvider {...method}>
                            {listBahan.map(function (item, index) {
                                return (
                                    <>
                                        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
                                            <Controller
                                                control={method.control}
                                                render={({ field }) => {
                                                    return <AddBahanCell
                                                        yName={`${field.name}.name`}
                                                        yQty={`${field.name}.quantity`}
                                                        yNote={`${field.name}.notes`}
                                                        yUnit={`${field.name}.unit`}
                                                        onDelete={() => {
                                                            removeBahan(index)
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
                                variant='secondary'
                                size='md'
                                icon={{ icon: "add-circle" }}
                                style={{ padding: 16 }}
                                onPress={addMore}
                            >{t("add_more")}</Button>
                        </FormProvider> 

                        <View style={{height: 130 }} />
                    </Stack>

                </ScrollView>

            </View>
            <View style={{ padding: 16, position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: Colors.white }}>
                <Button
                    fullWidth={true}
                    onPress={handleSubmit(onSubmit, onError)}
                >{t("save")}</Button>
            </View>
        </Page>
    )
}