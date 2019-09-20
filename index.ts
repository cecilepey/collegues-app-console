//const {Presentation} = require(`./presentation.js`)
//const { Service}  = require(`./service.js`)
import Service from './service';
import Presentation from './presentation';

const service = new Service(); 
const presentation = new Presentation(service); 



console.log(`** Administration Collegues **`);

presentation.start(); 
