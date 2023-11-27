let searchTerm = document.querySelector('#search-input');
let formEl = document.getElementById('#form-card');
let apiKey = "2ac4a3b4e64c6c4912def98a2d6f546d";


let city;

let cityCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm + '&appid=' + apiKey;



document.getElementById("form-card").addEventListener("submit", getCityApi);

function search() {

    let searchResults = [];

    // Display the search results in the main content
    var resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ("<h3>5 Day Forecast for </h3>" + city);

    //  search result to the container
    for (let i = 0; i < searchResults.length; i++) {
        var resultItem = document.createElement('p');
        resultItem.textContent = searchResults[i];
        resultsContainer.appendChild(resultItem);
    }
}

//fetch current weather
function getWeatherApi() {

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}

//fetch city information to get lon and lat
function getCityApi() {

    event.preventDefault();
    fetch(cityCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let cityLat = data.lat;
            let cityLon = data.lon;
            console.log(cityLat);
            console.log(cityLon);
        });

        let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (current) {
            console.log(current)
        })

}

