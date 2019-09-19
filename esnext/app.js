request = require('request').defaults({ jar: true });

let favoriteCityId = 'Rome';

console.log(favoriteCityId);

favoriteCityId = 'Paris';

console.log(favoriteCityId);

const citiesId = ["paris", "nyc", "rome", "rio-de-janeiro"];

console.log(citiesId);

//citiesId = []; 

citiesId.push("Tokyo");

console.log(citiesId);

let getWeather = function (cityId) {

    let city = cityId.toUpperCase();

    const temperature = 20;

    return { city: city, temperature: temperature }

}

const weather = getWeather(favoriteCityId);

console.log(weather);

const city = weather.city;
const temperature = weather.temperature;

console.log(city);
console.log(temperature);

let [parisId, nycId, ...othersCitiesId] = citiesId;

console.log(parisId);
console.log(nycId);
console.log(othersCitiesId.length);

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this._price + ' ]'
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }

    static getDefaultTrip() {

        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');

    }
}

let parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg');

console.log(parisTrip);
console.log(parisTrip.name);

console.log(parisTrip.toString());

parisTrip.price = 100;

console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();

console.log(defaultTrip.toString());


class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }

    toString() {
        return `FreeTrip [${this.id} ${this.name} ${this.imageUrl} ${this._price}]`
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');

console.log(freeTrip.toString());


class TripService {
    constructor() {
        this.set = new Set([new Trip('paris', 'Paris', 'img/paris.jpg'), new Trip('nantes', 'Nantes', 'img/nantes.jpg'), new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')])
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                for (let trip of this.set) {
                    if (trip.name === tripName) {
                        resolve(trip);
                    }
                }

                reject(`No trip with name ${tripName}`);

            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.map = new Map();
        this.map.set('paris', 100);
        this.map.set('rio-de-janeiro', 800);
    }

    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                this.map.forEach((value, id) => {
                    if (tripId === id) {
                        resolve(value);
                    }
                })

                reject(`No price found for id ${tripId}`);

            }, 2000)
        });
    }
}

const tripService = new TripService();
const priceService = new PriceService();

tripService.findByName('Paris')
    .then(trip => console.log('trip found ', trip.toString()))
    .catch(err => console.log(err));

tripService.findByName('Toulouse')
    .then(trip => console.log('trip found ', trip.toString()))
    .catch(err => console.log(err));

tripService.findByName('Rio de Janeiro')
    .then(trip => priceService.findPriceByTripId(trip.id))
    .then(prix => console.log('Price found : ', prix))
    .catch(err => console.log(err));

tripService.findByName('Nantes')
    .then(trip => priceService.findPriceByTripId(trip.id))
    .then(prix => console.log('Price found : ', prix))
    .catch(err => console.log(err)); 