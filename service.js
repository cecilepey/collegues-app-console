var authentification = function (login, mdp, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });

    request('https://cecile-top-collegue.herokuapp.com/auth',
        {
            method: 'POST',
            json: true,
            body: {
                email: login,
                motDePasse: mdp
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn('Ok');
            } else {
                errorFn('Erreur')
            }
        }
    );
}

var rechercheMatricule = function (nom, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });
    request('https://cecile-top-collegue.herokuapp.com/collegues?nom=' + nom,
        {
            method: 'GET',
            json: true,
            body: {
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn(body);
            } else {
                errorFn('Erreur')
            }
        }
    );
}

var recherInfoParMatricule = function (matricule, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });
    request('https://cecile-top-collegue.herokuapp.com/collegues/' + matricule,
        {
            method: 'GET',
            json: true,
            body: {
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn(body.nom + ' ' + body.prenoms + ' (' + body.dateDeNaissance + ') ');
            } else {
                errorFn('Erreur')
            }
        }
    );
}

var creationCollegue = function (nom, prenoms, email, dateDeNaissance, photoURL, motDePasse, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });
    request('https://cecile-top-collegue.herokuapp.com/collegues/',
        {
            method: 'POST',
            json: true,
            body: {
                nom: nom,
                prenoms: prenoms,
                email: email,
                dateDeNaissance: dateDeNaissance,
                photoUrl: photoURL,
                motDePasse: motDePasse
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn('Collègue ' + nom + ' ' + prenoms + ' ajouté ! ');
            } else {
                errorFn('Erreur')
            }
        }
    );
}

var modifierEmail = function (matricule, email, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });
    request('https://cecile-top-collegue.herokuapp.com/collegues/' + matricule,
        {
            method: 'PATCH',
            json: true,
            body: {
                email: email
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn("L'email a été modifié");
            } else {
                errorFn('Erreur ' + body)
            }
        }
    );
}

var modifierPhoto = function (matricule, photoUrl, callBackFn, errorFn) {
    // création d'une requête avec activation de suivi de Cookies.
    var request = require('request').defaults({ jar: true });
    request('https://cecile-top-collegue.herokuapp.com/collegues/' + matricule,
        {
            method: 'PATCH',
            json: true,
            body: {
                photoUrl: photoUrl
            }
        },
        function (err, res, body) {
            if (res.statusCode === 200) {
                callBackFn("La photo a été modifiée");
            } else {
                errorFn('Erreur ' + body)
            }
        }
    );
}

exports.authentification = authentification;
exports.rechercheMatricule = rechercheMatricule;
exports.recherInfoParMatricule = recherInfoParMatricule;
exports.creationCollegue = creationCollegue;
exports.modifierEmail = modifierEmail;
exports.modifierPhoto = modifierPhoto; 
