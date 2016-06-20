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
      <MapView
        annotations={[this.state.pin]}
        style={styles.map}
        onRegionChangeComplete={this.onRegionChangeComplete}/>
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
  map: {
    flex: 1
  }
});

AppRegistry.registerComponent('weather', () => weather);
