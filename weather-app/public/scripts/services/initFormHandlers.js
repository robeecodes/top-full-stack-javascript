import getWeather from "./getWeather.js";
import renderWeatherData from "../views/renderWeatherData.js";
import initWeatherHandlers from "./initWeatherHandlers.js";

(() => {
    const query = document.querySelector('#query');
    const searchForm = document.querySelector('form');
    const overlay = document.querySelector('#overlay');

    query.addEventListener('input', () => {
        query.setCustomValidity('');
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!query.value) {
            query.focus();
            query.setCustomValidity('Please enter a search term.');
            query.reportValidity();
            return;
        }

        gsap.to(searchForm, {
            autoAlpha: 0,
            duration: 0.5,
            y: -10,
            ease: 'power2.inOut',
        });

        gsap.to(overlay, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.inOut',
        });

        getWeather(`/api/location?query=${encodeURIComponent(query.value)}`)
            .then(weatherData => {
                if (weatherData.error || !weatherData) {
                    gsap.to(overlay, {
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            gsap.to(searchForm, {
                                autoAlpha: 1,
                                duration: 0.5,
                                y: 0,
                                ease: 'power2.inOut',
                                onComplete: () => {
                                    query.focus();
                                    query.setCustomValidity('Something went wrong. Please try again later or search for another location.');
                                    query.reportValidity();
                                }
                            });
                        }
                    });
                } else {
                    query.setCustomValidity('');
                    renderWeatherData(weatherData);
                    initWeatherHandlers(weatherData);
                    searchForm.reset();
                    searchForm.style.display = 'none';
                }
            });
    });
})();