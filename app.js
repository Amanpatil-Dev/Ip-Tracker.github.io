console.log('Leaflet')
const Leaflet = L
const Send = document.querySelector('.send')
const map = Leaflet.map('map').setView([19.07283, 72.88261], 15);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const Attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenstreetMap</a>Contributers, Coded by Aman patil with love'

//Map Init
const tileLayer = Leaflet.tileLayer(tileUrl, {
    Attribution
})

tileLayer.addTo(map);


const Icon = Leaflet.icon({
    iconUrl: 'icon-location.png',
    iconSize: [30, 40]
})







const flyToStore = (Lat,Longi) => {
    console.log(Lat,Longi)
    map.flyTo([Lat,Longi])


}

const MarkMap = (Lat, Longi) => {

    const Marker = Leaflet.marker([Lat, Longi], {
        icon: Icon
    })

    Marker.bindPopup('<h2>Normal Message</h1>')
    // Marker.bindTooltip("my tooltip text")
    Marker.addTo(map)


}





const Load = `
<div class="spinner-grow text-primary mt-3" role="status">
<span class="visually-hidden">Loading...</span>
</div>`

//Everytime when reloading Happens
window.addEventListener('load', (e) => {
    showloader()
    const xhr = new XMLHttpRequest()

    xhr.open('GET', `https://api.ipify.org/?format=json`, true)

    xhr.onload = async function () {
        if (this.status === 200) {
            obj = await JSON.parse(this.responseText)
            const { ip } = obj
            sendAjaxRequest(ip)
        } else {
            console.log('cannot fetch request')
        }

    }

    xhr.send()
    
})

const showloader = () => {

    const IpText = document.querySelector('.ip-text')
    const Location = document.querySelector('.location-text')
    const Timezone = document.querySelector('.timezone-text')
    const ISP = document.querySelector('.isp-text')

    IpText.innerHTML = Load
    Location.innerHTML = Load
    Timezone.innerHTML = Load
    ISP.innerHTML = Load




}



Send.addEventListener('click', (e) => {
    const Input = document.querySelector('.form-control')
    if (!Input.value) {
        console.log('Please provide a input field')
    } else {
        showloader()
        sendAjaxRequest(Input.value)

    }
})

const HandleUi = (Ip, location, Isp) => {
    const IpText = document.querySelector('.ip-text')
    const Location = document.querySelector('.location-text')
    const Timezone = document.querySelector('.timezone-text')
    const ISP = document.querySelector('.isp-text')

    IpText.innerHTML = Ip
    Location.innerHTML = location.region
    Timezone.innerHTML = location.timezone
    ISP.innerHTML = Isp


}

const sendAjaxRequest = async (query) => {
    console.log(query)

    const xhr = new XMLHttpRequest()

    xhr.open('GET', `https://geo.ipify.org/api/v1?apiKey=at_MBPh6s22oWilUQrBaUtRmm5LycrtK&ipAddress=${query}`, true)

    xhr.onload = async function () {
        if (this.status === 200) {
            obj = await JSON.parse(this.responseText)
            const { ip, location, isp } = obj

            HandleUi(ip, location, isp)
            MarkMap(location.lat, location.lng)
            flyToStore(location.lat,location.lng)
            const Input = document.querySelector('.form-control').value = ''

        } else {
            console.log('cannot fetch request')
        }

    }

    xhr.send()
}
