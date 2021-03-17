
var searchBoxEl = document.getElementById("city-search-input");
var searchBoxElForm = document.getElementById("city-search-form");
var weatherCardEl = document.getElementById("weather-card");
var weatherCardElday1 = document.getElementById("weather-card-5day");
var weatherCardElday2 = document.getElementById("weather-card-5day-2");
var weatherCardElday3 = document.getElementById("weather-card-5day-3");
var weatherCardElday4 = document.getElementById("weather-card-5day-4");
var weatherCardElday5 = document.getElementById("weather-card-5day-5");
var weatherCardHeading = document.getElementById("weather-card-heading");
var forcastHeading = document.getElementById("5-day-forcast-title");
var bodyEl = document.getElementById("main");
var pastSearchesEl = document.getElementById("past-searches");



function getApi(citySearchTerm) {
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchTerm + '&units=imperial&appid=9a32d5e00225681fffab293fb6a516e1';

    fetch(requestUrl)
      .then(function (response) {
        //console.log(response.status)
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
        //setRecentSearches();
      });
  }


  function displayData(data){

    var mainWeather = data.weather[0].main;
	document.getElementById('description').innerHTML = data.weather[0].description;
	document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '&deg;';
	document.getElementById('location').innerHTML = data.name;
    document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity + "%";
    document.getElementById('wind-speed').innerHTML = "Wind Speed: " + Math.round(data.wind.speed) + "mph";
    document.getElementById('clouds').innerHTML = "Cloud Coverage: " + data.clouds.all + "%";
    weatherCardEl.setAttribute("id", "weather-card2");
    forcastHeading.textContent = "5-Day Forcast";
    //console.log(mainWeather);

   if(mainWeather == "Clear"){
    bodyEl.setAttribute("class", "clear");
    var icon = document.createElement('i');
    icon.classList = "far fa-sun fa-xs";
    document.getElementById('temp').appendChild(icon);

   } else if (mainWeather == "Clouds"){
    bodyEl.setAttribute("class", "clouds");
    var icon = document.createElement('i');
    icon.classList = "fas fa-cloud-sun";
    document.getElementById('temp').appendChild(icon);

   } else if (mainWeather == "Thunderstorm"){
    bodyEl.setAttribute("class", "thunderstorm");
    var icon = document.createElement('i');
    icon.classList = "fas fa-bolt";
    document.getElementById('temp').appendChild(icon);

   } else if (mainWeather == "Drizzle"){
    bodyEl.setAttribute("class", "drizzle");
    var icon = document.createElement('i');
    icon.classList = "fas fa-cloud-rain";
    document.getElementById('temp').appendChild(icon);

  } else if (mainWeather == "Rain"){
    bodyEl.setAttribute("class", "rain");
    var icon = document.createElement('i');
    icon.classList = "fas fa-cloud-showers-heavy";
    document.getElementById('temp').appendChild(icon);
    
  }  else if (mainWeather == "Snow"){
    bodyEl.setAttribute("class", "snow");
    var icon = document.createElement('i');
    icon.classList = "fas fa-snowflake";
    document.getElementById('temp').appendChild(icon);
  } 

  }


function getApiForcast(citySearchTerm) {
    var requestUrl5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchTerm + "&units=imperial&appid=9a32d5e00225681fffab293fb6a516e1"

    fetch(requestUrl5day)
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
        console.log(data)
        displayDataForcast(data);
        //setRecentSearches();
      });
  }


  function displayDataForcast(data){
    document.getElementById('tempurature1').innerHTML = Math.round(data.list[3].main.feels_like) + '&deg;';
    document.getElementById('city1').innerHTML = data.city.name;
    weatherCardElday1.setAttribute("id", "weather-cardday2");

    //day 2
    document.getElementById('tempurature2').innerHTML = Math.round(data.list[11].main.feels_like) + '&deg;';
	  document.getElementById('city2').innerHTML = data.city.name;
    weatherCardElday2.setAttribute("id", "weather-cardday3");

    //day 3
    document.getElementById('tempurature3').innerHTML = Math.round(data.list[19].main.feels_like) + '&deg;';
    document.getElementById('city3').innerHTML = data.city.name;
    weatherCardElday3.setAttribute("id", "weather-cardday4");

   //day 4
    document.getElementById('tempurature4').innerHTML = Math.round(data.list[27].main.feels_like) + '&deg;';
    document.getElementById('city4').innerHTML = data.city.name;
    weatherCardElday4.setAttribute("id", "weather-cardday5");

    //day 5
    document.getElementById('tempurature5').innerHTML = Math.round(data.list[34].main.feels_like) + '&deg;';
    document.getElementById('city5').innerHTML = data.city.name;
    weatherCardElday5.setAttribute("id", "weather-cardday6");
}


var citySearchList = [];
var cityListItem1 = document.getElementById("city-list-1");

//Setting recent searches to local storage

window.onload = function(){
 var citySearchListArray = JSON.parse(window.localStorage.getItem("city"));
  getFromLocalStorage(citySearchListArray)
  citySearchList = citySearchListArray
}

function getFromLocalStorage(data) {
 
  if(data != ""){
    for(var i = 0; i < 3; i++){
      var listItemEl = document.createElement("li");
      listItemEl.textContent = data[i];
      pastSearchesEl.appendChild(listItemEl);
      listItemEl.setAttribute("class", "text-white bg-dark m-3 p-3 text-center col-12");
      listItemEl.onclick = function(){
        var textContentofLi = listItemEl.innerHTML;
        getApi(textContentofLi);
        getApiForcast(textContentofLi)
      };
    }

  }

}


// NEEDS TO BE LAST

  searchBoxElForm.addEventListener("submit", function(e){
        e.preventDefault();
        var seachBoxValue = searchBoxEl.value.trim();
        getApi(seachBoxValue);
        getApiForcast(seachBoxValue);
        citySearchList.push(seachBoxValue);
        console.log(citySearchList);
        window.localStorage.setItem('city', JSON.stringify(citySearchList));
});


