import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'

export default function App() {
  const [currency, setcurrency] = useState(0);
  const [amount, setAmount] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [convertedValue, setConvertedValue] = useState(0);
  
  useEffect(() => {
    const apiKey = 'e4e2e46ab44502ac8abd8edfbd50dc2d';
    const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let tempArray = [];
        let currencyArray = [];
        tempArray = [...Object.entries(data.rates)];
        for (let i = 0; i < tempArray.length; i++) {
          currencyArray.push({name: tempArray[i][0], value: tempArray[i][1]});
        }
        setCurrencies(currencyArray);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [])
  
  const makeConvert = () => {
    setConvertedValue((amount / currency).toFixed(4));
    //console.log("convertedValue", convertedValue);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('./euro.jpg')}
      />
      <Text style={styles.textStyle}>{convertedValue} €</Text>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <TextInput style={styles.textInputStyle} onChangeText={text => setAmount(text)} value={amount} keyboardType="number-pad"></TextInput>
        <Picker
          selectedValue={currency}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex != 0) {
              setcurrency(itemValue);
            }
          }}>
          <Picker.Item label="Select currency" value="" />
          {currencies.map(currency => (<Picker.Item label={currency.name} value={currency.value} key={currency.name} />))}
        </Picker>
      </View>
      <Button title="CONVERT" onPress={makeConvert}></Button>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 150, 
    height: 150,
    marginBottom: 40
  },
  textInputStyle: {
    width: 80,
    borderColor: 'gray',
    borderWidth: 1
  },
  textStyle: {
    fontSize: 25,
    marginBottom: 20
  }
});

