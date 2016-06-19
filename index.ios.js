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

class weather extends Component {
  constructor(props, context) {
    super(props, context);
    //getInitialState() equivalent
    this.state = {
      pin: {
        latitude: 0,
        longitude: 0
      }
    };
  }
  render() {
    console.log(this.state.pin);
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
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

AppRegistry.registerComponent('weather', () => weather);
