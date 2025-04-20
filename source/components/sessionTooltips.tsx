import { View, StyleSheet } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import EventEmitter, { EmitterSubscription } from 'react-native/Libraries/vendor/emitter/EventEmitter';
import { SessionEvent } from '@scripts/models/Session';
import OneButtonWin from './Modal/oneButtonWin';
import Clarification from './Modal/clarificationWin';
import { FullOrangeButton, NextButtonEnabling, SimpleButton, StartButton } from './buttonsComponent';
import i18n from '@scripts/localization/i18next';
import React from 'react';

export interface TooltipProp {
    FirstWidth: number;
    FirstHeight: number;
    SecondWidth: number;
    margin: number;
    StartButtonTitle: string;
    NextButtonAction: () => void;

    // Optional parameters
    StartTimer?: () => void;
    StopTimerAction?: () => void; 
    ContinueTimerAction?: () => void;
    NumbOfReps?: number; // If not provided, will work with the timer
    emitter?: EventEmitter; 
}

export default function SessionTooltips(prop: TooltipProp) {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [nextButtonEnable, setNextButtonEnable] = useState<boolean>(false);
    const [timerIsOver, setTimerIsOver] = useState(false);
    const [countExerciseModalVisible, setCountExerciseModalVisible] = useState(false);
    const [timerExerciseModalVisible, setTimerExerciseModalVisible] = useState(false);
    const [repeatExerciseModalVisible, setRepeatExerciseModalVisible] = useState(false);
    const [listener, setListener] = useState<EmitterSubscription>();
    
    const startTimer = () => {
        if (!prop.emitter) 
        {
            return
        }

        if(!timerIsOver){
            const emitterListener = prop.emitter.addListener(SessionEvent.timerOverNotify, () => { 
                stopTimer(); 
                setNextButtonEnable(true); 
                setTimerIsOver(true);
            });

            setListener(emitterListener);
                    
            prop.StartTimer!();
            setIsActive(false);
        }
        else {
            setRepeatExerciseModalVisible(true);
        }
    };

    const stopTimer = () => {
        setIsActive(true);
        prop.StopTimerAction!();
        if (listener) {
            listener.remove();
        }
    };

    const nextButtonHandler = () => {
        if (!nextButtonEnable) {
            setTimerExerciseModalVisible(true);
            return;
        }
        prop.NextButtonAction();
    };
    const repeatExercise = () => { 
        setRepeatExerciseModalVisible(false);
        setTimerIsOver(false);
    };

    // TEXT
    const textBodyModal: string = i18n.t('We recommend repeating for each');

    return (
        <View style={{ ...styles.btnContainer, margin: prop.margin }}>
            {prop.NumbOfReps && (
                <OneButtonWin 
                    modalWindow={countExerciseModalVisible} 
                    textHead={i18n.t('Do times').replace("{Count}", prop.NumbOfReps!.toString())} 
                    textBody={textBodyModal} 
                    toggleModal={() => setCountExerciseModalVisible(false)} 
                />
            )}
            
            {/* MODAL */}
            <Clarification 
                isVisibleWindow={timerExerciseModalVisible} 
                header={i18n.t('Ups!')}  
                body={i18n.t("Repeat timer exercise")} 
                agreeButton={i18n.t("Continue the exercise")}
                disagreeButton={i18n.t("Go to next")} 
                agreeHandler={() => setTimerExerciseModalVisible(false)} 
                disagreeHandler={() => prop.NextButtonAction()}
                toggleModal={() => setTimerExerciseModalVisible(false)}
            />
            <Clarification 
                isVisibleWindow={repeatExerciseModalVisible} 
                header={i18n.t('Want to repeat?')}  
                body={i18n.t("You've already pressed start")} 
                agreeButton={i18n.t("Repeat the exercise")}
                disagreeButton={i18n.t("Go to next")} 
                agreeHandler={repeatExercise} 
                disagreeHandler={() => prop.NextButtonAction()}
                toggleModal={() => setRepeatExerciseModalVisible(false)}
            />
            {/* END MODAL */}

            {prop.NumbOfReps ? ( // If exercise is for a number of reps
                <>
                    <View style={{ width: prop.FirstWidth, height: prop.FirstHeight }}>
                        <SimpleButton 
                            text={i18n.t('Do times').replace("{Count}", prop.NumbOfReps.toString())} 
                            enabled={true} 
                            leftCorner={true} 
                            action={() => setCountExerciseModalVisible(true)}/>
                    </View>
                    <View style={{ width: prop.SecondWidth }}>
                        <NextButtonEnabling 
                            action={prop.NextButtonAction} 
                            text={i18n.t('Next')} 
                            enabled={true}/>
                    </View>
                </>
            ) : (
                !isActive ? (
                    <View style={{ flex: 1, width: '100%' }}>
                        <FullOrangeButton 
                            action={stopTimer} 
                            enabled={true} 
                            text={prop.StartButtonTitle}/>
                    </View>
                ) : (
                    <>
                        <View style={{ width: prop.FirstWidth, height: prop.FirstHeight }}>
                            <StartButton 
                                text={prop.StartButtonTitle} 
                                action={startTimer}
                                disableAction={startTimer}
                                enabled = {!timerIsOver}/>
                        </View>
                        <View style={{ width: prop.SecondWidth }}>
                            <NextButtonEnabling 
                                action={prop.NextButtonAction} 
                                disableAction={nextButtonHandler} 
                                text={i18n.t('Next')} 
                                enabled={nextButtonEnable}/>  
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
        backgroundColor: '#232323',
    },
});

