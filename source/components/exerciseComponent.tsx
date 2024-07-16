import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Image, View, StyleSheet, Text, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native';
import ExerciseStepActive from '@components/exerciseStepActive';
import { disp_height, disp_width } from '@scripts/utils/Const';
import { Exercise } from '@scripts/models/Exercise/Exercise';
import Slick from 'react-native-slick';
import ExerciseStep from '@components/exerciseStep';
import { StepType } from '@scripts/descriptionOfExercises/allExercises';

interface Prop {
  exercise: Exercise;
}

interface CustomButtonProps {
  source: ImageSourcePropType;
  onPress: () => void;
}

const leftArrowImage = require('../assets/images/button/arrow_left.png');
const rightArrowImage = require('../assets/images/button/arrow_right.png');

const CustomButton: FC<CustomButtonProps> = ({ source, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.arrow}>
    <Image source={source} style={{ width: disp_width * 0.07, height: disp_height * 0.035, resizeMode: "contain" }} />
  </TouchableOpacity>
);

function getMaxHeight(): number {
  let height_percent = disp_height / 2400;
  return height_percent * disp_height;
}

function ExerciseComponent(prop: Prop) {
  const exercise = prop.exercise;
  const slickRef = useRef<Slick>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);
  const [instructionToImage, setInstructionToImage] = useState(new Map<number, number>());

  useEffect(() => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    slickRef.current?.scrollTo(0);
    let countSlides = 0;
    exercise.steps.forEach((value, index) => {
      if (value.image) {
        instructionToImage.set(countSlides, index);
        countSlides++;
      }
    });
    setTotalSlides(countSlides);
  }, [exercise]);

  const instructionIndex = (imageIndex: number) => {
    return instructionToImage.get(imageIndex);
  };

  const findIndexInMap = (valueToFind: number): number => {
    let index = 0;
    console.debug(instructionToImage);
    for (let value of instructionToImage.values()) {
      if (value === valueToFind) {
        return index;
      }
      index++;
    }
    return -1; // Вернуть -1, если ключ не найден
  };

  const imageIndex = (instructionIndex: number) => {
    const imageIndex = findIndexInMap(instructionIndex);
    console.debug(`${instructionIndex} -> ${imageIndex}`);
    if (imageIndex === -1) {
      return slickRef.current?.state.index;
    }
    return imageIndex;
  };

  const goNext = useCallback(() => {
    if (slickRef.current && slickRef.current.state.index < totalSlides) {
      slickRef.current?.scrollTo(slickRef.current.state.index + 1);
    }
  }, [slickRef, totalSlides]);

  const goPrev = useCallback(() => {
    if (slickRef.current && slickRef.current.state.index > 0) {
      slickRef.current?.scrollTo(slickRef.current.state.index - 1);
    }
  }, [slickRef, totalSlides]);

  const handleIndexChanged = (index: number) => {
    setCurrentInstructionIndex(instructionIndex(index)!);
  };

  return (
    <View style={styles.body}>
      <View style={styles.content}>
        <Text style={styles.instructions}>{exercise.description}</Text>
        <View style={{ height: totalSlides === 1 ? disp_height * 0.37 : disp_height * 0.42, marginTop: 16 }}>
          <Slick
            ref={slickRef}
            loop={false}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            showsButtons={false}
            onIndexChanged={handleIndexChanged}
            height={totalSlides === 1 ? disp_height * 0.3 : disp_height * 0.42}
          >
            {exercise.steps.map((val, ind) => (
              val.image !== undefined && (
                <Image
                  key={ind}
                  style={{ height: disp_height * 0.35, width: disp_width - 32 }}
                  source={val.image}
                />
              )
            ))}
          </Slick>
        </View>
        {totalSlides !== 1 ? 
          <View style={styles.buttonContainer}>
            <CustomButton source={leftArrowImage} onPress={goPrev} />
            <CustomButton source={rightArrowImage} onPress={goNext} />
          </View> : null
        }
        <Text style={{ ...styles.instructions, paddingTop: 8, marginBottom: 8, marginTop: 8 }}>{exercise.preface}</Text>
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          {exercise.steps.map((step, stepNumb) => (
            currentInstructionIndex === stepNumb ?
              (step.type === StepType.Sample ?
                <ExerciseStepActive key={stepNumb} mark={`${stepNumb + 1}`} step={step.instruction} />
                :
                <ExerciseStepActive key={stepNumb} mark={"+"} step={step.instruction} />)
              :
              <TouchableOpacity key={stepNumb} onPress={() => {
                setCurrentInstructionIndex(stepNumb);
                slickRef.current?.scrollTo(imageIndex(stepNumb)!);
              }}>
                {step.type === StepType.Sample ?
                  <ExerciseStep key={stepNumb} mark={`${stepNumb + 1}`} step={step.instruction} />
                  :
                  <ExerciseStep key={stepNumb} mark={"+"} step={step.instruction} />
                }
              </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  content: {
    flex: 1, // Добавляем flex: 1, чтобы контент занимал все доступное пространство
    margin: 16,
  },
  image: {
    aspectRatio: 1.5,
    width: disp_width - 32,
    marginTop: 20,
    marginBottom: 20
  },
  text: {
    fontSize: 19,
    flex: 1
  },
  instructions: {
    color: '#CFCFCF',
    fontSize: 18,
    fontFamily: 'RobotoMono',
    fontWeight: '300',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  arrow: {
    padding: 0,
  },
  buttonContainer: {
    marginTop: -disp_height * 0.055,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scrollView: {
    flexGrow: 1, // Используем flexGrow для ScrollView, чтобы он занимал все доступное пространство
  },
});

export default ExerciseComponent;
