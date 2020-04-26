window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDedscription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            

            fetch(`https://dark-sky.p.rapidapi.com/${long},${lat}`, {
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
            
            });
            
        });
       
    }
});