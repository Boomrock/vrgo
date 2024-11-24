import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, Dimensions} from 'react-native';
import { ClearStackAndNavigate, NavigationContext} from '@navigations/navigate';
import { Screens } from '@navigations/Screens';
import { IDataProvider, Path } from '@scripts/interfaces/content-provider/IDataProvider';
import TooltipWin from '../components/Modal/tooltipWin';
import OneButtonWin from '@components/Modal/oneButtonWin';
import i18n from '@scripts/localization/i18next';
import { BackButton, InfoButton, NextButtonEnabling } from '@components/buttonsComponent';

// Получаем разрешение экрана
const { width: disp_width, height: disp_height } = Dimensions.get('window');

export type ChoseBodyPart = {
   isCheckedRightHand : Boolean,
   isCheckedLeftHand : Boolean,
   isCheckedRightLeg : Boolean,
   isCheckedLeftLeg : Boolean,
}



export default function СhoosingBodyPart({navigation}: {navigation: any}) {
  const [isCheckedModalWin, setCheckedModalWin] = useState(false);

  const [modalWindow, setModalWindow] = useState(true);
  const [savedChoseModalVisible, setSavedChoseModalVisible] = useState(true);
  
  // Логические выражения поврежденных частей тела:
  const [isCheckedRightHand, CheckRightHand] = useState(false);
  const [isCheckedLeftHand, CheckLeftHand] = useState(false);
  const [isCheckedRightLeg, CheckRightLeg] = useState(false);
  const [isCheckedLeftLeg, CheckLeftLeg] = useState(false);
  
  const { data, setData } = useContext(NavigationContext);
  
  let dataProvider = data.dataProvider as IDataProvider;
  const toggleModal = () => {
    setModalWindow(!modalWindow);
  }
  const toggleModal2 = () => {
    setCheckedModalWin(!isCheckedModalWin);
  }


  useEffect(()=>{
    dataProvider.Get<boolean>(Path.choosingBodyPartChooseModal).then( 
      choose =>{
        if(choose){
          setSavedChoseModalVisible(choose);
        }
        else{
          setSavedChoseModalVisible(false);          
        }
    }).catch(()=>{
      setSavedChoseModalVisible(false);  
    })
  },[])
  const loadScene = () => {
    navigation.navigate(Screens.MainScreen)
  }
  
  const loadMainScene = () => {
    let chose: ChoseBodyPart = {
      isCheckedRightHand: isCheckedRightHand,
      isCheckedLeftHand: isCheckedLeftHand,
      isCheckedRightLeg: isCheckedRightLeg,
      isCheckedLeftLeg: isCheckedLeftLeg,
    };
    dataProvider.Set(chose, Path.choseBodyPart);
    ClearStackAndNavigate(navigation, Screens.MainScreen)
  }
  const checkBoxChange = (arg: boolean) => {
    dataProvider.Set<boolean>(arg, Path.choosingBodyPartChooseModal);
  }
  //TEXT 
  const text_1: string = i18n.t('First modal instructions for selecting a Body Part');
  const text_2: string =i18n.t('Modal instructions for selecting a Body Part')
  
  return (
  <View style={{...styles.background}}>
    <View style={{...styles.container}}>
      
      <View style={{marginTop: '10%', marginBottom:8}}>
        <InfoButton action={() => setCheckedModalWin(true)} text={i18n.t('View hint')}/>
        <TooltipWin modalWindow = {modalWindow && !savedChoseModalVisible} textHead = {i18n.t('Instruction')} textBody = {text_1} toggleModal = {toggleModal} checkBoxChange={checkBoxChange}/>
        <OneButtonWin modalWindow = {isCheckedModalWin} textHead = {i18n.t('Instruction')} textBody = {text_2} toggleModal = {toggleModal2} />
      </View>

      <View style={styles.row}>
      <TouchableOpacity style={{...styles.expanded, backgroundColor: isCheckedRightHand ? '#393220' : '#323939'}} onPress={() => CheckRightHand(!isCheckedRightHand)}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
              <Text style={{...styles.sideText, textAlign: 'left', marginLeft: 15, marginTop: 15}}>{i18n.t("Right")}</Text>
              <Text style={{...styles.sideText, textAlign: 'left', marginLeft: 15}}>{i18n.t("Side")}</Text>
            </View>
            <View style={{marginLeft: 16, marginBottom: 16}}>
            <Text style={{...styles.text, textAlign: 'left', marginBottom: 8, color: isCheckedRightHand ? '#FFB800' : '#FFFFFF'}}>{i18n.t("Hand")}</Text>
            <Image style={{opacity: isCheckedRightHand ? 1 : 0}} source={require('@images/buttonText/checkcircle.png')}></Image>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.expanded, backgroundColor: isCheckedLeftHand ? '#393220' : '#323939'}} onPress={() => CheckLeftHand(!isCheckedLeftHand)}>
            <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Text style={{...styles.sideText, textAlign: 'right', marginRight: 15, marginTop: 15}}>{i18n.t("Left")}</Text>
              <Text style={{...styles.sideText, textAlign: 'right', marginRight: 15}}>{i18n.t("Side")}</Text>
            </View>
            <View style={{marginRight: 16, marginBottom: 16}}>
            <Text style={{...styles.text, textAlign: 'right', marginBottom: 8, color: isCheckedLeftHand ? '#FFB800' : '#FFFFFF'}}>{i18n.t("Hand")}</Text>
            <Image style={{alignSelf: 'flex-end', opacity: isCheckedLeftHand ? 1 : 0}} source={require('@images/buttonText/checkcircle.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
      <View style={{...styles.row}}>
        <TouchableOpacity style={{...styles.expanded, backgroundColor: isCheckedRightLeg ? '#393220' : '#323939'}} onPress={() => CheckRightLeg(!isCheckedRightLeg)}>
        <View style={{marginLeft: 16, marginTop: 16}}>
            <Text style={{...styles.text, textAlign: 'left', marginBottom: 8, color: isCheckedRightLeg ? '#FFB800' : '#FFFFFF'}}>{i18n.t("Leg")}</Text>
            <Image style={{opacity: isCheckedRightLeg ? 1 : 0}} source={require('@images/buttonText/checkcircle.png')}></Image>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.expanded, backgroundColor: isCheckedLeftLeg ? '#393220' : '#323939'}} onPress={() => CheckLeftLeg(!isCheckedLeftLeg)}>
        <View style={{marginRight: 16, marginTop: 16}}>
            <Text style={{...styles.text, textAlign: 'right', marginBottom: 8, color: isCheckedLeftLeg ? '#FFB800' : '#FFFFFF'}}>{i18n.t("Leg")}</Text>
            <Image style={{alignSelf: 'flex-end', opacity: isCheckedLeftLeg ? 1 : 0}} source={require('@images/buttonText/checkcircle.png')}></Image>
            </View>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer} >
        <View style={{flex: 34, marginBottom: '2%'}}>
          <BackButton action={loadScene}  text={i18n.t("Back")} rightCorner = {false}/>
        </View>
        <View style={{flex: 66, marginBottom: '2%', marginLeft: 5}}>
          <NextButtonEnabling action={loadMainScene} text={i18n.t('Next')} enabled={(isCheckedRightHand || isCheckedLeftHand || isCheckedLeftLeg || isCheckedRightLeg)}/>
        </View>
      </View>
      <View style={styles.bodypartsview}>
        <View pointerEvents='none' style={{alignSelf: 'center', marginBottom: 5 }}>
          <Image resizeMode='contain' source={require('@images/bodyparts/head.png')}/>  
        </View>        
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity style={{marginTop: 25, paddingRight: 2}} onPress={() => CheckRightHand(!isCheckedRightHand)}>
          <Image  source={isCheckedRightHand ? require('@images/bodyparts/righthand_on.png') : require('@images/bodyparts/righthand_off.png')}/>
          </TouchableOpacity>
          <View pointerEvents='none' style={{}}>
            <Image source={require('@images/bodyparts/body.png')} />
          </View>
          <TouchableOpacity style={{marginTop: 25, paddingLeft: 4}} onPress={() => CheckLeftHand(!isCheckedLeftHand)}>
            <Image source={isCheckedLeftHand ? require('@images/bodyparts/lefthand_on.png') : require('@images/bodyparts/lefthand_off.png')} />
          </TouchableOpacity>
        </View>
        <View  style={{ marginTop: -105, flexDirection: 'row', alignContent: 'center', alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => CheckRightLeg(!isCheckedRightLeg)}>
            <Image  resizeMode='contain' style={{marginRight: 5}} source={isCheckedRightLeg ? require('@images/bodyparts/rightleg_on.png') : require('@images/bodyparts/rightleg_off.png')}/>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => CheckLeftLeg(!isCheckedLeftLeg)}>
            <Image  resizeMode='cover' style={{marginLeft: 5}} source={isCheckedLeftLeg ? require('@images/bodyparts/leftleg_on.png') : require('@images/bodyparts/leftleg_off.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
  );
  };
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#232323',
    flex: 1,
    justifyContent: 'center'
  },
  container: {
    margin:10,
    flex: 1,
    backgroundColor: '#232323',
  },
  bodypartsview: {
    top: '20%',
    left: '50%',
    right: 0,
    bottom: 0,
    width: 1,
    flexDirection: 'column',
    position: 'absolute',
    alignSelf: 'center', 
    justifyContent: 'center',
    transform: [{scale: (disp_width/disp_height) * disp_height/620 * 0.9}],
    marginBottom: disp_height * 0.2
  },
  sideText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    fontWeight: '500',
    color: '#FFFFFF',
    opacity: 0.7
    },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  bottom_btn_navbar: {
    flexDirection: 'row',
    alignContent: 'space-between'
  },
  expanded: {
    flex: 1,
    backgroundColor: '#323939',
    margin: 2,
  },
  text: {
    fontSize: 19,

    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
    marginBottom: '2%',
    marginTop: '24%'
  },
});