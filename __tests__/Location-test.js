import React from 'react';
import Location from '../src/Location';

// The Location matches the API's location with the same location

beforeAll( () =>{
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

describe("Location", () => {

    it('stores latitude and longitude', () => {
        const latitude = 23;
        const longitude = 55;
        const location = new Location(latitude, longitude);

        expect(location.latitude).toEqual(latitude);
        expect(location.longitude).toEqual(longitude);
    });

    it('retrieves a location from the device', () => {
        return Location.getCurrent().then((location) =>
        {
            expect(location).toBeDefined();
            expect(location.latitude).toBeDefined();
            expect(location.longitude).toBeDefined();
        });
    });
});
