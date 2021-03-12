
var searchBoxEl = document.getElementById("city-search-input");
var searchBoxElForm = document.getElementById("city-search-form");


function getApi(citySearchTerm) {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchTerm + '&units=imperial&appid=9a32d5e00225681fffab293fb6a516e1';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        
      });
  }

  //fetchButton.addEventListener('click', getApi);
  


  searchBoxElForm.addEventListener("submit", function(e){
        e.preventDefault();
        var seachBoxValue = searchBoxEl.value;
        console.log(seachBoxValue)
    
    getApi(seachBoxValue);
});






  //when someone submits a search
  //the API data is fetched
  //the data is displayed
  //