//476fd7cd60c84a97e2265540761a1986       api key

//api call- https://api.openweathermap.org/data/2.5/weather?q=pune&appid=476fd7cd60c84a97e2265540761a1986




const cityName = document.querySelector('.location');
const curDateTime = document.querySelector('.dateAndTime');
const weatherForcast = document.querySelector('.calcBtn');
const weatherIcon = document.querySelector('.iconOfCurrentWhether');
const weatherInDegree = document.querySelector('.whetherInDegree');
const weatherMin = document.querySelector('.weatherMin');
const weatherMax = document.querySelector('.weatherMax');
const searchCity = document.querySelector('.search-div');

//to get actual country name 
const getCountryName = (countryCode) => {
    return new Intl.DisplayNames([countryCode], { type: 'region' }).of(countryCode);
}

// to get actual time date Formatter
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000) //date in milliseconds
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formattedDate = formatter.format(curDate)
}

//addSubmit event so that get true information
let city = 'Patna'
searchCity.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector('#search-field');
    city = cityName.value;
    getWeatherData();
    cityName.value = "";
})

const getWeatherData = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=476fd7cd60c84a97e2265540761a1986`

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);

        //data destructuring
        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`
        curDateTime.innerHTML = `${getDateTime(dt)}`;
        let kelvinTemp = main.temp;
        let celsiusTemp = kelvinTemp - 273.15; // Convert Kelvin to Celsius
        weatherInDegree.innerHTML = `${celsiusTemp.toFixed(2)}&#176;C`;
        let kelvinTempMIn = main.temp_min;
        let celsiusMin = kelvinTempMIn - 273.15; // convert kelvin to celsius
        weatherMin.innerHTML = `Min: ${celsiusMin.toFixed(2)}&#176;C`;
        let kelvinTempMax = main.temp_max;
        let celsiusMax = kelvinTempMax - 273.15;
        weatherMax.innerHTML = `Max: ${celsiusMax.toFixed(2)}&#176;C`;

        weatherForcast.innerHTML = `${weather[0].main}`;
        weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`

        //Footer section or additional section 
        let kelvinMainFeel = main.feels_like - 273.15;
        document.querySelector('.whether-feelsLike').innerHTML = `${kelvinMainFeel.toFixed(2)}&#176`;
        document.querySelector('.whether-humidity').innerHTML = `${main.humidity}`;
        document.querySelector('.whether-wind').innerHTML = `${wind.speed.toFixed(2)}`;
        document.querySelector('.whether-pressure').innerHTML = `${main.pressure}`;

    } catch (error) {
        console.log(error);
    }
}


document.body.addEventListener('load', getWeatherData())