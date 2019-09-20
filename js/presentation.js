"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// récupération du module `readline`
//const readline = require(`readline`);
var readline_1 = __importDefault(require("readline"));
//const { Service}  = require(`./service.js`)
var service_1 = __importDefault(require("./service"));
var domain_1 = require("./domain");
// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
var Presentation = /** @class */ (function () {
    function Presentation(service) {
        this.service = new service_1.default();
        this.service = service;
    }
    Presentation.prototype.start = function () {
        var _this = this;
        rl.question("Quel est votre login? [cecile@collegue.fr]  ", function (email) {
            rl.question("Quel est votre mot de passe? [test]  ", function (motDePasse) {
                _this.service.authentification(email, motDePasse)
                    .then(function () {
                    var menu = "\n1. Rechercher un coll\u00E8gue par nom \n2.Cr\u00E9er un coll\u00E8gue\n3.Modifier l'email\n4.Modifier la photo\n99. Sortir\n";
                    console.log("Vous \u00EAtes bien connect\u00E9\n                        ");
                    var menuFonction = function () {
                        rl.question(menu, function (saisie) {
                            if (saisie === '1') {
                                rl.question(">> Recherche en cours du nom : [Peyras]  ", function (nom) {
                                    _this.service.rechercheMatricule(nom)
                                        .then(function (tabCollegues) {
                                        if (tabCollegues.length === 0) {
                                            console.log('Pas de collègue à ce nom');
                                        }
                                        else {
                                            tabCollegues.forEach(function (col) { return console.log(col.nom + " " + col.prenoms + " (" + col.dateDeNaissance + ")"); });
                                        }
                                        menuFonction();
                                    })
                                        .catch(function (err) {
                                        console.log(err.error);
                                        menuFonction();
                                    });
                                });
                            }
                            else if (saisie === '2') {
                                rl.question("Nom du coll\u00E8gue \u00E0 ajouter : ", function (nom) {
                                    rl.question("Pr\u00E9noms du coll\u00E8gue \u00E0 ajouter : ", function (prenoms) {
                                        rl.question("Email du coll\u00E8gue \u00E0 ajouter : ", function (email) {
                                            rl.question("Date de Naissance du coll\u00E8gue \u00E0 ajouter [YYYY-MM-DD] : ", function (dateDeNaissance) {
                                                rl.question("URL de la photo du coll\u00E8gue \u00E0 ajouter : ", function (photoURL) {
                                                    rl.question("Mot de passe du coll\u00E8gue \u00E0 ajouter : ", function (motDePasse) {
                                                        _this.service.creationCollegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse)
                                                            .then(function () {
                                                            var collegue = new domain_1.Collegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse);
                                                            console.log("Le nouveau coll\u00E8gue " + collegue.nom + ", " + collegue.prenoms + " a \u00E9t\u00E9 ajout\u00E9 !");
                                                            menuFonction();
                                                        })
                                                            .catch(function (err) {
                                                            console.log(err.error);
                                                            menuFonction();
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            }
                            else if (saisie === '3') {
                                rl.question("Matricule du coll\u00E8gue \u00E0 modifier : ", function (matricule) {
                                    rl.question("Nouvel email : ", function (email) {
                                        _this.service.modifierEmail(matricule, email)
                                            .then(function () {
                                            console.log("L'email est bien modifi\u00E9");
                                            menuFonction();
                                        })
                                            .catch(function (err) {
                                            console.log(err.error);
                                            menuFonction();
                                        });
                                    });
                                });
                            }
                            else if (saisie === '4') {
                                rl.question("Matricule du coll\u00E8gue \u00E0 modifier : ", function (matricule) {
                                    rl.question("Nouvel URL Photo : ", function (photoURL) {
                                        _this.service.modifierPhoto(matricule, photoURL)
                                            .then(function () {
                                            console.log("La photo a bien \u00E9t\u00E9 modifi\u00E9e");
                                            menuFonction();
                                        })
                                            .catch(function (err) {
                                            console.log(err.error);
                                            menuFonction();
                                        });
                                    });
                                });
                            }
                            else if (saisie === '99') {
                                console.log("Au revoir");
                                rl.close();
                            }
                            else {
                                console.log("Ce choix n'existe pas !");
                                menuFonction();
                            }
                        });
                    };
                    menuFonction();
                })
                    .catch(function () {
                    console.log("\n                        Connexion Impossible - Veuillez v\u00E9rifier vos identifiants\n                        ");
                    _this.start();
                });
            });
        });
    };
    return Presentation;
}());
exports.default = Presentation;
