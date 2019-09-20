"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var request = request_promise_native_1.default.defaults({ jar: true });
//request = require('request-promise-native').defaults({ jar: true });
var Service = /** @class */ (function () {
    function Service() {
    }
    Service.prototype.authentification = function (email, motDePasse) {
        return request("https://cecile-top-collegue.herokuapp.com/auth", {
            method: "POST",
            json: true,
            body: {
                email: email,
                motDePasse: motDePasse
            }
        });
    };
    Service.prototype.rechercheMatricule = function (nom) {
        return request("https://cecile-top-collegue.herokuapp.com/collegues?nom=" + nom, { json: true })
            .then(function (tabMatricules) {
            return Promise.all(tabMatricules
                .map(function (matricule) { return "https://cecile-top-collegue.herokuapp.com/collegues/" + matricule; })
                .map(function (url) { return request(url, { json: true }); }));
        });
    };
    Service.prototype.creationCollegue = function (nom, prenoms, email, dateDeNaissance, photoUrl, motDePasse) {
        return request('https://cecile-top-collegue.herokuapp.com/collegues/', {
            method: 'POST',
            json: true,
            body: {
                nom: nom,
                prenoms: prenoms,
                email: email,
                dateDeNaissance: dateDeNaissance,
                photoUrl: photoUrl,
                motDePasse: motDePasse
            }
        });
    };
    Service.prototype.modifierEmail = function (matricule, email) {
        return request("https://cecile-top-collegue.herokuapp.com/collegues/" + matricule, {
            method: "PATCH",
            json: true,
            body: {
                email: email
            }
        });
    };
    Service.prototype.modifierPhoto = function (matricule, photoUrl) {
        return request("https://cecile-top-collegue.herokuapp.com/collegues/" + matricule, {
            method: "PATCH",
            json: true,
            body: {
                photoUrl: photoUrl
            }
        });
    };
    return Service;
}());
/*
module.exports = {
    Service
}
*/
exports.default = Service;
