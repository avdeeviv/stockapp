import React from 'react';
import { View, Text } from 'react-native';

const Row = ({ style, name, volume, amount, textStyle }) => {

    const { containerStyle, nameStyle, volumeStyle, amountStyle } = styles;

    return (
    <View style={ [ containerStyle, style ] }>
        <Text style={ [ nameStyle, textStyle ] }>{name}</Text>
        <Text style={ [ volumeStyle, textStyle ] }>{volume}</Text>
        <Text style={ [ amountStyle, textStyle ] }>{amount}</Text>
    </View>
    );
};

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#ddd',
    height: 50,
  },
  nameStyle: {
      flex: 3
  },
  volumeStyle: {
      flex: 2,
      textAlign: 'right'
  },
  amountStyle: {
      flex: 2,
      textAlign: 'right'
  }
};

export { Row };