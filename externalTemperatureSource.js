export class ExternalTemperatureController {
    constructor() {
        this.lowLimit = 0;
        this.highLimit = 110;
        this.temperature = 0;
        this.increment = true;
        this.increments = [0, 1.5, 1, 0.5, -2, 1, 1.25, -0.25, 2];
        this.incrementIndex = 0;
    }
    updateTemperature() {
        if (this.temperature >= this.highLimit) {
            this.increment = false;
        } else if (this.temperature <= this.lowLimit) {
            this.increment = true;
        }

        this.incrementIndex = (this.incrementIndex + 1) % this.increments.length;
        this.temperature += this.increment ? this.increments[this.incrementIndex] : -(this.increments[this.incrementIndex]);
        return this.temperature;
    }
}
