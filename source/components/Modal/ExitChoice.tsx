import * as React from 'react';
import { Text,Modal, View, Dimensions} from 'react-native';
import styles from '@styles/styles';
import { BackButton, Cross, FullCaretLeftButton } from '@components/buttonsComponent';
import ModalStyles from './ModalStyle';

interface TooltipProps { 
    modalWindow:boolean;
    header:string;
    action1: () => void;
    action2: () => void;
    textBut1:string;
    textBut2:string;
    toggleModal: () => void
}

export default function ExitChoice({modalWindow, header, textBut1, textBut2, action1, action2, toggleModal} : TooltipProps): React.ReactElement<TooltipProps> {

    return(
        <Modal
           visible={modalWindow}
           transparent={true}
           onRequestClose={toggleModal}>
                <View style={ModalStyles.centeredView}>
                    <View style={ModalStyles.modalView}>
                    <View style={ModalStyles.close}><Cross action={toggleModal}/></View>

                        <View>
                            <Text style={styles.textTitle}>{header}</Text>
                            <View style={{marginVertical:10}}>
                                <BackButton action={() =>{action1(); toggleModal();}} text={textBut1}/>
                            </View>
                            <FullCaretLeftButton action={() => {action2(); toggleModal();}} text={textBut2} />
                        </View>       
                    </View>
                </View>
           </Modal>
        
    )
}

