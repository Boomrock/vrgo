import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
  
  interface Props {
    mark: string;
    step: string;
  }

const ExerciseStep: React.FC<PropsWithChildren<Props>> = ({ mark: stepNumb, step }) => {
return (
        <View style={styles.container}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{stepNumb}</Text>
          </View>
          <Text style={styles.stepDescription}>{step}</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        width: 'auto',
        height: 'auto',
        maxHeight: 100,
        flex: 1,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
      },
      stepNumberContainer: {
        height: '100%',
        width:'7%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 2,
        marginRight: 8
      },
      stepNumber: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.70)',
        fontSize: 19,
        fontFamily: 'Inter-Regular',
        fontWeight: '400',
      },
      stepDescription: {
        flex: 1,
        color: 'rgba(255, 255, 255, 0.70)',
        fontSize: 18,
        flexWrap: 'wrap',
        fontFamily: 'RobotoMono',
        fontWeight: '300',
      },
    });


export default ExerciseStep;