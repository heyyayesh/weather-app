async function getJson(city){
    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=01c11d354d867a15cbad8f667e806a55&units=metric`);
        const cityData = await response.json();
        return {
            name: cityData.name,
            date: getTime(cityData.sys.sunrise).date,
            weather: cityData.weather[0].description,
            temp: cityData.main.temp,
            feelsLike: cityData.main.feels_like,
            tempMin: cityData.main.temp_min,
            tempMax: cityData.main.temp_max,
            humidity: cityData.main.humidity,
            sunrise: getTime(cityData.sys.sunrise).time,
            sunset: getTime(cityData.sys.sunset).time,
            clouds: cityData.clouds.all,
        };
    }
    catch{
        console.log('City not found!')
    }
}

function getTime(unixTimestamp){
    dateObj = new Date(unixTimestamp * 1000);
    let localTime = dateObj.getTime();
    localOffset = dateObj.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    const offset = 5.5;  
    const ISTtime = utc + (3600000*offset);
    const time = new Date(ISTtime).toLocaleTimeString();
    const date = new Date(ISTtime).toLocaleDateString();
    return {time, date};
}

getJson('cuttack').then(res => console.table(res));