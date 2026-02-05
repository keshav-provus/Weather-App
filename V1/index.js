const requestUrl = 'https://goweather.xyz/v2/weather/Pune';

async function fetchData() {
    try {
        const response = await fetch(requestUrl);
        const json = await response.json();
        console.log("Data Fetched");
        return json;
    } catch (error) {
        console.error("Error Occurred:", error);
        return null;
    }
}

const data = await fetchData();

if (!data) {
    console.error('No data returned from API');
    process.exit(1);
}

console.log("Temperature:", data.temperature);
console.log("Next Three Days Forecast:");
const forecastArray = Array.isArray(data.forecast) ? data.forecast : [];

forecastArray.forEach((f, i) => {
    console.log(`${i + 1}:`, `${f.day}: ${f.temperature}`);
});

