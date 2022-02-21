const $ = document.querySelector.bind(document);

const weather = $('#weather')
const wrapper = $('#wrapper')
const city = $('.city')
const country = $('.country')
const temp = $('.temperature .value')
const desc = $('.desc')
const vision = $('.vision span')
const wind = $('.wind span')
const humidity = $('.humidity span')
const time = $('.time')
var valueSubmit = 'An Giang'

function handleSubmit(event) {
    event.preventDefault();
    valueSubmit = $('.wrapper form input').value;
    changeWeatherUi();
}

async function changeWeatherUi() {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${valueSubmit}&appid=7d891d6ad413335dbaed8190689afb01`

    const data = await fetch(api)
        .then(response => response.json())

    var tempa = (data.main.temp - 273.15).toFixed(0)

    console.log(data);
    city.innerText = data.name + ', ' + data.sys.country
    temp.innerText = (data.main.temp - 273.15).toFixed(0)
    desc.innerText = data.weather[0].main
    vision.innerText = data.visibility + ' m'
    wind.innerText = data.wind.speed + ' m/s'
    humidity.innerText = data.clouds.all + ' %'
    time.innerText = calcTime(data.timezone)

    if (tempa <= 10) {
        weather.setAttribute("class", "weather cold")
        wrapper.setAttribute("class", "wrapper cold")
    }
    else if (tempa <= 15) {
        weather.setAttribute("class", "weather cool")
        wrapper.setAttribute("class", "wrapper cool")
    }
    else if (tempa <= 25) {
        weather.setAttribute("class", "weather warm")
        wrapper.setAttribute("class", "wrapper warm")
    }
    else {
        weather.setAttribute("class", "weather")
        wrapper.setAttribute("class", "wrapper")
    }
}

function calcTime(timezone) {
    var offset = timezone / 3600
    var b = new Date()
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}

changeWeatherUi();