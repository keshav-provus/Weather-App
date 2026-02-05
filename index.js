const requestUrl = 'https://goweather.xyz/v2/weather/Pune';

// ASYNC FUNCTION
let responseData = async function(){
    const response = await fetch(requestUrl);
    try {
        responseData = await response.json();
        console.log("Data Fetched");
    } catch (error) {
        console.log("Error Occured");
    }

    return await responseData;
}

console.log(await responseData());
