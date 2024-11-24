import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import styles from '@styles/styles';
import { Cross, FullButton } from '@components/buttonsComponent';
import { DataProvider } from '@scripts/utils/DataProvider';
import i18n from '@scripts/localization/i18next';
import { ParagraphRenderer } from './ModalUtils';
import ModalStyles from './ModalStyle';


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
        transparent={true}>
            <View style={ModalStyles.centeredView}>
                <View style={ModalStyles.modalView}>
                <View style={ModalStyles.close}><Cross action={toggleModal}/></View>

                    <Text style={{...styles.textTitle, ...styles.textModalWindow}}>{textHead}</Text>
                    {ParagraphRenderer.renderParagraphs(textBody,{...styles.textDefault, ...styles.textModalWindow})}
                    
                    <View style={ModalStyles.checkBoxRow}>
                        <Checkbox
                            style={ModalStyles.checkbox}
                            value={isCheckedModalWin}
                            onValueChange={value => {checkBoxChange(value); setCheckedModalWin(value);}}
                            color={isCheckedModalWin ? '#FFB800' : undefined}
                        />
                        <Text style={isCheckedModalWin ? {...styles.textDefault, ...{color: '#FFB800'}} : {...styles.textDefault, ...{color:'#B6FFFB'}}}>{i18n.t("Do not show again")}</Text>
                    </View>
                    <FullButton action ={() => close()} text={i18n.t("Understand")}/>
                </View>
            </View>
        </Modal>
        
    )
}
