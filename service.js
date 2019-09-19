request = require('request-promise-native').defaults({ jar: true });
class Service {

    constructor() {
    }
    authentification(login, mdp) {
        return request(`https://cecile-top-collegue.herokuapp.com/auth`,
            {
                method: `POST`,
                json: true,
                body: {
                    email: login,
                    motDePasse: mdp
                }
            });
    }
    rechercheMatricule(nom) {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues?nom=${nom}`, { json: true })
            .then(tabMatricules => {
                return Promise.all(tabMatricules
                    .map(matricule => `https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`)
                    .map(url => request(url, { json: true })));
            });
    }
    creationCollegue(nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse) {
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
    modifierEmail(matricule, email) {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
            {
                method: `PATCH`,
                json: true,
                body: {
                    email: email
                }
            });
    }
    modifierPhoto(matricule, photoUrl) {
        return request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
            {
                method: `PATCH`,
                json: true,
                body: {
                    photoUrl: photoUrl
                }
            });
    }

}

module.exports = {
    Service
}






