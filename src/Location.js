import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Location {
    constructor(latitude, longitude)
    {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    static getCurrent() {
        return Location.getCurrentPosition().then((position) => {
            return new Promise(function (resolve, reject) {
                resolve(new Location(position.coords.latitude, position.coords.longitude));
            });
        });
    }

    static getCurrentPosition() {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

}
