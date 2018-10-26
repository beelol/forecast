import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import OpenWeatherMap from './OpenWeatherMap';
import OWMConsts from './OWMConsts';

export default class FiveDayForecast extends Component {
    constructor(props) {
      super(props);
      this.state = {
          fiveDayForecast: [],
          owm: new OpenWeatherMap()
      };
    }

    componentDidMount() {
        this.state.owm.getFiveForecastObjectsAtCurrentLocation().then((fiveDayForecast) => {
            this.setState({
                fiveDayForecast: fiveDayForecast
            });
        })
    }

    render() {
        var forecast = this.state.fiveDayForecast;
        const listItems = forecast.map((weather) =>
        <Text key={weather.main.temp}>
            <Image source={{uri: `${this.state.owm.getIconUrl(weather.weather[0].icon)}`}}
       style={{width: 30, height: 30}} />
            <Text> {weather.dt_txt.split(" ")[0]}{`\n`} </Text>
            <Text>
                High: {weather.main.temp_max} Low: {weather.main.temp_min}{`\n\n`}
            </Text>
        </Text>);

        return (
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>FIVE-DAY FORECAST{`\n`}</Text>
            <Text>{listItems}</Text>
          </View>
    );
    }
}
