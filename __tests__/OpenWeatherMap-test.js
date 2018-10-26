import React from 'react';
import Location from '../src/Location';
import OpenWeatherMap from '../src/OpenWeatherMap';
import 'isomorphic-fetch';

beforeAll(() => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn()
        .mockImplementationOnce((success) => Promise.resolve(success({
          coords: {
            latitude: 51.1,
            longitude: 45.3
          }
        })))
    };

    global.navigator.geolocation = mockGeolocation;
});

describe("OpenWeatherMap#getWeather", () => {
    const owm = new OpenWeatherMap();

    it('retrieves the weather by longitude and latitude', () => {
        return owm.getWeather(51.1, 45.3).then((weather) =>
        {
            expect(weather).toBeDefined();
        });
    });

    it('contains the appropriate data', () => {
        return owm.getWeather(51.1, 45.3).then((weather) =>
        {
            expect(weather).toHaveProperty('main');
            expect(weather).toHaveProperty('main.temp');
        });
    });
});

describe("OpenWeatherMap#getWeatherAtLocation", () => {
    const owm = new OpenWeatherMap();

    var location = new Location(23, 10);

    it('retrieves the weather by location', () => {
        return owm.getWeatherAtLocation(location).then((weather) =>
        {
            expect(weather).toBeDefined();
        });
    });

    it('contains the appropriate data', () => {
        return owm.getWeatherAtLocation(location).then((weather) =>
        {
            expect(weather).toHaveProperty('main');
            expect(weather).toHaveProperty('main.temp');
        });
    });
});

describe("OpenWeatherMap#getTemperatureAtCurrentLocation", () => {
    const owm = new OpenWeatherMap();

    it('retrieves the temperature by current location', () => {
        return owm.getTemperatureAtCurrentLocation().then((temp) =>
        {
            expect(temp).toBeDefined();
        });
    });
});

describe("OpenWeatherMap#getForecast", () => {
    const owm = new OpenWeatherMap();

    it('retrieves the forecast by latitude & longitude', () => {
        return owm.getForecast(51.1, 45.3).then((response) =>
        {
            expect(response).toBeDefined();
            expect(response.list).toBeDefined();
            expect(response.list.length).toBeGreaterThanOrEqual(30);
        });
    });
});
