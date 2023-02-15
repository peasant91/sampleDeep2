import React, { useEffect } from 'react'
import { Linking, Platform, View } from 'react-native'
import Typography from '../../tmd/components/Typography/Typography'
import { colors } from '../../tmd/styles/colors'
import ICLogo from '../assets/illusts/icon_logo.svg'
import { getVersion, getApplicationName } from 'react-native-device-info'
import clientVersioning from '../utils/network/clientVersioning'
import { useBottomSheet } from '../../tmd/providers/BottomSheetProvider'
import { useModal } from '../../tmd/providers/ModalProvider'

interface Props {
    onFinish: () => void
}

const SplashScreen = ({ onFinish }: Props) => {
    const version = getVersion()
    const { showErrorBS,showAlertBS } = useBottomSheet()
    const { showAlertModal,hideAlertModal } = useModal()

    useEffect(() => {
        checkVersioning()
    }, [])

    const checkVersioning = async () => {
        try {
            const response = await clientVersioning.get('/version', {
                params: {
                    version: version,
                    package: Platform.OS === 'android' ? "com.adijayautama.app" : "com.adijayautama.ios"
                }
            })
            const data = response.data.data
            console.log("data",data);
            
            if (data.need_update === true) {
                //show update
                console.log("need update");
                showAlertModal({
                    dismissible: false,
                    title: "Perhatian",
                    description: data.is_major === true ? "Untuk lanjut anda harus install aplikasi versi terbaru !" : "Untuk memberikan pengalaman terbaik, silahkan perbaharui aplikasi !",
                    buttonPrimaryTitle: "Unduh",
                    buttonPrimaryAction: () => {
                        if (Platform.OS === 'android') {
                            Linking.openURL('market://details?id=com.adijayautama.app')
                        } else {
                            Linking.openURL('https://adijayautama.com/download')
                        }
                    },
                    buttonSecondary: data.is_major === false,
                    buttonSecondaryTitle: "Lewati",
                    buttonSecondaryAction: ()=>{
                        hideAlertModal()
                        onFinish()
                    }
                })
            } else {
                //finish
                console.log("no need update");
                onFinish()
            }
        } catch (e) {
            showAlertBS({
                title: e.name,
                description: e.message,
                buttonPrimaryTitle: "Muat Ulang",
                buttonPrimaryAction: ()=>{
                    checkVersioning()
                }
            })
        }
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
                <ICLogo style={{ width: '80%', alignSelf: 'center' }} />
            </View>

            <View style={{ position: 'absolute', bottom: 16, alignSelf: 'center' }}>
                <Typography type='body1' style={{ color: colors.neutral.neutral_90 }}>Versi {version}</Typography>
            </View>
        </>
    )
}

export default SplashScreen;