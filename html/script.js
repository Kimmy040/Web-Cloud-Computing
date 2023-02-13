
function direction(degrees){
    if (degrees >= 0 && degrees < 22.5) return "N"
    if (degrees >= 22.5 && degrees < 67.5) return "NE"
    if (degrees >= 67.5 && degrees < 112.5) return "E"
    if (degrees >= 112.5 && degrees < 157.5) return "SE"
    if (degrees >= 157.5 && degrees < 202.5) return "S"
    if (degrees >= 202.5 && degrees < 247.5) return "SW"
    if (degrees >= 247.5 && degrees < 292.5) return "W"
    if (degrees >= 292.5 && degrees < 337.5) return "NW"
    if (degrees >= 337.5 && degrees < 360) return "N"
    else return ""
}

function icon(cloudcover, rain) {
    if (cloudcover < 40) return "sun.jpg"
    if (cloudcover < 80) return "cloudsun.jpg"
    return "cloud.jpg"
}


function setMovie(data) {
    console.log(data)
    let title = document.getElementById("title")
    title.innerHTML = data.title
    let temperature = document.getElementById("temperature");
    temperature.innerHTML = data.genre_names;
    let wind_speed = document.getElementById("wind_speed");
    wind_speed.innerHTML = data.user_rating;
    let apparent_temperature = document.getElementById("apparent_temperature");
    apparent_temperature.innerHTML = data.year;
    let wind_direction = document.getElementById("wind_direction");
    wind_direction.innerHTML = direction(data.plot_overview)
    let cloudimage = document.getElementById("cloudimage");
    cloudimage.innerHTML = `<img width="100px" src="${data.poster}">`
}

/*function getWeather() {
    let latitude="38.67"
    let longitude="-9.32"
    let fields="precipitation,cloudcover,winddirection_10m,apparent_temperature,temperature_2m,relativehumidity_2m,windspeed_10m" // er hva vi vil hente ut, følger api dokumentasjonen
    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=${fields}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {setWeather(data); setHourly(data);});
}*/
function getMovie() {
    let movieId="3173903"
    let apiKey='GlgR550tZqXd7XRX5w5FXfiEbxZ1TBMbrb6ZM9Tm'
    let fields="precipitation,cloudcover,winddirection_10m,apparent_temperature,temperature_2m,relativehumidity_2m,windspeed_10m" // er hva vi vil hente ut, følger api dokumentasjonen
    let url = `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}` //&append_to_response=sources`;
    fetch(url)
    .then(response => response.json())
    .then(data => {setMovie(data);console.log(data);});
}

/*
function setHourly(data) {
    let time = new Date().getHours()
    console.log(time)
    let hourly = document.getElementById("hourlines");
    data.hourly.time.slice(time,time+24).forEach(function(time,idx) {
        let li = document.createElement("li");
        li.classList = "houritem"
        li.innerHTML = `<div>${time.substring(11)}</div><div><img width="50px" src="images/${icon(data.hourly.cloudcover[idx], data.hourly.precipitation[idx])}"></div><div>${data.hourly.temperature_2m[idx]}ºC</div><div>${data.hourly.precipitation[idx]} mm</div>`;
        hourly.appendChild(li);
    });
}*/