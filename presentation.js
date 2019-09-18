// récupération du module `readline`
var readline = require('readline');
var service = require('./service.js')


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var start = function () {


    rl.question("Quel est votre login? ", function (login) {

        rl.question("Quel est votre mot de passe? ", function (mdp) {

            service.authentification(login, mdp,

                function (result) {

                    var menu = "\n1. Rechercher un collègue par nom " +
                        "\n2.Créer un collègue " +
                        "\n3.Modifier l'email " +
                        "\n4.Modifier la photo " +
                        "\n 99. Sortir \n";

                    console.log("Vous êtes bien connecté ! \n")


                    var menuFonction = function () {

                        rl.question(menu, function (saisie) {



                            if (saisie === '1') {
                                rl.question(">> Recherche en cours du nom : \n", function (nom) {
                                    service.rechercheMatricule(nom, function (result) {
                                        var matricule = result;

                                        var tailleMatricule = matricule.length; 

                                        var compteur = 0; 

                                        matricule.forEach(function (element) {
                                            compteur++; 

                                            service.recherInfoParMatricule(element, function (result) {
                                                console.log(result);
                                                if(compteur === tailleMatricule){
                                                    menuFonction();
                                                }
                                            }, function (result) {
                                                console.log(result)
                                                if(compteur === tailleMatricule){
                                                    menuFonction();
                                                }
                                            }
                                        

                                            )
                                        })
                                    })
                                    
                                });

                            } else if (saisie === '2') {
                                rl.question("Nom du collègue à ajouter : ", function (nom) {
                                    rl.question("Prénoms du collègue à ajouter : ", function (prenoms) {
                                        rl.question("Email du collègue à ajouter : ", function (email) {
                                            rl.question("Date de Naissance du collègue à ajouter :", function (dateDeNaissance) {
                                                rl.question("URL de la photo du collègue à ajouter : ", function (photoURL) {
                                                    rl.question("Mot de passe du collègue à ajouter : ", function (motDePasse) {

                                                        service.creationCollegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse, function (result) {
                                                            console.log(result);
                                                            menuFonction();
                                                        }, function (result) {
                                                            console.log(result);
                                                            menuFonction();
                                                        })

                                                    })
                                                })
                                            })
                                        })
                                    })
                                });
                            } else if (saisie === '3') {
                                rl.question("Matricule du collègue à modifier : ", function (matricule) {

                                    rl.question("Nouvel email : ", function (email) {
                                        service.modifierEmail(matricule, email, function (result) {
                                            console.log(result);
                                            menuFonction();
                                        }, function (result) {
                                            console.log(result);
                                            menuFonction();
                                        })
                                    })
                                })
                            } else if (saisie === '4') {
                                rl.question("Matricule du collègue à modifier : ", function (matricule) {

                                    rl.question("Nouvel URL Photo : ", function (photoURL) {
                                        service.modifierPhoto(matricule, photoURL, function (result) {
                                            console.log(result);
                                            menuFonction();
                                        }, function (result) {
                                            console.log(result);
                                            menuFonction();
                                        })
                                    })
                                })
                            } else if (saisie === '99') {
                                console.log("Au revoir");
                                rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
                            }


                        });

                    }
                    menuFonction();
                }, function (result) {
                    console.log("erreur d'identifiant")
                });

        })

    })
}



exports.start = start;
