import { Timer } from '@scripts/utils/Timer';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '@styles/styles';
import { NextButtonLightWide } from './buttonsComponent';

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
        <Text style ={{...styles.textTitle, color:'#fff', marginTop: 40}}>Перерыв</Text>
        <Text style ={{...styles.textDefault, color:'#fff', fontSize: 18, margin: 10, marginRight: 0 }}>Между упражнениями сделайте перерыв для восстановления сил</Text>
        <Text style ={{...styles.textTitle, color:'#fff', margin: 10}}>{time} Осталось</Text>
        <Text style ={{...styles.textDefault, color:'#B6FFFB', fontSize: 18, margin: 10, marginRight: 0 }}>{executeExerciseCount}/{allExerciseCount} упражнений завершено</Text>
      </View>
      <NextButtonLightWide action={nextExercise}/>
    </View>
  );
};

export default IntermediateScreen;
