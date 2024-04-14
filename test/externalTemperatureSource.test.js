import { expect } from 'chai';
import { ExternalTemperatureController } from '../externalTemperatureSource.js'; // adjust the import path as necessary

describe('ExternalTemperatureController', function() {
    let controlTemperature;

    beforeEach(() => {
        controlTemperature = ExternalTemperatureController();
    });

    it('should not exceed the high limit of 110 degrees Celsius', function() {
        for (let i = 0; i < 1000; i++) {
            const temp = controlTemperature();
            expect(temp).to.be.at.most(110);
        }
    });

    it('should not fall below the low limit of 0 degrees Celsius', function() {
        for (let i = 0; i < 1000; i++) {
            const temp = controlTemperature();
            expect(temp).to.be.at.least(-0.5);
        }
    });

    it('should increment and decrement the temperature correctly', function() {
        let previousTemp = controlTemperature();
        let differences = [];
        for (let i = 0; i < 100; i++) {
            let currentTemp = controlTemperature();
            differences.push(Math.abs(currentTemp - previousTemp));
            previousTemp = currentTemp;
        }
        // Check if changes match any of the increments (both positive and negative)
        differences.forEach(difference => {
            expect([0, 1.5, 1, 0.5, -2, 1, 1.25, -0.25,0.25, 2]).to.include(difference);
        });
    });

});
