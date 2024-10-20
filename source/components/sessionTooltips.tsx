import { View, StyleSheet, TouchableOpacity, Text, Modal} from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import EventEmitter, { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { SessionEvent } from '@scripts/models/Session';
import OneButtonWin from './Modal/oneButtonWin';
import Clarification from './Modal/clarificationWin';
import { FullOrangeButton, NextButtonEnabling, SimpleButton, StartButton } from './buttonsComponent';
import i18n from '@scripts/localization/i18next';

export interface tooltipProp {
    FirstWidth: number;
    FirstHeight: number;
    SecondWidth: number;
    margin: number;



    StartButtonTitle: string;
    NextButtonAction: () => void;

    // Необязательные параметры
    StartTimer?: () => void;
    StopTimerAction?: () => void; 
    ContinueTimerAction?: () => void;
    NumbOfReps?: number; // Если не передавать - будет работать с таймером
    emitter?: EventEmitter; 
    // Необязательные параметры
}

export default function SessionTooltips(prop: tooltipProp) {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [nextButtonEnable, setNextButtonEnable] = useState<boolean>(false);
    const [timerRunning, setTimerRunning] = useState(false);
    const [countExerciseModalVisible, setCountExerciseModalVisible] = useState(false);
    const [timerExerciseModalVisible, setTimerExerciseModalVisible] = useState(false);
    const [listener, setListener] = useState<EmitterSubscription>();

    const startTimer =() =>
        {
            if(prop.emitter){
            setTimerRunning(false)
              let emitterListener = prop.emitter.addListener(SessionEvent.timerOverNotify, ()=>{ stopTimer(); setNextButtonEnable(true); setTimerRunning(false);});
              setListener(emitterListener);
            }
            prop.StartTimer!();
            setTimerRunning(true)
            setIsActive(false);
        }

    const stopTimer = () =>
        {
            setIsActive(true)
            prop.StopTimerAction!();
            if(listener){
              listener.remove();
            }
        }
    const nextButtonHandler =()=>{
      if(!nextButtonEnable){
        
        if(!timerRunning) return;
        
        setTimerExerciseModalVisible(true);
        return;
      }
      

      prop.NextButtonAction();
    }
    //TEXT
    let textBodyModal: string = i18n.t('We recommend repeating for each');
    return (
      <View style={{...styles.btnContainer, margin: prop.margin}}>


        {prop.NumbOfReps && <OneButtonWin modalWindow = {countExerciseModalVisible} textHead = {i18n.t('Do times').replace("{Count}", prop.NumbOfReps!.toString())} textBody = {textBodyModal} toggleModal ={() => setCountExerciseModalVisible(false)}/>}
        <Clarification 
        isVisibleWindow = {timerExerciseModalVisible && timerRunning} 
        //TEXT
        header={i18n.t('Ups!')}  
        body={i18n.t("Repeat timer exercise")} 
        textBut1={i18n.t("Go to next")} 
        textBut2={i18n.t("Continue the exercise")}
        agreeHandler={() => setTimerExerciseModalVisible(false)} 
        disagreeHandler={()=> prop.NextButtonAction()}
        toggleModal={() => setTimerExerciseModalVisible(false)}/>

        {prop.NumbOfReps ? ( // Если упражнение на кол-во
          <>
            <View style={{width: prop.FirstWidth, height: prop.FirstHeight}}>
              <SimpleButton text={i18n.t('Do times').replace("{Count}", prop.NumbOfReps.toString())} enabled={true} 
              leftCorner={true} action={() => setCountExerciseModalVisible(true)}/>
            </View>
            <View style={{width: prop.SecondWidth}} >
               <NextButtonEnabling action={prop.NextButtonAction} text={i18n.t('Next')} enabled={true} />
            </View>
          </>
        ) : (

          !isActive ? (
            <View style={{flex:1, width:'100%'}} >
              <FullOrangeButton action={stopTimer} enabled={true} text={prop.StartButtonTitle}/>
            </View>
          ) : (
            <>
              <View style={{width: prop.FirstWidth, height: prop.FirstHeight}}>
                <StartButton text={prop.StartButtonTitle} action={startTimer}/>
              </View>
              <View style={{width: prop.SecondWidth}} >
                <NextButtonEnabling action={prop.NextButtonAction} text={i18n.t('Next')} enabled={true} />  
              </View>
            </>
          )
        )}
      </View>
    );
}


const styles = StyleSheet.create({
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'flex-end',
      backgroundColor: '#232323'
    }
  })