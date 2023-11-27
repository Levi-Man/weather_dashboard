
let formEl = document.getElementById('#form-card');
let apiKey = "2ac4a3b4e64c6c4912def98a2d6f546d";


let city;





document.getElementById("form-card").addEventListener("submit", getCityApi);





//fetch city information to get lon and lat and then fetch current weather for the location using them
function getCityApi() {

    let searchTerm = document.querySelector('#search-input').value;
    let cityCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm + '&appid=' + apiKey;
    console.log(searchTerm);


    event.preventDefault();
    //fetch city geolocation data and extract lon and lat
    fetch(cityCodeUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let cityLat = data[0].lat;
            let cityLon = data[0].lon;
            console.log(cityLat);
            console.log(cityLon);

            let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=metric&appid=' + apiKey;
            //fetch current weather using lon and lat from previous fetch
            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (current) {
                    console.log(current)
                    let currentTime = current.list[0].dt_txt;
                    let weatherIconCode = current.list[0].weather[0].icon;
                    let currentTemp = current.list[0].main.temp;
                    let currentHumid = current.list[0].main.humidity;
                    let currentWind = current.list[0].wind.speed;

                    display();

                    function display() {

                        let searchTerm = document.querySelector('#search-input').value;
                        // Display the search results in the main content
                        let resultsContainer = document.getElementById('searchResults');
                        resultsContainer.innerHTML = ("<h3>5 Day Forecast for </h3>" +
                            searchTerm);

                        let weatherResults = document.createElement('div');

                        resultsContainer.append(weatherResults);

                        weatherResults.innerHTML = ('<h5>Today</h5>' + currentTime + weatherIconCode + 'Temp: ' + currentTemp + 'c' + 'Humidity: ' + currentHumid + 'Wind Speed: ' + currentWind + 'kph');

                    }

                })


        });


}

