
var searchBoxEl = document.getElementById("city-search-input");
var searchBoxElForm = document.getElementById("city-search-form");
var weatherCardEl = document.getElementById("weather-card");
var weatherCardHeading = document.getElementById("weather-card-heading");
var bodyEl = document.getElementById("main");


function getApi(citySearchTerm) {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchTerm + '&units=imperial&appid=9a32d5e00225681fffab293fb6a516e1';
  
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status)
          if(response.status == 200){
            return response.json();
          } else {
            document.getElementById('temp').innerHTML = "Error incorrect city. Try again"
              return;
          }

        
      })
      .then(function (data) {
        // console.log(data.weather.id)
        // console.log(data)
        displayData(data);
        
      });
  }


  function displayData(data){

    var mainWeather = data.weather[0].main;
	document.getElementById('description').innerHTML = data.weather[0].description;
	document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '&deg;';
	document.getElementById('location').innerHTML = data.name;
    document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity;
    document.getElementById('wind-speed').innerHTML = "Wind Speed: " + data.wind.speed + "mph";
    document.getElementById('clouds').innerHTML = "Cloud Coverage: " + data.clouds.all + "%";
    weatherCardEl.setAttribute("id", "weather-card2");
    console.log(mainWeather);

   if(mainWeather == "Clear"){
    bodyEl.setAttribute("class", "clear");

   } else if (mainWeather == "Clouds"){
    bodyEl.setAttribute("class", "clouds");
   } else if (mainWeather == "Thunderstorm"){
    bodyEl.setAttribute("class", "thunderstorm");
   } else if (mainWeather == "Drizzle"){
    bodyEl.setAttribute("class", "drizzle");
  } else if (mainWeather == "Rain"){
    bodyEl.setAttribute("class", "rain");
  }  else if (mainWeather == "Snow"){
    bodyEl.setAttribute("class", "snow");
  } 

  }



// NEEDS TO BE LAST

  searchBoxElForm.addEventListener("submit", function(e){
        e.preventDefault();
        var seachBoxValue = searchBoxEl.value.trim();
        getApi(seachBoxValue);
});






