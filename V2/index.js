async function getWeatherDataUsingCity(cityName){
    const requestUrl = `https://goweather.xyz/v2/weather/${cityName}`;
    
    async function fetchData() {
        try {
            const response = await fetch(requestUrl);
            const json = await response.json();
            return json;
        } 
        catch (error) {
            console.log("Error Occured: ", error);
            return null;
        }
    }

    const data = await fetchData();
    return data;
}

async function getWeatherDataUsingIP(){
    let city = null;
    try {
        const response = await fetch('http://ip-api.com/json/');
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        city = data.city;
    } 
    catch (error) {
        console.error('Failed to fetch location:', error.message);
        return null;
    }

    if(!city) {
        console.error('City information is not available');
        return null;
    }
    else{
        const weatherData = await getWeatherDataUsingCity(city);
        return [weatherData,city];
    }
}

// Taking User Input for choosing the method to fetch weather data

const readline = require('readline/promises'); 
const {stdin: input, stdout: output} = require('process');
const { get } = require('http');

const rl = readline.createInterface({ input, output });
let cityName = null;
async function main() {
    const choice = await rl.question('Choose method to fetch weather data:\n1. Using City Name\n2. Using IP Address\nEnter your choice (1 or 2): ');

    let weatherData = null;

    if (choice === '1') {
        cityName = await rl.question('Enter the city name: ');
        weatherData = await getWeatherDataUsingCity(cityName);
    } 
    else if (choice === '2') {
        let dataArray = await getWeatherDataUsingIP();
        weatherData = dataArray[0];
        cityName = dataArray[1];
    } 
    else {
        console.log('Invalid choice. Please enter 1 or 2.');
        rl.close();
        return;
    }

    if (!weatherData) {
        console.error('No data returned from API');
        rl.close();
        return;
    }
    console.log("City:", cityName);
    console.log("Temperature:", weatherData.temperature);
    console.log("Next Three Days Forecast:");
    const forecastArray = Array.isArray(weatherData.forecast) ? weatherData.forecast : [];
    

    forecastArray.forEach((f, i) => {
        console.log(`${i + 1}:`, `${f.day}: ${f.temperature}`);
    });

    rl.close();
}

main();