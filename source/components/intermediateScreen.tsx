import { Timer } from '@scripts/utils/Timer';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '@styles/styles';
import { FullButton } from './buttonsComponent';
import i18n from '@scripts/localization/i18next';

interface IntermediateScreenProps {
  nextButtonAction: () => void;
  completedExercises: number;
  totalExercises: number;
}

const IntermediateScreen: React.FC<IntermediateScreenProps> = ({ nextButtonAction, completedExercises: executeExerciseCount, totalExercises: allExerciseCount }) => {
  
  const [time, setTime] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

  const [timer, setTimer] = useState(new Timer(10, ()=>
  {
    clearInterval(intervalId); 
    nextButtonAction();
  })) 

  const numberToTime = (runTime: number): string => {
    const totalSeconds = Math.ceil(runTime / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(()=>{
    const id = setInterval(()=>{
      setTime(numberToTime(timer.runTime));
    }, 1000)
    setIntervalId(id);
    timer.start();
    setTime(numberToTime(timer.runTime));


  },[])
  const nextExercise = () => {
    timer.stop();
  }
  return (
    <View style={{...styles.container, padding: 10}}>
      <View style={{flex: 1}}>
        <Text style ={{...styles.textTitle, color:'#fff', marginTop: 40}}>{i18n.t("Break")}</Text>
        <Text style ={{...styles.textDefault, color:'#fff', fontSize: 18, margin: 10, marginRight: 0 }}>{i18n.t("Take a break")}</Text>
        <Text style ={{...styles.textTitle, color:'#fff', margin: 10}}>{time} {i18n.t("Remaining")}</Text>
        <Text style ={{...styles.textDefault, color:'#B6FFFB', fontSize: 18, margin: 10, marginRight: 0 }}>{executeExerciseCount}/{allExerciseCount} i18n.t("Exercises completed")</Text>
      </View>
      <FullButton action={nextExercise} text={i18n.t('Next')}/>
    </View>
  );
};

export default IntermediateScreen;
