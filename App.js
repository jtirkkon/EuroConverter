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


/*{
  "success":true,
  "timestamp":1611737226,
  "base":"EUR",
  "date":"2021-01-27",
  "rates":{
    "AED":4.462232,
    "AFN":94.884913,
    "ALL":123.585135,
    "AMD":629.617215,
    "ANG":2.176501,
    "AOA":795.863636,
    "ARS":105.618881,
    "AUD":1.571602,
    "AWG":2.186762,
    "AZN":2.068357,
    "BAM":1.953856,
    "BBD":2.448226,
    "BDT":102.815596,
    "BGN":1.954181,
    "BHD":0.457971,
    "BIF":2355.070536,
    "BMD":1.214868,
    "BND":1.608075,
    "BOB":8.348265,
    "BRL":6.505973,
    "BSD":1.212575,
    "BTC":3.8658985e-5,
    "BTN":88.39636,
    "BWP":13.3613,
    "BYN":3.119248,
    "BYR":23811.403962,
    "BZD":2.444131,
    "CAD":1.546429,
    "CDF":2401.793289,
    "CHF":1.077713,
    "CLF":0.032281,
    "CLP":890.719516,
    "CNY":7.8557,
    "COP":4389.936037,
    "CRC":741.860455,
    "CUC":1.214868,
    "CUP":32.19399,
    "CVE":110.1528,
    "CZK":26.021851,
    "DJF":215.861902,
    "DKK":7.438974,
    "DOP":70.374896,
    "DZD":161.173882,
    "EGP":19.109378,
    "ERN":18.2227,
    "ETB":47.853451,
    "EUR":1,
    "FJD":2.472802,
    "FKP":0.884716,
    "GBP":0.884685,
    "GEL":4.009611,
    "GGP":0.884716,
    "GHS":7.069116,
    "GIP":0.884716,
    "GMD":62.626368,
    "GNF":12459.911031,
    "GTQ":9.433391,
    "GYD":253.296165,
    "HKD":9.417204,
    "HNL":29.221476,
    "HRK":7.55757,
    "HTG":89.756314,
    "HUF":359.785393,
    "IDR":17113.110243,
    "ILS":3.965376,
    "IMP":0.884716,
    "INR":88.47153,
    "IQD":1770.298651,
    "IRR":51151.998255,
    "ISK":156.997206,
    "JEP":0.884716,
    "JMD":177.004162,
    "JOD":0.861343,
    "JPY":126.003685,
    "KES":133.817134,
    "KGS":103.017291,
    "KHR":4938.436818,
    "KMF":491.839388,
    "KPW":1093.448644,
    "KRW":1341.966721,
    "KWD":0.367777,
    "KYD":1.010483,
    "KZT":512.104699,
    "LAK":11328.639279,
    "LBP":1840.30737,
    "LKR":237.049571,
    "LRD":207.317247,
    "LSL":18.381132,
    "LTL":3.587188,
    "LVL":0.734861,
    "LYD":5.412132,
    "MAD":10.884984,
    "MDL":21.037518,
    "MGA":4567.605084,
    "MKD":61.650025,
    "MMK":1613.264526,
    "MNT":3466.144135,
    "MOP":9.681258,
    "MRO":433.707506,
    "MUR":48.113047,
    "MVR":18.720959,
    "MWK":936.4998,
    "MXN":24.373353,
    "MYR":4.91353,
    "MZN":91.303334,
    "NAD":18.380576,
    "NGN":463.167867,
    "NIO":42.317244,
    "NOK":10.398744,
    "NPR":141.4351,
    "NZD":1.681966,
    "OMR":0.467692,
    "PAB":1.212575,
    "PEN":4.419117,
    "PGK":4.274017,
    "PHP":58.405365,
    "PKR":194.974006,
    "PLN":4.547808,
    "PYG":8422.290473,
    "QAR":4.423029,
    "RON":4.875045,
    "RSD":118.325469,
    "RUB":91.327243,
    "RWF":1203.014525,
    "SAR":4.557178,
    "SBD":9.704808,
    "SCR":25.760189,
    "SDG":67.151811,
    "SEK":10.096168,
    "SGD":1.610295,
    "SHP":0.884716,
    "SLL":12428.095176,
    "SOS":709.482424,
    "SRD":17.195232,
    "STD":25311.599372,
    "SVC":10.610323,
    "SYP":623.003267,
    "SZL":18.454055,
    "THB":36.406543,
    "TJS":13.816627,
    "TMT":4.264185,
    "TND":3.274119,
    "TOP":2.780103,
    "TRY":8.944973,
    "TTD":8.246003,
    "TWD":33.988956,
    "TZS":2817.277749,
    "UAH":34.132614,
    "UGX":4468.222276,
    "USD":1.214868,
    "UYU":51.137911,
    "UZS":12754.480917,
    "VEF":12.133493,
    "VND":28026.994357,
    "VUV":131.33359,
    "WST":3.074174,
    "XAF":655.294918,
    "XAG":0.048007,
    "XAU":0.000658,
    "XCD":3.28324,
    "XDR":0.84105,
    "XOF":655.294918,
    "XPF":119.551826,
    "YER":304.193135,
    "ZAR":18.349327,
    "ZMK":10935.26838,
    "ZMW":25.948083,
    "ZWL":391.187576
  }
}*/
