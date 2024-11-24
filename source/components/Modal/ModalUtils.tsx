import React from 'react';
import {StyleProp, Text,TextStyle } from 'react-native';

export class ParagraphRenderer {
  static renderParagraphs(text: string, paragraphStyle:StyleProp<TextStyle>): JSX.Element[] {
    return text.split('\n').map((para, index) => (
      <Text key={index} style={paragraphStyle}>
        {para}
      </Text>
    ));
  }
}