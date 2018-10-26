import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import OpenWeatherMap from './OpenWeatherMap';

export default class FiveDayForecast extends Component {
    constructor(props) {
      super(props);
      this.state = {
          fiveDayForecast: []
      };
    }

    componentDidMount() {
        let owm = new OpenWeatherMap();

        owm.getFiveForecastObjectsAtCurrentLocation().then((fiveDayForecast) => {
            this.setState({
                fiveDayForecast: fiveDayForecast
            });
        });
    }

    render() {
        var forecast = this.state.fiveDayForecast;
        const listItems = forecast.map((weather) => <Text key={weather.main.temp}>High: {weather.main.temp_max} Low: {weather.main.temp_min}</Text>);

        return (
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>{listItems}</Text>
          </View>
    );
    }
}
