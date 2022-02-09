// collectiong all my imports from index.html file
var formEl = document.getElementById("user-form");
var formInput = document.getElementById("form-input");
var buttonsForStates = document.getElementById("paddingD");
var cd = document.querySelector(".cd");
var now = new Date().toLocaleDateString()
console.log(now)
// collects the city name and pass it in the url and then url to the fetch method
var getURL = (city) => {
  var url =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&cnt=6&appid=80f64c79344a8334051f536fc13830c3";
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          cityResponses(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Weather");
    });
};
// collects the fetch information and display data on the index.html
var currentDate = document.createElement("div");
var cityResponses = (data, city) => {
  // information for the save day display
  currentDate.classList.add("container10");
  currentDate.innerHTML =
    "<div class='container1'> <h5><strong>" +
    data.city.name + " "+
    now+
    "</storng></h5> <img src='http://openweathermap.org/img/wn/" +
    data.list[0].weather[0].icon +
    ".png'> </div> <h6>Temp: " +
    data.list[0].main.temp +
    " F </h6> <h6>Wind: " +
    data.list[0].wind.speed +
    " MPH </h6> <h6>Humidity: " +
    data.list[0].main.humidity +
    " % </h6> <h6>UV index: </h6>";
  cd.appendChild(currentDate);
// for loop to display the 5 other days coming up
  for (var i = 1; i < 6; i++) {
    var theOther5Days = document.getElementById(`${i}`);
    theOther5Days.innerHTML =
      "<h5><strong>" +
      now +
      "</storng></h5> <img src='http://openweathermap.org/img/wn/" +
      data.list[i].weather[0].icon +
      ".png'> <h6>Temp: " +
      data.list[i].main.temp +
      " F </h6> <h6>Wind: " +
      data.list[i].wind.speed +
      " MPH </h6> <h6>Humidity: " +
      data.list[i].main.humidity +
      " % </h6> <h6>UV index: </h6>";
  }
};
// collects input from the buttons
function getCityBtn(event) {
  var city = event.target.getAttribute('data-city')
  if (city) {
    getURL(city);
  }
}
// collects user input from the text box.
function getCity(event) {
  event.preventDefault();
  var city = formInput.value.trim();
  if (city) {
    getURL(city);
  currentDate.textContent = "";
    formInput.value=""
  }
}
// click events from the html index
formEl.addEventListener("submit", getCity);
buttonsForStates.addEventListener("click", getCityBtn);