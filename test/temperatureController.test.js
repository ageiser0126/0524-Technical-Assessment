import { expect } from 'chai';
import { TemperatureController } from '../temperatureController.js'; // adjust the import path as necessary

describe('TemperatureController', function() {
    let temperatureController;

    beforeEach(() => {
        temperatureController = new TemperatureController();
    });

    it('should convert temperatures correctly from Celsius to Fahrenheit', function() {
        const testTempCelsius = 20; // Arbitrary Celsius temperature for testing
        const expectedFahrenheit = (testTempCelsius * 9 / 5) + 32;
        expect(temperatureController.celsiusToFahrenheit(testTempCelsius)).to.equal(expectedFahrenheit);
    });

    describe('Alert Status', function() {
        it('should return NOMINAL when within the safe range', function() {
            temperatureController.currentTemperature = 50; // Arbitrary temperature within the expected safe range
            expect(temperatureController.getAlertStatus(0, 100, 10)).to.equal('NOMINAL');
        });

        it('should return LOW_ALERT when below the low threshold by more than the set threshold', function() {
            temperatureController.currentTemperature = -12;
            expect(temperatureController.getAlertStatus(-10, 100, 2)).to.equal('LOW_ALERT');
        });

        it('should return HIGH_ALERT when above the high threshold by more than the set threshold', function() {
            temperatureController.currentTemperature = 102;
            expect(temperatureController.getAlertStatus(0, 100, 1)).to.equal('HIGH_ALERT');
        });
    });
});
