
// let formEl = document.getElementById('#form-card');
// let apiKey = "2ac4a3b4e64c6c4912def98a2d6f546d";
// let searchTerm = document.querySelector('#search-input');

// let city;


// displaySearchHistory();


// document.getElementById("form-card").addEventListener("submit", function (event) {
//     event.preventDefault();
//     getCityApi();
// });





// //fetch city information to get lon and lat and then fetch current weather for the location using them
// function getCityApi() {
//     event.preventDefault();
//     let cityCodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm.value + '&appid=' + apiKey;
//     console.log(searchTerm.value);

//     saveSearch();

//     fetch(cityCodeUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             let cityLat = data[0].lat;
//             let cityLon = data[0].lon;
//             console.log(cityLat);
//             console.log(cityLon);

//             let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=metric&appid=' + apiKey;

//             fetch(weatherUrl)
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (current) {
//                     console.log(current);
//                     display(current);
//                 });
//         });
// }

// function display(current) {
//     // Clear previous forecast results
//     let resultsContainer = document.getElementById('fiveDayWeather');
//     resultsContainer.innerHTML = '';

//     // Display 5-day forecast
//     for (let i = 0; i < 5; i++) {
//         let weatherData = current.list[i * 8];
//         let weatherDate = new Date(weatherData.dt * 1000);
//         let unixFormat = weatherDate.toLocaleDateString('en-US', { weekday: 'long' });
//         let weatherIconCode = weatherData.weather[0].icon;
//         let currentTemp = weatherData.main.temp;
//         let currentHumid = weatherData.main.humidity;
//         let currentWind = weatherData.wind.speed;

//         let resultsItem = document.createElement('div');
//         resultsItem.classList.add("font-weight-bold", "col-12", "col-md-2", "col-lg-2", "m-1", "bg-light", "text-dark", 'border', 'border-dark', 'rounded');
//         resultsItem.innerHTML = unixFormat;

//         let iconUrl = 'https://openweathermap.org/img/wn/' + weatherIconCode + '@2x.png';
//         let iconDisplay = document.createElement('img');
//         iconDisplay.src = iconUrl;

//         let weatherResults = document.createElement('div');
//         weatherResults.innerHTML = ' Temp: ' + currentTemp + '°C, Humidity: ' + currentHumid + '%, Wind Speed: ' + currentWind + 'm/s';

//         resultsItem.appendChild(iconDisplay);
//         resultsItem.appendChild(weatherResults);
//         resultsContainer.appendChild(resultsItem);
//     }
// }

// //save search term to local storage
// function saveSearch() {
//     let searchInput = document.getElementById('search-input').value.trim();
//     if (!searchInput) return;

//     //get the existing search history
//     let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

//     //add new search to array
//     searchHistory.unshift(searchInput);

//     //limit search history to 5 items
//     searchHistory = searchHistory.slice(0, 5);

//     //save new search history
//     localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

//     displaySearchHistory();
//     //do not have mulitple same entries
// }

// function displaySearchHistory() {
//     let searchList = document.getElementById('city-history');
//     searchList.innerHTML = '';
//     // console.log(searchList);
//     let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

//     //display search history on page
//     searchHistory.forEach(function (search) {
//         let listItem = document.createElement('li');
//         listItem.classList.add('p-2', 'bg-light', 'text-dark', 'border', 'border-dark', 'rounded')
//         listItem.textContent = search;
//         searchList.appendChild(listItem);
//         // add clickability to search history and trigger function getCityApi
//         listItem.addEventListener('click', function () {
//             searchTerm.value = search;
//             console.log(search);
//             getCityApi();
//         })
//     });

// };
// // displaySearchHistory();

// // document.querySelector('#search-input').value;

let apiKey = "2ac4a3b4e64c6c4912def98a2d6f546d";
let searchTerm = document.querySelector('#search-input');

displaySearchHistory();

document.getElementById("form-card").addEventListener("submit", function(event) {
    event.preventDefault();
    getCityApi();
});

function displayCurrentWeather(current, cityName) {
    let currentTime = current.list[0].dt_txt;
    let weatherIconCode = current.list[0].weather[0].icon;
    let currentTemp = current.list[0].main.temp;
    let currentHumid = current.list[0].main.humidity;
    let currentWind = current.list[0].wind.speed;

    let resultsContainer = document.getElementById('currentWeather');
    resultsContainer.innerHTML = `
        <h3>Current Weather in ${cityName}</h3>
        <p>Time: ${currentTime}</p>
        <p>Temperature: ${currentTemp}°C</p>
        <p>Humidity: ${currentHumid}%</p>
        <p>Wind Speed: ${currentWind}m/s</p>
        <img src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png" alt="Weather Icon">
    `;
}

function displayFiveDayForecast(fiveDayForecast) {
    let resultsContainer = document.getElementById('fiveDayWeather');
    resultsContainer.innerHTML = "<h3>5 Day Forecast</h3>";

    for (let i = 0; i < 5; i++) {
        let weatherData = fiveDayForecast[i * 8];
        console.log(weatherData);
        let weatherIconCode = weatherData.weather[0].icon;
        let currentTemp = weatherData.main.temp;
        let currentHumid = weatherData.main.humidity;
        let currentWind = weatherData.wind.speed;
        let dt = weatherData.dt_txt;
        let unixFormat = dayjs(dt).format('dddd');

        let forecastItem = document.createElement('div');
        forecastItem.classList.add("font-weight-bold", "col-12", "col-md-2", "col-lg-2", "m-1", "bg-light", "text-dark", 'border', 'border-dark', 'rounded');
        forecastItem.innerHTML = `
            <h4>${unixFormat}</h4>
            <p>Temp: ${currentTemp}°C</p>
            <p>Humidity: ${currentHumid}%</p>
            <p>Wind Speed: ${currentWind}m/s</p>
            <img src="https://openweathermap.org/img/wn/${weatherIconCode}@2x.png" alt="Weather Icon">
        `;

        resultsContainer.appendChild(forecastItem);
    }
}

function getCityApi() {
    event.preventDefault();
    let cityCodeUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm.value + '&appid=' + apiKey;

    saveSearch();

    fetch(cityCodeUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let cityLat = data[0].lat;
            let cityLon = data[0].lon;
            let cityName = data[0].name;

            let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=metric&appid=' + apiKey;

            fetch(weatherUrl)
                .then(function(response) {
                    return response.json();
                })
                .then(function(current) {
                    displayCurrentWeather(current, cityName);
                    displayFiveDayForecast(current.list.slice(1, ));
                });
        });
}

function saveSearch() {
    let searchInput = searchTerm.value.trim();
    if (!searchInput) return;

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.unshift(searchInput);

    searchHistory = searchHistory.slice(0, 5);

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

    displaySearchHistory();
}

function displaySearchHistory() {
    let searchList = document.getElementById('city-history');
    searchList.innerHTML = '';

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    searchHistory.forEach(function(search) {
        let listItem = document.createElement('li');
        listItem.classList.add('p-2', 'bg-light', 'text-dark', 'border', 'border-dark', 'rounded')
        listItem.textContent = search;
        searchList.appendChild(listItem);

        listItem.addEventListener('click', function() {
            searchTerm.value = search;
            getCityApi();
        })
    });
};

