# weather_dashboard

USER STORY
AS A user
I WANT to be able to view a five day weather forecast when I search for a city
SO THAT I can plan my week accordingly

ACCEPTANCE CRITERIA
GIVEN a weather dashboard with a city input
WHEN I search for a city 
THEN I am presented with a weather forecast for the next 5 days
WHEN I click on the search button
THEN I am presnted with the name of the city, the date, an icon of the weather, the temnperature, the humidity, and the wind speed
WHEN I search for a city
THEN the city is stored in the search history and displayed on the page
WHEN I click on a city name in the search history list
THEN I am once again presented with the current weather for that city

__________________________________________

There are two fetches implemented in this code. 
The first fetch is to the geocode api which will generate the lon and lat values of the city searched. 
The second fetch is to the weeather api to generate the weather forecast.
The search string entered in the search bar is saved to local storage.
The last 5 saved searches are presented to the user in a list under the search bar. 
The user can click on a city name in the list to once again pull up the weather for that city. 

