import * as React from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions} from 'react-native';
import styles from '@styles/styles';
import { ParagraphRenderer } from './ModalUtils';
import { Cross, FullButton, FullTransparentButton } from '@components/buttonsComponent';
import ModalStyles from './ModalStyle';

interface TooltipProps { 
    isVisibleWindow:boolean;
    header:string;
    body:string;
    agreeHandler: () => void;
    disagreeHandler: () => void;
    textBut1:string;
    textBut2:string;
    toggleModal: () => void
}

export default function Clarification({isVisibleWindow: modalWindow, header, body, textBut1, textBut2, agreeHandler, disagreeHandler, toggleModal} : TooltipProps): React.ReactElement<TooltipProps> {

    return(
        <Modal
           visible={modalWindow}
           transparent={true}>
                <View style={ModalStyles.centeredView}>
                    <View style={ModalStyles.modalView}>
                        <Cross action={toggleModal} externalStyles={ModalStyles.close}/>

                        <View>
                            <Text style={styles.textTitle}>{header}</Text>
                            {ParagraphRenderer.renderParagraphs(body, {...styles.textDefault, ...styles.textModalWindow})}
                            <View style={{marginVertical:10}}>
                                <FullTransparentButton action={() => disagreeHandler()} text={textBut1}/>
                            </View>
                            <FullButton action={() => agreeHandler()} text={textBut2} />
                        </View>       
                    </View>
                </View>
           </Modal>
        
    )
}

