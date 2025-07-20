import {celcToFahr, fahrToCelc} from '../utils/weatherUnits.js';
export default function initWeatherHandlers(weatherData) {
    const weatherDataContainer = document.querySelector('#weather-data');
    const card = weatherDataContainer.querySelector('.card');
    const tempContainer = card.querySelector('.weather-temperatures');
    const backButton = weatherDataContainer.querySelector('button');

    if (localStorage.getItem('units') === 'f') {
        setToFahr(weatherData, tempContainer);
    }

    card.addEventListener('click', (e) => {
        if (e.target === backButton || e.target.parentElement === backButton) {
            return;
        }
        if (tempContainer.getAttribute('data-units') === 'c') {
            setToFahr(weatherData, tempContainer);
        } else {
            setToCelc(weatherData, tempContainer);
        }
    });

    backButton.addEventListener('click', () => {
        gsap.to(weatherDataContainer, {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                [...weatherDataContainer.children].forEach(child => child.remove());
                const searchForm = document.querySelector('form');
                searchForm.style.display = 'flex';
                gsap.to(searchForm, {
                    autoAlpha: 1,
                    duration: 0.5,
                    y: 0,
                    ease: 'power2.inOut',
                });
            },
        });
    });
}

function setToFahr(weatherData, tempContainer) {
    weatherData.currentTemp = celcToFahr(weatherData.currentTemp);
    weatherData.tempMax = celcToFahr(weatherData.tempMax);
    weatherData.tempMin = celcToFahr(weatherData.tempMin);

    tempContainer.innerHTML =
        `
                <p>${weatherData.currentTemp}°F</p>
                <div>
                     <p>High: ${weatherData.tempMax}°F</p>
                     <p>Low: ${weatherData.tempMin}°F</p>
                </div>
            `;

    tempContainer.setAttribute('data-units', 'f');
    localStorage.setItem('units', 'f');
}

function setToCelc(weatherData, tempContainer) {

    weatherData.currentTemp = fahrToCelc(weatherData.currentTemp);
    weatherData.tempMax = fahrToCelc(weatherData.tempMax);
    weatherData.tempMin = fahrToCelc(weatherData.tempMin);

    tempContainer.innerHTML =
        `
        <p>${weatherData.currentTemp}°C</p>
                <div>
                     <p>High: ${weatherData.tempMax}°C</p>
                     <p>Low: ${weatherData.tempMin}°C</p>
                </div>
        `;
    tempContainer.setAttribute('data-units', 'c');
    localStorage.setItem('units', 'c');
}