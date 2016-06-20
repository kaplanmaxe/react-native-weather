/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  MapView,
  StyleSheet,
  Text,
  View
} from 'react-native';
var Api = require('./src/api.js');

class weather extends Component {
  constructor(props, context) {
    super(props, context);
    //getInitialState() equivalent
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChangeComplete}>
        </MapView>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{this.state.city}</Text>
          <Text style={styles.text}>{this.state.temperature}</Text>
          <Text style={styles.text}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
  onRegionChangeComplete = (region) => {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });
    Api(region.latitude, region.longitude).then((data) => {
      console.log(data);
      this.setState(data);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },

  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => weather);
