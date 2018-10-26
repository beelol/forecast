import OWMConsts from './OWMConsts';
import Location from './Location';
import "isomorphic-fetch";

export default class OpenWeatherMap {

    getFiveForecastObjectsAtCurrentLocation() {
        const forecastInterval = 3;
        const hoursInADay = 24;
        const distanceToNextDay = hoursInADay / 3;

        return Location.getCurrent().then((location) => {
            return this.getForecast(location.latitude, location.longitude).then((response) => {
                let forecast = response.list;
                let fiveDayForecast = [];

                let index = 0;

                while (fiveDayForecast.length < 5) {
                    fiveDayForecast.push(forecast[index]);

                    index += (distanceToNextDay);
                }
                console.log(fiveDayForecast);

                return new Promise(function(resolve) {
                    resolve(fiveDayForecast);
                });
            });
        });
    }

    getForecast(latitude, longitude) {
        let url = `${OWMConsts.APIForecastRoot}lat=${latitude}&lon=${longitude}&appid=${OWMConsts.key}&units=imperial`;

        return fetch(url).then((response) => {
            return new Promise(function (resolve) {
                resolve(response.json());
            });
        });
    }

    getWeather(latitude, longitude) {
        let url = `${OWMConsts.APIRoot}lat=${latitude}&lon=${longitude}&appid=${OWMConsts.key}&units=imperial`;

        return fetch(url).then((response) => {
            return new Promise(function (resolve) {
                resolve(response.json());
            });
        });
    }

    getWeatherAtLocation(location) {
        return this.getWeather(location.latitude, location.longitude);
    }

    getWeatherAtCurrentLocation() {
        return Location.getCurrent().then((location) => {
            return this.getWeatherAtLocation(location);
        });
    }

    getTemperatureAtCurrentLocation() {
        return this.getWeatherAtCurrentLocation().then((weather) => {
            return new Promise(function (resolve) {
                resolve(weather.main.temp);
            });
        })
    }

    getIconUrl(name) {
        return `${OWMConsts.APIIconRoot}${name}.png`;
    }
}
