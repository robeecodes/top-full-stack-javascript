import {iconSet} from "../utils/iconSet.js";
import {prettyWeatherNames} from "../utils/prettyWeatherNames.js";

export default function renderWeatherData(weatherData) {
    const overlay = document.querySelector('#overlay');
    const weatherDataContainer = document.querySelector('#weather-data');

    weatherDataContainer.innerHTML =
        `
                <div class="card" role="button">
                    <button><i class="ti ti-arrow-back-up"></i></button>
                    <div class="weather-icon">
                        ${iconSet[weatherData.icon]}
                        <p>${prettyWeatherNames[weatherData.icon]}</p>
                    </div>
                    <div class="weather-temperatures" data-units="c">
                        <p>${weatherData.currentTemp}°C</p>
                        <div>
                            <p>High: ${weatherData.tempMax}°C</p>
                            <p>Low: ${weatherData.tempMin}°C</p>
                        </div>
                    </div>
                    <div class="weather-location">
                        <i class="ti ti-location"></i>
                        <p>${weatherData.name}</p>
                    </div>
                </div>
                
                <p id="attribution">Photo by <a href="${weatherData.attribution.userUrl}">${weatherData.attribution.username}</a> on <a href="${weatherData.attribution.imageUrl}">Unsplash</a></p>
                
                <div id="gradient-overlay"></div>
            `

    weatherDataContainer.style.backgroundImage = `url(${weatherData.imageUrl})`;

    gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(weatherDataContainer, {
                autoAlpha: 1,
                duration: 0.5,
                ease: 'power2.inOut',
            });
        }
    });
}