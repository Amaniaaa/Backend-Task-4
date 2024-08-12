document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('.weather-search');
    let errorF = document.getElementById('error');
    let locationF = document.getElementById('location');
    let forecastF = document.getElementById('forecast');
    let longitudeF = document.getElementById('longitude');
    let latitudeF = document.getElementById('latitude');
    let weatherResults = document.getElementById('weather-results');
    const banner = document.getElementById('home-banner');

    // Function to create a delay
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Function to update each field with delays
    async function updateFields(data) {
        weatherResults.style.display = 'block'; // Show the weather results section
        
        // Update location
        locationF.innerText = `Location: ${data.location}`;
        await delay(1000); 

        // Update forecast
        forecastF.innerText = `Forecast: ${data.forecast}`;
        await delay(1000); 

        // Update longitude
        longitudeF.innerText = `Longitude: ${data.longitude}`;
        await delay(1000); 

        // Update latitude
        latitudeF.innerText = `Latitude: ${data.latitude}`;
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Hide the banner when the form is submitted
            banner.style.display = "none";

            let address = document.getElementById('address').value;
            form.reset(); // Reset the form fields

            try {
                const response = await fetch('http://localhost:3000/weather?address=' + encodeURIComponent(address));
                const data = await response.json();

                console.log("API Response:", data); // Debugging

                if (data.error) {
                    weatherResults.style.display = 'block'; // Show the weather results section
                    errorF.innerText = data.error;
                    locationF.innerText = '';
                    forecastF.innerText = '';
                    longitudeF.innerText = '';
                    latitudeF.innerText = '';
                } else {
                    errorF.innerText = ''; // Clear any previous error messages
                    await updateFields(data); // Update fields with delays
                }
            } catch (e) {
                console.error(e);
                weatherResults.style.display = 'block'; // Show the weather results section
                errorF.innerText = 'An error occurred';
                locationF.innerText = '';
                forecastF.innerText = '';
                longitudeF.innerText = '';
                latitudeF.innerText = '';
            }
        });
    } else {
        console.error("Form with class 'weather-search' not found.");
    }
});
