import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import styles from '@styles/styles';
import { UnderstandButton } from '@components/buttonsComponent';


interface Props { 
    modalWindow:boolean;
    textHead:string;
    textBody:string;
    toggleModal: () => void
}

export default function OneButtonWin({modalWindow, textHead, textBody, toggleModal} : Props): React.ReactElement<Props> {

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
                    <View style={{width: '100%'}}>
                        <Text style={{...styles.textTitle, ...styles.textModalWindow}}>{textHead}</Text>
                        <Text style={{...styles.textDefault, ...styles.textModalWindow}}>{textBody}</Text>
                        <UnderstandButton action ={() => close()}></UnderstandButton>

                    </View>
                </View>
            </View>
        </Modal>
        
    )
}

const CustomStyles = StyleSheet.create({
    close:{
        alignSelf: 'flex-end',
        top: 5,
        right: 5,
        position: 'absolute',
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
        paddingLeft: 10,
        paddingRight: 10, 
        alignItems: 'center',
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