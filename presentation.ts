// récupération du module `readline`
//const readline = require(`readline`);
import readline from 'readline';
//const { Service}  = require(`./service.js`)
import Service from './service'; 
import {Collegue} from './domain'; 


// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Presentation {

    private service = new Service(); 

    constructor(service:Service){
        this.service = service; 
        
    }

    start() {
        rl.question(`Quel est votre login? [cecile@collegue.fr]  `, (email) => {
            rl.question(`Quel est votre mot de passe? [test]  `, (motDePasse) => {
                this.service.authentification(email, motDePasse)
                    .then(() => {
    
                        const menu = `
1. Rechercher un collègue par nom 
2.Créer un collègue
3.Modifier l'email
4.Modifier la photo
99. Sortir
`;
                        console.log(`Vous êtes bien connecté
                        `)
                        const menuFonction =  () => {
                            rl.question(menu, (saisie) => {
                                if (saisie === '1') {
                                    rl.question(`>> Recherche en cours du nom : [Peyras]  `, (nom) => {
    
                                        this.service.rechercheMatricule(nom)
                                            .then(tabCollegues => {

                                                if (tabCollegues.length === 0) {
                                                    console.log('Pas de collègue à ce nom')
                                                } else {
                                                    tabCollegues.forEach(col => console.log(`${col.nom} ${col.prenoms} (${col.dateDeNaissance})`));
                                                }
                                                menuFonction();
                                            })
                                            .catch(err => {
                                                console.log(err.error);
                                                menuFonction();
                                            })
                                    });
                                } else if (saisie === '2') {
                                    rl.question(`Nom du collègue à ajouter : `, (nom) => {
                                        rl.question(`Prénoms du collègue à ajouter : `, (prenoms) => {
                                            rl.question(`Email du collègue à ajouter : `, (email) => {
                                                rl.question(`Date de Naissance du collègue à ajouter [YYYY-MM-DD] : `, (dateDeNaissance) => {
                                                    rl.question(`URL de la photo du collègue à ajouter : `, (photoURL) => {
                                                        rl.question(`Mot de passe du collègue à ajouter : `, (motDePasse) => {
                                                            this.service.creationCollegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse)
                                                                .then(() => {
                                                                    let collegue = new Collegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse); 
                                                                    console.log(`Le nouveau collègue ${collegue.nom}, ${collegue.prenoms} a été ajouté !`);
                                                                    menuFonction();
                                                                })
                                                                .catch(err => {
                                                                    console.log(err.error);
                                                                    menuFonction();
                                                                })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    });
                                } else if (saisie === '3') {
                                    rl.question(`Matricule du collègue à modifier : `, (matricule) => {
                                        rl.question(`Nouvel email : `, (email) => {
                                            this.service.modifierEmail(matricule, email)
                                                .then(() => {
                                                    console.log(`L'email est bien modifié`)
                                                    menuFonction();
                                                })
                                                .catch(err => {
                                                    console.log(err.error);
                                                    menuFonction();
                                                })
                                        })
                                    })
                                } else if (saisie === '4') {
                                    rl.question(`Matricule du collègue à modifier : `, (matricule) => {
                                        rl.question(`Nouvel URL Photo : `, (photoURL) => {
                                            this.service.modifierPhoto(matricule, photoURL)
                                                .then(() => {
                                                    console.log(`La photo a bien été modifiée`);
                                                    menuFonction();
                                                })
                                                .catch(err => {
                                                    console.log(err.error);
                                                    menuFonction();
                                                })
                                        })
                                    })
                                } else if (saisie === '99') {
                                    console.log(`Au revoir`);
                                    rl.close();
                                } else {
                                    console.log(`Ce choix n'existe pas !`); 
                                    menuFonction(); 
                                }
    
                            });                   
                        }
                        menuFonction();
                    })
                    .catch(() => {
                        console.log(`
                        Connexion Impossible - Veuillez vérifier vos identifiants
                        `); 
                        this.start(); 
                    }) 
            })
        })
    }
}


export default Presentation; 
