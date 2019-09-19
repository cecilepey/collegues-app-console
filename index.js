const {Presentation} = require(`./presentation.js`)
const { Service}  = require(`./service.js`)

const service = new Service(); 
const presentation = new Presentation(service); 



console.log(`** Administration Collegues **`);

presentation.start(); 
