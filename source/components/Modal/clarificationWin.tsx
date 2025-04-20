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
    agreeButton:string;
    disagreeButton:string;
    toggleModal: () => void
}

export default function Clarification({isVisibleWindow: modalWindow, header, body, agreeButton, disagreeButton, agreeHandler, disagreeHandler, toggleModal} : TooltipProps): React.ReactElement<TooltipProps> {

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
                                <FullTransparentButton action={() => disagreeHandler()} text={disagreeButton}/>
                            </View>
                            <FullButton action={() => agreeHandler()} text={agreeButton} />
                        </View>       
                    </View>
                </View>
           </Modal>
        
    )
}

