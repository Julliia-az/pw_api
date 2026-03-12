document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#cityName').value;

    if (!cityName){
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apiKey = '51bce178161a4941dbdb14afaef6b87a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
    const results = await fetch(apiUrl);
    const json = await results.json();

    console.log(json)
});

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}