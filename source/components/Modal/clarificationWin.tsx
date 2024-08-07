import { ContinueExerciseButton, NextButtonLightWide, NextExerciseButton, UnderstandButton } from '@components/buttonsComponent';
import * as React from 'react';
import { StyleSheet, Text, Button, Modal, View, Dimensions} from 'react-native';
import styles from '@styles/styles';
import { AntDesign } from '@expo/vector-icons';

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
           transparent={true}
           >
                <View style={CustomStyles.centeredView}>
                    <View style={CustomStyles.modalView}>
                        <View>
                            <Text style={styles.textTitle}>{header}</Text>
                            <Text style={styles.textModalWindow}>{body}</Text> 
                            <NextExerciseButton action={() => disagreeHandler()} styles={{width:'100%'}}/>
                            <ContinueExerciseButton action={() => agreeHandler()} styles={{width:'100%'}}/>
                        </View>       
                    </View>
                </View>
           </Modal>
        
    )
}

const CustomStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "ffff0000",
        marginTop: 22,
    },
    modalView: {
        width: '90%',
        backgroundColor: '#93949A',
        borderRadius: 8,
        padding:10,
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
    checkbox: {
        margin: 8,
    },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    close:{
        alignSelf: 'flex-end',
        position: 'absolute',
    },
})