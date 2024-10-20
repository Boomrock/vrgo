import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import styles from "@styles/styles";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


interface ButtonProps {
    action: () => void;
    text: string;
    enabled?: boolean
  }
interface ParentButtonProps{ 
    action: () => void;
    text: string;
    enabled?: boolean,
    leftCorner?: boolean,
    rightCorner?: boolean,
    leftImage?: any,
    rightImage?: any,
}
  export const FullButton: React.FC<ButtonProps> = ({action, text, enabled}) => {
    return (
      <SimpleButton action={action} text={text} enabled = { enabled} rightCorner={true} leftCorner={true} rightImage={require("@images/button/CaretRight.png")} />
    );
  };

  export const StartButton: React.FC<ButtonProps> = ({action, text}) => {
    return (
      <SimpleButton action={action} text={text} enabled = {true} rightCorner={false} leftCorner={true} leftImage={require("@images/button/Eject.png")} />
    );
  }
  export const FullOrangeButton: React.FC<ButtonProps> = ({action, text}) => {
    return (
      <OrangeButton action={action} text={text} enabled = {true} rightCorner={true} leftCorner={true} leftImage={require("@images/button/Eject.png")} />
    );
  } 
  export const FullTransparentButton: React.FC<ButtonProps> = ({action, text}) => {
    return (
      <TransparentButton action={action} text={text} rightCorner={true} leftCorner={true} rightImage={require("@images/button/CaretRight.png")} />
    );
  };
  export const InfoButton: React.FC<ButtonProps> = ({action, text}) =>{
    return (
      <TransparentButton action={action} text={text} rightCorner={true} leftCorner={true} leftImage={require("@images/button/Info.png")} />
    );
  }
  export const NextButtonEnabling: React.FC<ButtonProps> = ({action, text, enabled}) =>{
    return (
      enabled ?
        (<SimpleButton action={action} text={text} leftCorner={false}  rightCorner={true}  rightImage={require("@images/button/CaretRight.png")} />) :
        (<WhiteTransparentButton action={action} enabled={enabled} text={text} leftCorner={false}  rightCorner={true}  rightImage={require("@images/button/CaretWhiteRight.png")} />)
      
    );
  }
  export const BackButton: React.FC<ButtonProps> = ({action, text}) =>{
    return (
      <TransparentButton action={action} text={text} leftCorner={true}  rightCorner={true}  leftImage={require("@images/button/CaretLeft.png")} />
    );
  }
  export const FullBackButton: React.FC<ButtonProps> = ({action, text}) =>{
    return (
      <TransparentButton action={action} text={text} leftCorner={true}  rightCorner={true}  leftImage={require("@images/button/CaretLeft.png")} />
    );
  }
  export const SimpleButton: React.FC<ParentButtonProps> = ({action, text, rightCorner, leftCorner, leftImage, rightImage, enabled}) => {
    if(enabled === null || enabled== undefined){
      enabled = true;
    }
    return (
      enabled?
      <TouchableOpacity style={buttonStyles.container} onPress={action}>
        {leftCorner && <Image source={require('@images/button/leftBlueCorner.png')} style={buttonStyles.imageCorner} />}
        <View style={buttonStyles.centralBlock} >
          {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

          <Text style={{...styles.textDefault, color: '#232323'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
        </View>
         {rightCorner && <Image source={require('@images/button/rightBlueCorner.png')} style={buttonStyles.imageCorner} />}
      </TouchableOpacity>:
      <View style={buttonStyles.container}>
        {leftCorner && <Image source={require('@images/button/leftBlueCorner.png')} style={buttonStyles.imageCorner} />}

        <View style={buttonStyles.centralBlock} >
          {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

          <Text style={{...styles.textDefault, color: '#232323'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
        </View> 

        {rightCorner && <Image source={require('@images/button/rightBlueCorner.png')} style={buttonStyles.imageCorner} />}
      </View>
    );
  };

  const OrangeButton: React.FC<ParentButtonProps> = ({action, text, rightCorner, leftCorner, leftImage, rightImage, enabled}) => {
    if(enabled === null || enabled== undefined){
      enabled = true;
    }
    return (
      enabled?
      <TouchableOpacity style={buttonStyles.container} onPress={action}>
        {leftCorner && <Image source={require('@images/button/leftOrangeCorner.png')} style={buttonStyles.imageCorner} />}
        <View style={{...buttonStyles.centralBlock, backgroundColor: '#FA9600'}} >
          {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

          <Text style={{...styles.textDefault, color: '#232323'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
        </View>
         {rightCorner && <Image source={require('@images/button/rightOrangeCorner.png')} style={buttonStyles.imageCorner} />}
      </TouchableOpacity>:
      <View style={buttonStyles.container}>
        {leftCorner && <Image source={require('@images/button/leftOrangeCorner.png')} style={buttonStyles.imageCorner} />}

        <View style={{...buttonStyles.centralBlock, backgroundColor: '#FA9600'}} >
          {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

          <Text style={{...styles.textDefault, color: '#232323'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
        </View> 

        {rightCorner && <Image source={require('@images/button/rightOrangeCorner.png')} style={buttonStyles.imageCorner} />}
      </View>
    );
  };
  const TransparentButton: React.FC<ParentButtonProps> = ({action, text, rightCorner, leftCorner, leftImage, rightImage, enabled}) => {
    if(enabled === null || enabled== undefined){
      enabled = true;
    }
    console.debug(text);
    return (
      enabled?
      <TouchableOpacity style={buttonStyles.container} onPress={action}>
        {leftCorner &&<Image source={require('@images/button/leftBlueCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.1}} />}
        <View style={buttonStyles.transparentCentralBlock} >
          {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

          <Text style={{...styles.textDefault, color: '#B6FFFB'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
        </View>
        {rightCorner && <Image source={require('@images/button/rightBlueCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.1}} />}
      </TouchableOpacity>:

      <View style={buttonStyles.container}>
      {leftCorner &&<Image source={require('@images/button/leftBlueCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.1}} />}
      <View style={buttonStyles.transparentCentralBlock} >
        {leftImage && <Image source={leftImage} style={buttonStyles.imageCaret}/>}

        <Text style={{...styles.textDefault, color: '#B6FFFB'}}>{text}</Text>

        {rightImage && <Image source={rightImage} style={buttonStyles.imageCaret}/>}
      </View>
      {rightCorner && <Image source={require('@images/button/rightBlueCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.1}} />}
    </View>
    );
  };

  const WhiteTransparentButton: React.FC<ParentButtonProps> = ({action, text, rightCorner, leftCorner, leftImage, rightImage, enabled}) => {
    if(enabled === null || enabled== undefined){
      enabled = true;
    }
    return (
      enabled ? 
      <TouchableOpacity style={buttonStyles.container} onPress={action}>
        {leftCorner &&<Image source={require('@images/button/leftWhiteCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.08}} />}
        <View style={{...buttonStyles.transparentCentralBlock, backgroundColor: 'rgba(255, 255, 255, 0.08)'}} >
          {leftImage && <Image source={leftImage} style={{...buttonStyles.imageCaret, opacity: 0.4}}/>}

          <Text style={{...styles.textDefault, color: 'rgba(255, 255, 255, 0.4)'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={{...buttonStyles.imageCaret, opacity: 0.4}}/>}
        </View>
        {rightCorner && <Image source={require('@images/button/rightWhiteCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.08}} />}
      </TouchableOpacity>:
      <View style={buttonStyles.container}>
        {leftCorner &&<Image source={require('@images/button/leftWhiteCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.08}} />}
        <View style={{...buttonStyles.transparentCentralBlock, backgroundColor: 'rgba(255, 255, 255, 0.08)'}} >
          {leftImage && <Image source={leftImage} style={{...buttonStyles.imageCaret, opacity: 0.4}}/>}

          <Text style={{...styles.textDefault, color: 'rgba(255, 255, 255, 0.4)'}}>{text}</Text>

          {rightImage && <Image source={rightImage} style={{...buttonStyles.imageCaret, opacity: 0.4}}/>}
        </View>
        {rightCorner && <Image source={require('@images/button/rightWhiteCorner.png')} style={{...buttonStyles.transparentImageCorner, opacity: 0.08}} />}
      </View>
    );
  };


  const buttonStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    centralBlock: {
      flex:1,
      padding: 10,
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(182, 255, 251, 1)',
    },
    transparentCentralBlock: {
      flex:1,
      padding: 10,
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(182, 255, 251, 0.1)',
    },
    imageCaret: {
      marginHorizontal: 6,
      height: 24,
      width: 24, 
      resizeMode: 'contain',
      
    },
    imageCorner: {
      height: '100%',
      width: 12, 
      resizeMode: 'stretch',
    },
    transparentImageCorner: {
      height: '100%',
      width: 12, 
      resizeMode: 'stretch',
    },
  });