import r from 'request-promise-native'; 
const request = r.defaults({ jar: true })
import {Collegue} from './domain'; 




//request = require('request-promise-native').defaults({ jar: true });
 class Service {
     


    constructor() {
    }
    authentification(email:string, motDePasse:string) {
        return request(`https://cecile-top-collegue.herokuapp.com/auth`,
            {
                method: `POST`,
                json: true,
                body: {
                    email,
                    motDePasse
                }
            });
    }
    rechercheMatricule(nom:string):Promise<Collegue[]> {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues?nom=${nom}`, { json: true })
            .then((tabMatricules:string[]) => {
                return Promise.all(tabMatricules
                    .map((matricule:string) => `https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`)
                    .map((url:string) => request(url, { json: true })));
            });
    }
    creationCollegue(nom:string, prenoms:string, email:string, dateDeNaissance:string, photoUrl:string, motDePasse:string) {
        return request('https://cecile-top-collegue.herokuapp.com/collegues/',
            {
                method: 'POST',
                json: true,
                body: {
                    nom,
                    prenoms,
                    email,
                    dateDeNaissance,
                    photoUrl,
                    motDePasse
                }
            });
    }
    modifierEmail(matricule:string, email:string) {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
            {
                method: `PATCH`,
                json: true,
                body: {
                    email
                }
            });
    }
    modifierPhoto(matricule:string, photoUrl:string) {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
            {
                method: `PATCH`,
                json: true,
                body: {
                    photoUrl
                }
            });
    }

}

/*
module.exports = {
    Service
}
*/

export default Service ; 



