window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDedscription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            

            fetch(`https://dark-sky.p.rapidapi.com/${lat},${long}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "dark-sky.p.rapidapi.com",
		"x-rapidapi-key": "df1e53203emshe8be152665bd82bp13e870jsncf8c0f1b9ba5"
	}
        })
        .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDedscription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Formula for Celsius
                let celsius = (temperature - 32)*(5/9);
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change temperature to Celsius/Farenheit
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature
                    }
                })
            });
            
        });
       
    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});