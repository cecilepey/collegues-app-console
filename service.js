const request = require('request-promise-native').defaults({ jar: true });

const authentification = function (login, mdp) {
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

const rechercheMatricule = function (nom) {
    return request(`https://cecile-top-collegue.herokuapp.com/collegues?nom=${nom}`, { json: true})
        .then(tabMatricules => {
            return Promise.all( tabMatricules
                .map(matricule => `https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`)
                .map(url => request(url, { json :true })));
        }); 
}


const creationCollegue = function (nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse) {
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

const modifierEmail = function (matricule, email) {
    return request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
        {
            method: `PATCH`,
            json: true,
            body: {
                email: email
            }
        });
}

const modifierPhoto = function (matricule, photoUrl) {
  return  request(`https://cecile-top-collegue.herokuapp.com/collegues/${matricule}`,
        {
            method: `PATCH`,
            json: true,
            body: {
                photoUrl: photoUrl
            }
        });
}


module.exports = {
    authentification,
    rechercheMatricule,
    creationCollegue,
    modifierEmail,
    modifierPhoto
}