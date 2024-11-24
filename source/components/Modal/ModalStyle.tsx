import { StyleSheet, Dimensions} from 'react-native';

export const ModalStyles = StyleSheet.create({
    close:{
        alignSelf: 'flex-end',
        top: 5,
        right: 5,
        position: 'absolute',
    },
    checkbox: {
        margin: 8,
      },
    centeredView: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(35, 35, 35, 0.7)",
    },
    modalView: {
        width: (Dimensions.get('window').width) * 0.9,
        backgroundColor: '#93949A',
        borderRadius: 8,
        margin: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    checkBoxRow: {
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop:5,
      },
})

export default ModalStyles