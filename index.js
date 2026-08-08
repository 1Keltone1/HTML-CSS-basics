const icon = document.getElementById("weather-icon");
const mainTemp = document.getElementById("main-temperature");
const feel = document.getElementById("feels-like");
const humid = document.getElementById("humidity");
const wind = document.getElementById("wind");
const gust = document.getElementById("wind-gust");
const weathType = document.getElementById("weather-main");
const weathLocation = document.getElementById("location");

const container = document.getElementById("container");
const selector = document.getElementById("select-location");

const getWeathBtn = document.getElementById("get-weather-btn");

async function getWeather(city) {
  try {
    let response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }
    let weatherData = await response.json();
    return weatherData;
  } catch(error) {
    console.error(error);
  }
}

async function showWeather(city) {
  try {
    container.style.display = "grid";
    const data = await getWeather(city);

    if (!data) {
      throw new Error();
    } else {
      let objData = {};
      objData.temp = data.main.temp;
      objData.feel = data.main["feels_like"];
      objData.humidity = data.main.humidity;
      objData.wind = data.wind.speed;
      objData.gust = data.wind.gust;
      objData.type = data.weather[0].main;
      objData.icon = data.weather[0].icon;
      objData.loc = data.name;

      if (objData.temp != undefined) {
        mainTemp.innerText = `Temperature: ${objData.temp} C`;
      } else {
        mainTemp.innerText = 'Temperature: N/A';
      }

      if (objData.feel != undefined) {
        feel.innerText = `Feels like: ${objData.feel} C`;
      } else {
        feel.innerText = 'Feels like: N/A';
      }

      if (objData.humidity != undefined) {
        humid.innerText = `Humidity: ${objData.humidity} %`;
      } else {
        humid.innerText = 'Humidity: N/A';
      }

      if (objData.wind != undefined) {
        wind.innerText = `Wind: ${objData.wind} m/s`;
      } else {
        wind.innerText = `Wind: N/A`
      }

      if (objData.gust != undefined) {
        gust.innerText = `Wind: ${objData.gust} deg`;
      } else {
        gust.innerText = `Wind gust: N/A`
      }

      if (objData.type != undefined) {
        weathType.innerText = `Weather: ${objData.type}`;
      } else {
        weathType.innerText = `Weather: N/A`;
      }

      if (objData.icon != undefined) {
        icon.src = objData.icon;
        icon.alt = objData.type != undefined ? objData.type : "N/A";
      }

      if (objData.loc != undefined) {
        weathLocation.innerText = `Location: ${objData.loc}`;
      } else {
        weathLocation.innerText = `Location: N/A`;
      }
    }
  } catch(error) {
    console.error("Error in showWeather:", error);
    alert("Something went wrong, please try again later");
    container.style.display = 'none';
  }
}

getWeathBtn.addEventListener("click", () => {
  if (selector.value != "") {
    showWeather(selector.value);
  } else {
    container.style.display = "none";
  }
})