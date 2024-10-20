import { BodypartsSelected } from "@components/bodypartsSelected";
import { FullButton } from "@components/buttonsComponent";
import DropdownComponent from "@components/patologyDropdownComponent";
import { NavigationContext } from "@navigations/navigate";
import { IDataProvider, Path } from "@scripts/interfaces/content-provider/IDataProvider";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ChoseBodyPart } from "./choosingBodyPart";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import i18n from "@scripts/localization/i18next";

const { width: disp_width } = Dimensions.get('window');

export default function MainScreen({navigation}: {navigation: any}) {
    const [selectedPathology, setSelectedPathology] = useState<string>('');
    const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);

    
    const { data, setData } = useContext(NavigationContext);
    
    let dataProvider = data.dataProvider as IDataProvider;
    
    const loadExerciseScene = () => {
      navigation.navigate('SessionScreen')
    }

    const loadBodyPartScene = () => {
      navigation.navigate('ChoosingBodyPart', {backScene: 'MainScreen'})
    }

    var BodyParts: string[] = [];
    useEffect(()=>{
      dataProvider.Get<ChoseBodyPart>(Path.choseBodyPart)
        .then( result =>{
          if(result?.isCheckedLeftHand && result?.isCheckedRightHand){
              BodyParts.push(i18n.t('left and right hands'));
          }
          else if(result?.isCheckedLeftHand){
            BodyParts.push(i18n.t('left hand'));
          }
          else if(result?.isCheckedRightHand){
            BodyParts.push(i18n.t('right hand'));
          }

        if(result?.isCheckedLeftLeg && result?.isCheckedRightLeg){
            BodyParts.push(i18n.t('left and right legs'));
        }
        else if(result?.isCheckedLeftLeg){
          BodyParts.push(i18n.t('left leg'));
        }
        else if(result?.isCheckedRightLeg){
          BodyParts.push(i18n.t('right leg'));
        }
      setSelectedBodyParts(BodyParts);
      })
    },[])  
    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={{...styles.text, marginTop: getStatusBarHeight()}}> {i18n.t('Is your pathology correct?')}</Text>
          <View style={{position: 'absolute', top: getStatusBarHeight() + 30, zIndex: 10}}>
          <DropdownComponent onSelect={setSelectedPathology} dataProvider={dataProvider}></DropdownComponent>
          </View>
          <View style={{flex: 1, marginTop: '15%', width: disp_width - sideMargin * 2}}>
            <Text style={styles.text}> {i18n.t('Are the areas of exercises correct?')}</Text>
            <View style={{height: 100}}>
              <BodypartsSelected bodyparts={selectedBodyParts} onPress={loadBodyPartScene}></BodypartsSelected>
            </View>
          </View>
          <FullButton
            text={i18n.t("Start exercising")}
            action={loadExerciseScene}/>
        </View>
      </View>
    );


}

const sideMargin = 16;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#232323',
    alignItems: 'center',
    padding: sideMargin
  },
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontWeight: '300',
    fontSize: 19,
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'justify',
    flexWrap: 'wrap',
    width: '100%',
    //textAlign: 'justify'
  }
});