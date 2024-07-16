import { View, StyleSheet, TouchableOpacity, Text, Modal} from 'react-native';
import { StartButtonEmpty, NextButtonEnablingDark, RunningExerciseButton} from './buttonsComponent';
import { useEffect, useMemo, useState } from 'react';
import EventEmitter, { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { SessionEvent } from '@scripts/models/Session';
import OneButtonWin from './Modal/oneButtonWin';
import Clarification from './Modal/clarificationWin';

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
              let emitterListener = prop.emitter.addListener(SessionEvent.timerOverNotify, ()=>{ stopTimer();setNextButtonEnable(true); setTimerRunning(false);});
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
        setTimerExerciseModalVisible(true);
        return;
      }

      prop.NextButtonAction();
    }
    let textBodyModal: string = `Столько мы рекомендуем делать повтор упражнения на каждую гемиплегичную часть тела`;
    return (
      <View style={{...styles.btnContainer, margin: prop.margin}}>


        <OneButtonWin modalWindow = {countExerciseModalVisible} textHead = {`По ${prop.NumbOfReps} раз`} textBody = {textBodyModal} toggleModal ={() => setCountExerciseModalVisible(false)}/>
        <Clarification 
        isVisibleWindow = {timerExerciseModalVisible && timerRunning} 
        header={'Упс!'}  
        body={'Вы еще не прошли упражнение по таймеру до конца, если это упражнение уже было — повторите еще раз'} 
        textBut1='Перейти к следущему' 
        textBut2='Продолжить упражнение' 
        agreeHandler={() => setTimerExerciseModalVisible(false)} 
        disagreeHandler={()=> prop.NextButtonAction()}
        toggleModal={() => setTimerExerciseModalVisible(false)}/>

        {prop.NumbOfReps ? ( // Если упражнение на кол-во
          <>
            <View style={{width: prop.FirstWidth, height: prop.FirstHeight}}>
              <StartButtonEmpty title={`${prop.NumbOfReps} раз`} enabled={true} 
              action={() => setCountExerciseModalVisible(true)}/>
            </View>
            <View style={{width: prop.SecondWidth}} >
               <NextButtonEnablingDark action={prop.NextButtonAction} title='Next' enabled={true} />
            </View>
          </>
        ) : (
          // Если переменной NumbOfReps нет, то проверяем isActive
          !isActive ? (
            <RunningExerciseButton action={stopTimer} enabled={true} title={prop.StartButtonTitle}/>
          ) : (
            <>
              <View style={{width: prop.FirstWidth, height: prop.FirstHeight}}>
                <StartButtonEmpty title={prop.StartButtonTitle} enabled={true} action={startTimer}/>
              </View>
              <View style={{width: prop.SecondWidth}} >
                  <NextButtonEnablingDark action={nextButtonHandler} title='Next' enabled={nextButtonEnable} />
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