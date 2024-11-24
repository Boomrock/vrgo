import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions, Touchable} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import styles from '@styles/styles';
import { Cross, FullButton} from '@components/buttonsComponent';
import i18n from '@scripts/localization/i18next';
import {ParagraphRenderer} from '@components/Modal/ModalUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalStyles from './ModalStyle';


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
            <View style={ModalStyles.centeredView}>
                <View style={ModalStyles.modalView}>
                    <View style={ModalStyles.close}><Cross action={toggleModal}/></View>

                    <View style={{width: '100%'}}>
                        <Text style={{...styles.textTitle, ...styles.textModalWindow}}>{textHead}</Text>
                        {ParagraphRenderer.renderParagraphs(textBody, {...styles.textDefault, ...styles.textModalWindow, marginBottom: 10})}
                        <FullButton action ={() => close()} text={i18n.t("Understand")}/>
                    </View>
                </View>
            </View>
        </Modal>
        
    )
}
