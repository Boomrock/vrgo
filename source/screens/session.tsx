import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, BackHandler } from 'react-native';
import { BackButton, FullBackButton, FullButton } from '@components/buttonsComponent';
import ExerciseComponent from '@components/exerciseComponent';
import { ClearStackAndNavigate } from '@navigations/navigate';
import { disp_height, disp_width } from '@scripts/utils/Const';
import { useContext, useEffect, useRef, useState } from 'react';
import { Session, SessionEvent } from '@scripts/models/Session';
import { Exercise } from '@scripts/models/Exercise/Exercise';
import TooltipWin from '../components/Modal/tooltipWin';
import SessionTooltips, { TooltipProp } from '@components/sessionTooltips';
import ExerciseProgression from '@components/exerciseProgression';
import { allExercises, Pathology, BodyPart, ExerciseType } from '@scripts/descriptionOfExercises/allExercises';
import { NavigationContext } from '@navigations/navigate';
import { IDataProvider, Path } from '@scripts/interfaces/content-provider/IDataProvider';
import { ExerciseSelectorBuilder } from '@scripts/utils/Selector';
import IntermediateScreen from '@components/intermediateScreen';
import { ExerciseStep } from '@scripts/models/Exercise/ExerciseStep';
import { Screens } from '@navigations/Screens';
import { DataProvider } from '@scripts/utils/DataProvider';
import i18n from '@scripts/localization/i18next';
import ExitChoice from '@components/Modal/ExitChoice';

// Вместо useState для session используем useRef, чтобы объект не пересоздавался при ререндере
const sessionDefault = new Session();

export default function SessionScreen({ navigation }: { navigation: any }) {
  // Используем useRef для session
  const sessionRef = useRef<Session>(sessionDefault);

  // Остальные состояния компонента
  const [sessionStarted, setSessionStarted] = useState(false);
  const [runTime, setRunTime] = useState(0);
  const [exercise, setExercise] = useState<Exercise>(Exercise.emptyExercise);
  const [completedExercises, setCompletedExercises] = useState(0);
  const [totalExercises, setTotalExercises] = useState(0);
  const [savedChoseModalVisible, setSavedChoseModalVisible] = useState(true);
  const [isViewIntermediateScreen, setIsViewIntermediateScreen] = useState(false);
  const [cancledViewIntermediateScreen, setCancledViewIntermediateScreen] = useState(true);
  const [instructionModal, setInstructionModal] = useState(true);
  const [exitChoiceModal, setExitChoiceModal] = useState(false);

  const { data, setData } = useContext(NavigationContext);
  let pathology: string | null = null;
  let affectedRegion: string[] = [];
  let exercises: Exercise[] = [];
  let dataProvider = data.dataProvider as IDataProvider;
  let tooltipTimerEvent: () => void = () => {};

  const cancledViewIntermediateScreenRef = React.useRef(cancledViewIntermediateScreen);

  useEffect(() => {
    cancledViewIntermediateScreenRef.current = cancledViewIntermediateScreen;
    setIsViewIntermediateScreen(!cancledViewIntermediateScreen);

  }, [cancledViewIntermediateScreen, isViewIntermediateScreen]);

  useEffect(() => {
    const session = sessionRef.current;
    const emitter = session.emitter;
    emitter.addListener(SessionEvent.refreshExerciseNotify, refreshExerciseHandler);
    emitter.addListener(SessionEvent.refreshRunTimeNotify, refreshRunTimeHandler);
    emitter.addListener(SessionEvent.closeSessionNotify, clearStackAndNavigate);
    emitter.addListener(SessionEvent.timerOverNotify, tooltipTimerEvent);

    dataProvider
      .Get<boolean>(Path.sessionChooseModal)
      .then((choose) => {
        if (choose) {
          setSavedChoseModalVisible(choose);
        } else {
          setSavedChoseModalVisible(false);
        }
      })
      .catch(() => {
        setSavedChoseModalVisible(false);
      });

    fetchData().then(processExercises).then(initSession);

    const backPressHandler = () => {
      setExitChoiceModal(true);
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backPressHandler);

    return () => {
      backHandler.remove(); // Удаляем обработчик при размонтировании
      // При необходимости можно удалить и слушатели событий с emitter
    };
  }, []);

  const fetchData = async () => {
    const [pathologyResult, bodyPartResult] = await Promise.all([
      dataProvider.GetSerializable(Path.pathology),
      dataProvider.GetSerializable(Path.choseBodyPart),
    ]);

    if (pathologyResult != null) {
      const parsedData = JSON.parse(pathologyResult);
      pathology = parsedData.label;
    }

    if (bodyPartResult != null) {
      const parsedData = JSON.parse(bodyPartResult);
      const { isCheckedRightHand, isCheckedLeftHand, isCheckedRightLeg, isCheckedLeftLeg } = parsedData;

      if (isCheckedRightHand || isCheckedLeftHand) affectedRegion.push("Рука");
      if (isCheckedRightLeg || isCheckedLeftLeg) affectedRegion.push("Нога");
    }
    let exerciseBlock = allExercises.find((value) => value.language === i18n.t("language"));
    if (exerciseBlock === null) {
      exerciseBlock = allExercises.find((value) => value.language === "en");
    }

    exerciseBlock?.exercise.forEach((element) => {
      element.exercises.forEach((exercise) => {
        const steps = exercise.steps.map((value) => {
          return new ExerciseStep(value.instruction, value.image, value.type);
        });

        let ex = new Exercise(
          exercise.executeTime,
          exercise.description,
          steps,
          exercise.preface,
          exercise.exerciseType,
          exercise.CountOfRepeat
        );

        ex.bodyPart = element.bodyPart;
        ex.pathology = element.pathology;

        exercises.push(ex);
      });
    });
  };

  const processExercises = () => {
    const session = sessionRef.current;
    session.clear();
    let selectorBuilder = new ExerciseSelectorBuilder();
    if (affectedRegion.length !== 0 && pathology != null) {
      let selector = selectorBuilder.AddAffectedRegion(affectedRegion).AddPathology(pathology).Build();

      selector.Select(exercises).forEach((exercise) => {
        session.enqueue(exercise);
      });
    }
  };

  const initSession = () => {
    const session = sessionRef.current;
    setTotalExercises(session.getTotalCountExercise());
    session.dequeue();
  };

  const refreshRunTimeHandler = (runTime: number) => {
    setRunTime(runTime);
  };

  const clearStackAndNavigate = () => {
    ClearStackAndNavigate(navigation, Screens.MainScreen);
  };

  const text_1: string = i18n.t("Exrcise Instruction");

  const nextExercise = () => {
    if (isViewIntermediateScreen) {
      const session = sessionRef.current;
      session.dequeue();
      setCancledViewIntermediateScreen(true); 
    }
  };

  const refreshExerciseHandler = () => {
    const session = sessionRef.current;
    setExercise(session.currentExercise!);
    setCompletedExercises(session.getTotalCountExercise() - session.getQueueLength());
  };

  const numberToTime = (runTime: number): string => {
    const totalSeconds = Math.ceil(runTime / 1000);

    if (totalSeconds <= 0) return i18n.t("Start");

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const viewIntermediateScreen = () => {
    setCancledViewIntermediateScreen(false);
  };

  const checkBoxChange = (arg: boolean) => {
    dataProvider.Set<boolean>(arg, Path.sessionChooseModal);
  };

  let tooltipProps: TooltipProp = {
    FirstWidth: disp_width * 1 / 2 * 0.851,
    FirstHeight: disp_height / 16,
    margin: 16, // Передаём margin для остальных элементов
    StartButtonTitle: numberToTime(runTime),
    SecondWidth: disp_width * 2 / 3 * 0.668,
    NextButtonAction: viewIntermediateScreen,
  };

  if (sessionRef.current.currentExercise) {
    if (sessionRef.current.currentExercise.exerciseType === ExerciseType.COUNT) {
      tooltipProps.NumbOfReps = sessionRef.current.currentExercise.countOfReapeat;
    } else {
      tooltipProps.StartTimer = sessionRef.current.startTimer;
      tooltipProps.StopTimerAction = sessionRef.current.stopTimer;
      tooltipProps.emitter = sessionRef.current.emitter;
    }
  }

  const backButtonAction = () => {
    setExitChoiceModal(true);
  };

  function exit() {
    sessionRef.current.clear();
    clearStackAndNavigate();
  }

  return (
    <>
      <View style={styles.container}>
        <TooltipWin
          modalWindow={instructionModal && !savedChoseModalVisible}
          textHead={i18n.t("Instruction")}
          textBody={text_1}
          toggleModal={() => setInstructionModal(false)}
          checkBoxChange={checkBoxChange}
        />
        <ExitChoice
          modalWindow={exitChoiceModal}
          header={i18n.t("What do you want to do")}
          textBut1={i18n.t("To the main screen")}
          textBut2={i18n.t("One step back")}
          action1={() => {
            exit();
          }}
          action2={() => {
            sessionRef.current.back();
            setCancledViewIntermediateScreen(true);
            cancledViewIntermediateScreenRef.current = true;
          }}
          toggleModal={() => setExitChoiceModal(false)}
        />

        <View style={styles.top_navbar}>
          <View>
            <BackButton action={backButtonAction} text={""} />
          </View>
          <ExerciseProgression currentExercise={completedExercises + 1} totalExercises={totalExercises} />
        </View>
        {isViewIntermediateScreen ? (
          <IntermediateScreen
            nextButtonAction={nextExercise}
            totalExercises={totalExercises}
            completedExercises={completedExercises}
            cancled={cancledViewIntermediateScreen}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "flex-end", height: "100%" }}>
            <ExerciseComponent exercise={exercise} />
            <SessionTooltips {...tooltipProps} />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
  },
  top_navbar: {
    flexDirection: "row", // Располагаем контейнеры в ряд
    justifyContent: "space-between", // Распределяем пространство между контейнерами
    alignItems: "center", // Центрируем контейнеры по вертикали
    padding: 10,
    marginTop: 30,
    height: "auto",
  },
});
