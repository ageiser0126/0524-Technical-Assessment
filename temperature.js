// Importing the external temperature controller
const getExternalTemperature = require('./ExternalTemperatureController');

// Alert enums
const ALERT_STATUS = {
    NOMINAL: "NOMINAL",
    LOW: "LOW_ALERT",
    HIGH: "HIGH_ALERT",
}
class TemperatureController {
    constructor() {
        this.externalTemperatureController = getExternalTemperature();
        this.currentTemperature = null;
        this.previousTemperature = null;
    }

    // Method to update temperatures, called once every (n) for all clients
    updateTemperatures() {
        this.previousTemperature = this.currentTemperature;
        this.currentTemperature = this.externalTemperatureController();
        return this.getTemperature();
    }

    // Method to get the current temperature in both Celsius and Fahrenheit
    getTemperature() {
        return {
            Celsius: this.currentTemperature,
            Fahrenheit: this.celsiusToFahrenheit(this.currentTemperature)
        };
    }

    // Helper method to convert Celsius to Fahrenheit
    celsiusToFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    // Method to check and get alert status based on temperature thresholds and a change threshold
    getAlertStatus(lowPoint, highPoint, threshold) {

        if (this.currentTemperature < Number(lowPoint)  && Math.abs(this.currentTemperature - Number(lowPoint)) >= Number(threshold)) {
            return ALERT_STATUS.LOW;
        } else if (this.currentTemperature > Number(highPoint) && Math.abs(Number(highPoint) - this.currentTemperature) >= Number(threshold) ) {
            return ALERT_STATUS.HIGH;
        }
        return  ALERT_STATUS.NOMINAL;;
    }
}

module.exports = TemperatureController;
