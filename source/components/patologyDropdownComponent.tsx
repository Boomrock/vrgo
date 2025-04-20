import React, { useEffect, useState } from 'react';
import {PatologyElement, NoPatologyElement, SelectedPatology} from '@components/patologyElement';
import { View, TextInput, ScrollView, StyleSheet, Dimensions, } from 'react-native';
import { IDataProvider, Path } from '@scripts/interfaces/content-provider/IDataProvider';
import { Pathology } from '@scripts/descriptionOfExercises/allExercises';
import i18n from '@scripts/localization/i18next';
const { width: disp_width } = Dimensions.get('window');
const sideMargin = 16;

const dataFromJson = [ // Здесь мы берем откуда-то массив патологий

  { label: i18n.t(Pathology.Stroke), value: '1' },
  { label: i18n.t(Pathology.BrainInjury), value: '2' },
  { label: i18n.t(Pathology.SpinalCordInjury), value: '3' },
  { label: i18n.t(Pathology.MultipleSclerosis), value: '4' },
  { label: i18n.t(Pathology.CerebralPalsy), value: '5' },
  { label: i18n.t(Pathology.PathologyNotListed), value: '0' }
];

  const pathologyDictionary: Item[] = [
    { value: '1', label: Pathology.Stroke },
    { value: '2', label: Pathology.BrainInjury },
    { value: '3', label: Pathology.SpinalCordInjury },
    { value: '4', label: Pathology.MultipleSclerosis },
    { value: '5', label: Pathology.CerebralPalsy },
    { value: '0', label: Pathology.PathologyNotListed }
];

  const data = dataFromJson;

interface Item {
    value: string;
    label: string;
}

interface DropdownProps {
    onSelect: (value: string) => void;
    dataProvider: IDataProvider;
}

export const DropdownComponent = ({ onSelect, dataProvider}: DropdownProps) => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isFocused, setIsFocused] = useState(false); // Фокус ввода текста
    useEffect(()=>{
      dataProvider.Get<Item>(Path.pathology).then(result=> {
          let item = dataFromJson.find(el => el.value === result?.value)
          setSelectedItem(item!);
      })
    }, []);
    const filterData = (text: string) => {
      const filtered = data.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredData(filtered);
      setSearchText(text);
    };
  
    const handleSelect = (value: string, label: string) => {
      const selectedItem = data.find(item => item.value === value);
      if (selectedItem) {
        onSelect(value);
        // Обнуление фильтров и поиска после выбора элемента.
        // Можно сохранить фильтр, вместо '' = label и закомментить setFilteredData.
        setSearchText('');
        setFilteredData(data); 
        //
        setSelectedItem(selectedItem);
        let patology = pathologyDictionary.find(element => element.value === selectedItem.value);
        dataProvider.Set(patology , Path.pathology);
        
        setIsFocused(false);
      }
    };
    return (
      <View style={styles.container}>
        {isFocused ? (
          <TextInput
            style={styles.inputText}
            placeholder={i18n.t("Start typing")}
            placeholderTextColor="#888888"
            onChangeText={filterData}
            value={searchText}
            // onBlur={() => {setIsFocused(false)}} // Обработчик события потери фокуса
          />
        ) : (

          <SelectedPatology text={selectedItem ? selectedItem.label : i18n.t('Start entering your pathology')} 
          onPress={() => setIsFocused(true)} /> // Обработчик события нажатия
        )}
        {isFocused && (
        <ScrollView>
          {filteredData.map(item => {
            if (item.label === i18n.t('My pathology is not listed')) {
              return (
                <NoPatologyElement
                  key={item.value}
                  text={item.label}
                  onPress={() => handleSelect(item.value, item.label)}
                />
              );
            } else {
              return (
                <PatologyElement
                  key={item.value}
                  text={item.label}
                  onPress={() => handleSelect(item.value, item.label)}
                />
              );
            }
          })}
        </ScrollView>
        )}
      </View>
    );
  };

  export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: disp_width - sideMargin*2, 
        backgroundColor: '#232323'
    },
    inputText: {
        margin: 4,
        borderWidth: 2,
        padding: 10,
        fontSize: 19,
        color: '#FFFFFF',
        borderColor: '#526160',
        backgroundColor: '#393939',
      }
})