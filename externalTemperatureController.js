const lowLimit = 0; // freezing point of water in celsius is 0 for basic reference
const highLimit = 110; // boiling point of water in celsius is 100 for basic reference
const increments = [0, 1.5, 1, 0.5];
let incrementIndex= 0;
const createTemperatureController  = () => {
    let temperature = 0;
    let increment = true; // Flag to control whether to increment or decrement
    const getRandomIncrement = () => increments[Math.floor(Math.random() * increments.length)];

    return () => {
        if (temperature >= highLimit) {
            increment = false;
        } else if (temperature <= lowLimit) {
            increment = true;
        }
        incrementIndex = (incrementIndex + 1) % increments.length;

        temperature += increment ? increments[incrementIndex] : -(increments[incrementIndex]);
        return temperature;
    };
}

module.exports = createTemperatureController ;
