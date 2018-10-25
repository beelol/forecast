import React from 'react';
import Location from '../src/Location';
import OpenWeatherMap from '../src/OpenWeatherMap';

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

describe("OpenWeatherMap#getWeatherAtCurrentLocation", () => {
    const owm = new OpenWeatherMap();

    it('retrieves the weather by current location', () => {
        return owm.getWeatherAtCurrentLocation().then((weather) =>
        {
            expect(weather).toBeDefined();
            expect(weather).toHaveProperty('main');
            expect(weather).toHaveProperty('main.temp');
        });
    });
});
