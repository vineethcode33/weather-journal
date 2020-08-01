/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const API_KEY = "4cccbc66291a4788a485664fbdb66f0f";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// function to GET data
const getData = async (path) => {
  const makeFetch = await fetch(path)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.log("in error");
      console.log(error);
    });
  return makeFetch;
};

// function to POST data
const postRequest = async (path, data) => {
  const makePost = await fetch(path, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.log(error);
    });
  return makePost;
};

const onGenerateClick = (event) => {
  const zipCode = document.getElementById("zip").value;
  const userResponse = document.getElementById("feelings").value;
  const weatherEndPoint = `${BASE_URL}${zipCode}&appid=${API_KEY}&units=imperial`;

  getData(weatherEndPoint)
    .then((data) => {
      postRequest("/postData", {
        userResponse,
        date,
        temperature: data.main.temp,
      })
        .then((data) => {
          getData("/everything")
            .then((everything) => {
              console.log(everything);
              document.getElementById("date").innerHTML = everything.date;
              document.getElementById("temp").innerHTML =
                everything.temperature;
              document.getElementById("content").innerHTML =
                everything.userResponse;
            })
            .catch((error) => {
              console.log(`Error in getting everything : ${error}`);
            });
        })
        .catch((error) => {
          console.log(`Error in posting data: ${error}`);
        });
    })
    .catch((error) => {
      console.log(`Error in getting weather data: ${error}`);
    });
};

document.getElementById("generate").addEventListener("click", onGenerateClick);
