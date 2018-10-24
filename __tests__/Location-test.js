import React from 'react';
import Location from '../src/Location';

// The Location matches the API's location with the same location

describe("Location", () => {
    var latitude = 23;
    var longitude = 55;
    var location = new Location(latitude, longitude);

    it('stores latitude and longitude', () => {
        expect(location.latitude).toEqual(latitude);
        expect(location.longitude).toEqual(longitude);
    });
})
