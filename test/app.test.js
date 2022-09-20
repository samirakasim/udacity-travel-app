import { getGeoCity, getPicture, getWeather } from "../src/client/js/app";

describe("Testing the apis", () => {

    test("Testing the api's in app.js", () => {
        expect(getGeoCity).toBeDefined();
    });
    test("Testing the api's in app.js", () => {
        expect(getPicture).toBeDefined();
    });
    test("Testing the api's in app.js", () => {
        expect(getWeather).toBeDefined();
    });
});