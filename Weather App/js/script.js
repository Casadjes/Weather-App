const city = document.getElementById("city");
const country = document.getElementById("country");
const temp = document.querySelector(".celcius span");
const dayStatus = document.querySelector(".day-status span");
const maxTemp = document.getElementById("max");
const minTemp = document.getElementById("min");
const humidity = document.getElementById("humidity");
const speed = document.getElementById("speed");
const countryInput = document.getElementById("country-input");
const cityInput = document.getElementById("city-input");
const labels = document.querySelectorAll(".label");
const form = document.getElementById("form");

/* 
!-------------------API---------------------
 */

async function callApi(city, country) {
	try {
		const apiKey = "29094fe66fc6ac763ba43947466af9e4";
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
		const res = await fetch(url);
		const data = await res.json();
		if (data.cod === "404") {
			showError("City not Found");
		}
		console.log(data);
		showCard(data);
	} catch (error) {
		console.log(error);
	}
}

/* 
!---------------Inputs-------------------
*/
document.addEventListener("click", (e) => {
	const clickedElement = e.target;
	if (clickedElement === cityInput || clickedElement === countryInput) {
		const label = clickedElement.labels[0];
		label.classList.add("active");
	} else if (!cityInput.value && !countryInput.value) {
		labels.forEach((label) => {
			label.classList.remove("active");
		});
	}
});

/* 
!----------------Form--------------------
*/
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (cityInput.value === "" || countryInput === "") {
		showError("both fields are required");
		return;
	} else if (!cityInput.value && !countryInput.value) {
		labels.forEach((label) => {
			label.classList.remove("active");
		});
	}

	callApi(cityInput.value, countryInput.value);
	form.reset();
});
/* 
!---------------ShowCard------------------
*/

const showCard = (data) => {
	// const container = document.getElementById("main");
	// const fragment = document.createDocumentFragment();
	// const template = document.getElementById("template").content;
	// const clone = template.cloneNode(true);

	// clone.getElementById("city").textContent = data.name;
	// clone.querySelector(".celcius span").textContent = `${kelvinToCelsius(
	// 	data.main.temp
	// )}°C`;

	// clone.querySelector("#max").textContent = `${kelvinToCelsius(
	// 	data.main.temp_max
	// )}°C`;
	// clone.querySelector("#min").textContent = `${kelvinToCelsius(
	// 	data.main.temp_min
	// )}°C`;

	// console.log(kelvinToCelsius(data.main.temp_max));
	// clone.querySelector("#humidity").textContent = `${data.main.humidity}`;

	// container.innerHTML = "";
	// fragment.appendChild(clone);
	// container.appendChild(fragment);

	document.getElementById("city").textContent = data.name + ",";
	document.getElementById("country").textContent = data.sys.country;
	document.querySelector(".celcius span").textContent =
		kelvinToCelsius(data.main.temp) + "°C";
	document.querySelector("#max").textContent = `${kelvinToCelsius(
		data.main.temp_max
	)}°C`;
	document.querySelector("#min").textContent = `${kelvinToCelsius(
		data.main.temp_min
	)}°C`;
	document.querySelector("#humidity").textContent = `${data.main.humidity}%`;

	document
		.querySelector("#img-card")
		.setAttribute(
			"src",
			` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		);

	document.querySelector(".celcius p").textContent = data.weather[0].main;
};

/* 
!-------------Kelvin To Celcius--------------
*/

function kelvinToCelsius(tempKelvin) {
	const tempCelsius = (tempKelvin - 273.15).toFixed(1);
	return parseFloat(tempCelsius);
}
/* 
!---------------ShowError-----------------
*/
function showError(message) {
	// console.log(message);
	const alert = document.createElement("p");
	alert.classList.add("alert-message");
	alert.innerHTML = message;
	form.appendChild(alert);

	setTimeout(() => {
		alert.remove();
	}, 3000);
}

/* 
!-----------------Theme----------------------
*/
const themeToggle = document.getElementById("theme-toggle");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const card = document.querySelector(".card");

themeToggle.addEventListener("click", () => {
	themeToggle.classList.toggle("active");
	header.classList.toggle("active");
	nav.classList.toggle("active");
	card.classList.toggle("active");
});
