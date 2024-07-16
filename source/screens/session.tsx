import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BackButtonLittle, StartButtonEmpty } from '@components/buttonsComponent';
import ExerciseComponent from '@components/exerciseComponent';
import { ClearStackAndNavigate} from '@navigations/navigate';
import { disp_height, disp_width } from '@scripts/utils/Const';
import { useContext, useEffect, useState } from 'react';
import { Session, SessionEvent } from '@scripts/models/Session';
import { Exercise } from '@scripts/models/Exercise/Exercise';
import TooltipWin from '../components/Modal/tooltipWin';
import SessionTooltips, { tooltipProp } from '@components/sessionTooltips';
import ExerciseProgression from '@components/exerciseProgression';
import { allExercises, Pathology, BodyPart, ExerciseType } from '@scripts/descriptionOfExercises/allExercises';
import { NavigationContext } from '@navigations/navigate';
import { IDataProvider, Path } from '@scripts/interfaces/content-provider/IDataProvider';
import { ExerciseSelectorBuilder } from '@scripts/utils/Selector';
import IntermediateScreen from '@components/intermediateScreen';
import { ExerciseStep } from '@scripts/models/Exercise/ExerciseStep';
import { Screens } from '@navigations/Screens';
import { DataProvider } from '@scripts/utils/DataProvider';

var sessionDefault = new Session();
export default function SessionScreen({ navigation }: { navigation: any }) {
  var [session, setSession] = useState<Session>(sessionDefault);
  var [sessionStarted, setSessionStarted] = useState(false);
  var [runTime, setRunTime] = useState(0);
  var [exercise, setExercise] = useState(Exercise.emptyExercise);
  var [completedExercises, setCompletedExercises] = useState(0);
  var [totalExercises, setTotalExercises] = useState(0);
  var [savedChoseModalVisible, setSavedChoseModalVisible] = useState(false);
  const [isViewIntermediateScreen, setIsViewIntermediateScreen ] = useState(false);


  const {data, setData} = useContext(NavigationContext);
  let pathology: string | null
  let affectedRegion: string[] = []
  let exercises: Exercise[] = []
  let dataProvider = data.dataProvider as IDataProvider;
  let tooltipTimerEvent : () => void = () => {};

  useEffect(() => {
    const emitter = session!.emitter;
    emitter.addListener(SessionEvent.refreshExerciseNotify, refreshExerciseHandler);
    emitter.addListener(SessionEvent.refreshRunTimeNotify, refreshRunTimeHandler);
    emitter.addListener(SessionEvent.closeSessionNotify, clearStackAndNavigate);
    emitter.addListener(SessionEvent.timerOverNotify, tooltipTimerEvent);

    dataProvider.Get<boolean>(Path.sessionChooseModal).then( 
      choose =>{
        if(choose){
          setSavedChoseModalVisible(choose);
        }
        else{
          setSavedChoseModalVisible(false);
        }
    })


    fetchData().then(processExercises).then(initSession)
    },[])

  const fetchData = async () => {
    const [pathologyResult, bodyPartResult] = await Promise.all([
      dataProvider.GetSerializable(Path.pathology),
      dataProvider.GetSerializable(Path.choseBodyPart)
    ]);

    if (pathologyResult != null) {
      
      const parsedData = JSON.parse(pathologyResult);
      pathology = parsedData.label;
      
    }

    if (bodyPartResult != null) {
      const parsedData = JSON.parse(bodyPartResult);
      const { isCheckedRightHand, isCheckedLeftHand, isCheckedRightLeg, isCheckedLeftLeg } = parsedData;

      if (isCheckedRightHand || isCheckedLeftHand) affectedRegion.push("Рука")
      if (isCheckedRightLeg || isCheckedLeftLeg) affectedRegion.push("Нога")
        
    }

    allExercises.forEach(element => {
      element.exercises.forEach(exercise => {
        const steps = exercise.steps.map(value => {
          return new ExerciseStep(value.instruction, value.image, value.type);
        })

        let ex = new Exercise(exercise.executeTime, exercise.description, steps, exercise.perface, exercise.exerciseType, exercise.CountOfRepeat)

        ex.bodyPart = element.bodyPart
        ex.pathology = element.pathology

        exercises.push(ex)
      })
    });
  };

  const processExercises = () => {
    session.clear();
    let selectorBuilder = new ExerciseSelectorBuilder()
    if (affectedRegion.length != 0 && pathology != null) {
      let selector = selectorBuilder.AddAffectedRegion(affectedRegion).AddPathology(pathology).Build()
      selector.Select(exercises).forEach(exercise => {
        console.debug(exercise)
        session!.enqueue(exercise)
      });
    }
  };

  const initSession = () => {
    setTotalExercises(session!.getQueueLength());
    setCompletedExercises(0);

    let ex = session!.dequeue();
    setExercise(ex!);
  }
  const refreshRunTimeHandler = (runTime: number) => {
    setRunTime(runTime);
  };

  const clearStackAndNavigate = () => {
    ClearStackAndNavigate(navigation, Screens.MainScreen);
  };

  const text_1: string = "Желательно выполнять под присмотром или с тростью \n После ознакомления с инструкцией нажмите 'старт'";
  const [modalWindow, setModalWindow] = useState(true);
  const toggleModal = () => {
    setModalWindow(!modalWindow);
  };
  const nextExercise = () => { 
    session!.dequeue();
    setIsViewIntermediateScreen(false);
  }
  const refreshExerciseHandler = () => {
    setExercise(session!.currentExercise!)
    setCompletedExercises(i => i + 1);
  }

  const numberToTime = (runTime: number): string => {
    const totalSeconds = Math.ceil(runTime / 1000);

    if(totalSeconds <= 0) return `Start`;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  const viewIntermediateScreen = () => {
    setIsViewIntermediateScreen(true)
  }

  const checkBoxChange = (arg: boolean) => {
    dataProvider.Set<boolean>(arg, Path.sessionChooseModal);
  }
  let tooltipProps :tooltipProp = {
    FirstWidth: disp_width * 1 / 2 * 0.851,
    FirstHeight: disp_height / 16,
    margin: 16, // Вот сюда передаем margin всех остальных элементов в content
    StartButtonTitle: numberToTime(runTime),
    SecondWidth: disp_width * 2 / 3 * 0.668,
    NextButtonAction: viewIntermediateScreen,
  };
  if(session.currentExercise){
    if(session.currentExercise.exerciseType === ExerciseType.COUNT){
      tooltipProps.NumbOfReps = session.currentExercise.countOfReapeat;
    }
    else{
      tooltipProps.StartTimer = session!.startTimer,
      tooltipProps.StopTimerAction = session!.stopTimer;
      tooltipProps.emitter =  session!.emitter;
    }
  }
  return (
    <>
      <View style={styles.container}>
        <TooltipWin
          modalWindow={modalWindow && !savedChoseModalVisible}
          textHead='Инструкция'
          textBody={text_1}
          toggleModal={toggleModal}
          checkBoxChange={checkBoxChange}
        />
        <View />

        <View style={styles.top_navbar}>
          <BackButtonLittle action={clearStackAndNavigate} />
          <ExerciseProgression currentExercise={completedExercises} totalExercises={totalExercises} />
          
        </View>
        {isViewIntermediateScreen ? 
        (<IntermediateScreen nextButtonAction={nextExercise} totalExercises={totalExercises} completedExercises={completedExercises} /> ):
        (
          <View style={{flex: 1,
            justifyContent: 'flex-end', height:'100%'}}>
          <ExerciseComponent exercise={exercise} />
          <SessionTooltips {...tooltipProps}/>
          </View>
        )}
  
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },
  top_navbar: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
});
