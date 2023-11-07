const request = require("request");

const forecast = ( latitude,longitude, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=064e38fd15b218713b7b3b1061e655e6&query=" +
        encodeURIComponent(latitude) +
        "," +
        encodeURIComponent(longitude) +
        "&units=f";

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (response.body.error) {
            callback("Unable to find location.Try another location!", undefined);
        } else {
            const current = response.body.current;
            callback(
                undefined,
                "It is currently " +
                current.temperature +
                " degress out. It feels like " +
                current.feelslike +
                " degress out." + "Humidity : " + current.humidity
            );
        }
    });
};

module.exports = forecast;
