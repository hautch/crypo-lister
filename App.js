import React from 'react';
import { Font } from 'expo';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class App extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      coins: [],
      coinImg: {
        "Bitcoin": 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'
      }
    };

    this.renderListItems = this.renderListItems.bind(this);

  }

  componentDidMount() {

    Font.loadAsync({

      'nova': require('./assets/fonts/ProximaNova-Light.otf'),
    });


    let arrayCopy = this.state.coins;

    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(results => {
        return results.json();
      })
      .then(json => {

        for(let i = 0; i < 10; i++) {

          let price = parseFloat(json[i].price_usd);
          let change = parseFloat(json[i].percent_change_24h);

          let newVal = [json[i].name, price.toFixed(2), change];

          arrayCopy.push(newVal);

        }
        this.setState({coins: arrayCopy});

      });

      

  }

  renderListItems() {

    //<View style = {[styles.column, styles.coinImage]}><Image style = {{width: 70, height: 70}} source = {{uri: this.state.coinImg[e[0]]}}/></View>}

    return this.state.coins.map((e, i) => {

      var isPositive = (e[2] >= 0);
      var colorPicker = 'green';

      if(isPositive == false)
        colorPicker = 'red';

      return (

        <View style = {styles.coinListItem} key = {i}>
          <View style = {[styles.column, styles.coinImage]}></View>
          <View style = {[styles.column, styles.coinName]}><Text>{e[0]}</Text></View>
          <View style = {[styles.column, styles.coinPrice]}><Text>${e[1]}</Text></View>
          <View style = {[styles.column, styles.coinChange]}><Text style = {{color: colorPicker}}>%{e[2]}</Text></View>
        </View>
        )


  });

  }

  render() {
    return (

      <View style = {styles.container}>

        <View style = {styles.header}>

          <Text style = {styles.headerText}>CRYPTOLISTED</Text>

        </View>

        <View style = {styles.listContainer}>

          {this.renderListItems()}

        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#bed1d9'
  },

  header: {
    height: 50,
    marginTop: 50,
    paddingLeft: 15,
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },


  headerText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Helvetica'
  }, 

  listContainer: {

    flex: 1,
  },

  column: {

  },

  coinImage: {

    width: 70,
    alignItems: 'center'

  },

  coinName: {


    width: 120
  },

  coinPrice: {

    width: 80
  },

  coinListItem: {

    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#6aa1b1',
    borderBottomWidth: 2,
    borderBottomColor: 'white',

  },

  nameListItemText: {

    color: 'white'
  }
});