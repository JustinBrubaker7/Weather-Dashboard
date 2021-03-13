
var searchBoxEl = document.getElementById("city-search-input");
var searchBoxElForm = document.getElementById("city-search-form");
var weatherCardEl = document.getElementById("weather-card");
var weatherCardHeading = document.getElementById("weather-card-heading");
var bodyEl = document.getElementById("main");
var pastSearchesEl = document.getElementById("past-searches");

var citySearchList = [];

function getApi(citySearchTerm) {
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchTerm + '&units=imperial&appid=9a32d5e00225681fffab293fb6a516e1';
  
//     function setRecentSearches(){ 
 

//     citySearchList.unshift(citySearchTerm);
//     window.localStorage.setItem("city", JSON.stringify(citySearchList));
//     var cityResults = JSON.parse(window.localStorage.getItem("city"));
//     var citySearchResults = document.getElementById("past-searches");
//     //citySearchResults.value = cityResults;

//     for(var i = 0; i > citySearchList.length; i++){
//         var pastSeachLi = document.createElement("li");
//         pastSeachLi.innerHTML = citySearchList[i];
//         pastSearchesEl.appendChild(pastSeachLi)
//     }
//     console.log(citySearchList)
//    }


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
    console.log(mainWeather);

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


//   window.onload = function(){

//     document.getElementById("past-searches").innerHTML = JSON.parse(window.localStorage.getItem("city"));
//     //document.getElementById("past-searches").text = JSON.parse(window.localStorage.getItem("city"));
//   }












// NEEDS TO BE LAST

  searchBoxElForm.addEventListener("submit", function(e){
        e.preventDefault();
        var seachBoxValue = searchBoxEl.value.trim();
        getApi(seachBoxValue);
});






