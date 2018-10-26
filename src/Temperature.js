import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import OpenWeatherMap from './OpenWeatherMap';

export default class Temperature extends Component {
    constructor(props) {
      super(props);
      this.state = {
          temp: undefined
      };
    }

    componentDidMount() {
        let owm = new OpenWeatherMap();

        owm.getTemperatureAtCurrentLocation().then((temp) => {
            this.setState({
                temp: temp
            });
        });
    }

    render() {
        return (
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: 20}}>{'It\'s'} {this.state.temp}° outside! </Text>
          </View>
    );
    }
}
