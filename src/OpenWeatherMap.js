import OWMConsts from './OWMConsts';
import Location from './Location';
import "isomorphic-fetch";

export default class OpenWeatherMap {
    getWeather(latitude, longitude) {
        let url = `${OWMConsts.APIRoot}lat=${latitude}&lon=${longitude}&appid=${OWMConsts.key}`;

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
}
