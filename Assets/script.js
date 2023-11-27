
let formEl = document.getElementById('#form-card');
let apiKey = "2ac4a3b4e64c6c4912def98a2d6f546d";
let searchTerm = document.querySelector('#search-input');

let city;


displaySearchHistory();


document.getElementById("form-card").addEventListener("submit", getCityApi);





//fetch city information to get lon and lat and then fetch current weather for the location using them
function getCityApi() {
event.preventDefault();
    // let searchTerm = document.querySelector('#search-input').value;
    let cityCodeUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm.value + '&appid=' + apiKey;
    console.log(searchTerm.value);

    saveSearch();

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

                    // // put icon in place
                    iconDeploy();
                    function iconDeploy() {
                    let iconUrl = 'https://openweathermap.org/img/wn/' + weatherIconCode + '@2x.png';
                                        
                    let iconDisplay = document.createElement('img');

                    resultsContainer.append(iconDisplay);

                    iconDisplay.src=iconUrl;
                    }
                    
                    let weatherResults = document.createElement('div');

                    resultsContainer.append(weatherResults);

                    weatherResults.innerHTML = (' <h5>Today</h5>' + currentTime + ' Temp: ' + currentTemp + 'c ' + 'Humidity: ' + currentHumid + ' Wind Speed: ' + currentWind + 'kph');

                }
                //for loop that gets every 8th index starting at 8

            })


    });



}

    //save search term to local storage
    function saveSearch() {
        let searchInput = document.getElementById('search-input').value.trim();
        if (!searchInput) return;

        //get the existing search history
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        //add new search to array
        searchHistory.unshift(searchInput);

        //limit search history to 5 items
        searchHistory = searchHistory.slice(0, 5);

        //save new search history
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        displaySearchHistory();
        //do not have mulitple same entries
    }

    function displaySearchHistory() {
        let searchList = document.getElementById('city-history');
        searchList.innerHTML = '';
        // console.log(searchList);
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        //display search history on page
        searchHistory.forEach(function (search) {
            let listItem = document.createElement('li');
            listItem.textContent = search;
            searchList.appendChild(listItem);
            // add clickability to search history and trigger function getCityApi
            listItem.addEventListener('click', function() {
                searchTerm.value = search;
                console.log(search);
                getCityApi();
            })
        });

    };
    // displaySearchHistory();

    // document.querySelector('#search-input').value;