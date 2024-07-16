import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import styles from '@styles/styles';
import { UnderstandButton } from '@components/buttonsComponent';
import { DataProvider } from '@scripts/utils/DataProvider';


interface TooltipProps { 
    modalWindow:boolean;
    textHead:string;
    textBody:string;
    toggleModal: () => void;
    checkBoxChange: (arg0: boolean) => void;
}

export default function TooltipWin({modalWindow, textHead, textBody, toggleModal, checkBoxChange} : TooltipProps): React.ReactElement<TooltipProps> {

    const [isCheckedModalWin, setCheckedModalWin] = useState(false);

    const close = () => {
        toggleModal();
      }


    return(
        <Modal
        visible={modalWindow}
        transparent={true}
       
        >
            <View style={CustomStyles.centeredView}>
                <View 
                style={CustomStyles.modalView}>
                    <Text style={{...styles.textTitle, ...styles.textModalWindow}}>{textHead}</Text>
                    <Text style={{...styles.textDefault, ...styles.textModalWindow}}>{textBody}</Text>
                    <View style={CustomStyles.row}>
                        <Checkbox
                            style={CustomStyles.checkbox}
                            value={isCheckedModalWin}
                            onValueChange={b => {checkBoxChange(b);setCheckedModalWin(b);}}
                            color={isCheckedModalWin ? '#FFB800' : undefined}
                        />
                        <Text style={isCheckedModalWin ? {...styles.textDefault, ...{color: '#FFB800'}} : {...styles.textDefault, ...{color:'#B6FFFB'}}}>Больше не показывать</Text>
                    </View>
                    <UnderstandButton action ={() => close()}></UnderstandButton>
                </View>
            </View>
        </Modal>
        
    )
}

const CustomStyles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop:5,
      },
    close:{
        alignSelf: 'flex-end',
        top: 5,
        right: 5,
        position: 'absolute',
    },
    checkbox: {
        margin: 8,
      },
    centeredView: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(35, 35, 35, 0.7)",
    },
    modalView: {
        width: (Dimensions.get('window').width) * 0.9,
        backgroundColor: '#93949A',
        borderRadius: 8,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
})