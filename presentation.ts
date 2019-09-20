// récupération du module `readline`
//const readline = require(`readline`);
import readline from 'readline';
//const { Service}  = require(`./service.js`)
import Service from './service'; 
import {Collegue} from './domain'; 
import moment from 'moment';

moment.locale('fr');

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let service = new Service();

const appelMenu = () => {
    let index = 1;
    for (let menuItem of menuObj) {
        if(menuItem.libelle ===  'Sortir \n'){
            console.log(99 + '.', menuItem.libelle)
        }else {
            console.log(index + '.', menuItem.libelle);
        }
        index++
    }

    rl.question('Votre choix : \n', choix => {
        const itemChoisi = menuObj[+choix - 1];
        itemChoisi.fn();
    });
}


const menuObj = [{
    libelle: 'Rechercher un collègue par nom',
    fn: () => rl.question('>> Recherche en cours du nom [Peyras] : \n', (nom) => {

        service.rechercheMatricule(nom)
        .then(tabCollegues => {

            if (tabCollegues.length === 0) {
                console.log('Pas de collègue à ce nom')
            } else {
                
                tabCollegues.forEach(col => {
                 let dateNaissance = col.dateDeNaissance; 
                 let date = moment(dateNaissance).format('L');
                    console.log(`${col.nom} ${col.prenoms} (${date}) - [matricule : ${col.matricule}]\n`); 
                }
                    
                    );
            }
            appelMenu();
        })
        .catch(err => {
            console.log(err.error);
            appelMenu();
        })
    })
},
{
    libelle: 'Créer un collègue',
    fn: () => rl.question(`Nom du collègue à ajouter : `, (nom) => {
        rl.question(`Prénoms du collègue à ajouter : `, (prenoms) => {
            rl.question(`Email du collègue à ajouter : `, (email) => {
                rl.question(`Date de Naissance du collègue à ajouter [JJ/MM/AAAA] :`, (dateDeNaissance) => {
                    rl.question(`URL de la photo du collègue à ajouter : `, (photoURL) => {
                        rl.question(`Mot de passe du collègue à ajouter : `, (motDePasse) => {
                            const jour = +dateDeNaissance.substring(0,2); 
                            const mois = +dateDeNaissance.substring(3, 5); 
                            const annee = +dateDeNaissance.substring(7); 
                            
                            const date = moment(dateDeNaissance, "DD-MM-YYYY").toDate();
                            console.log('---> 0 --> ',dateDeNaissance)
                            console.log('---> 1 --> ', moment(dateDeNaissance, "DD/MM/YYYY").toDate())
                            console.log('---> 2 --> ', moment(dateDeNaissance, "DD-MM-YYYY").toISOString(false))
                            console.log('---> 3 --> ', new Date( moment(dateDeNaissance, "DD-MM-YYYY").toISOString(true)))
                            let collegue = new Collegue(nom, prenoms, email, date, photoURL, motDePasse)
                                service.creationCollegue(collegue)
                                .then(() => {
                                    console.log(`Le nouveau collègue ${collegue.nom}, ${collegue.prenoms} a été ajouté ! \n`);
                                    appelMenu();
                                })
                                .catch(err => {
                                    console.log(err.error);
                                    appelMenu();
                                })
                        })
                    })
                })
            })
        })
    })
},
{
    libelle: `Modifier l'email`,
    fn: () => rl.question(`Matricule du collègue à modifier : `, (matricule) => {
        rl.question(`Nouvel email : `, (email) => {
            service.modifierEmail(matricule, email)
            .then(() => {
                console.log(`L'email est bien modifié \n`)
                appelMenu();
            })
            .catch(err => {
                console.log(err.error);
                appelMenu();
            })
        })
    })
}, {
    libelle: 'Modifier la photo',
    fn: () => rl.question(`Matricule du collègue à modifier : `, (matricule) => {
        rl.question(`Nouvel URL Photo : `, (photoURL) => {
            service.modifierPhoto(matricule, photoURL)
            .then(() => {
                console.log(`La photo a bien été modifiée \n`);
                appelMenu();
            })
            .catch(err => {
                console.log(err.error);
                appelMenu();
            })
        })
    })
}, {
    libelle: 'Sortir \n',
    fn: () => rl.close()
    }
]
class Presentation {

    constructor(private service:Service) {}

    start() {
        rl.question(`Quel est votre login ? [cecile@collegue.fr] `, (email) => {
            rl.question(`Quel est votre mot de passe? [test] `, (mdp) => {
                service.authentification(email, mdp)
                    .then(() => {
                        console.log('Vous êtes bien connecté ! \n')
                        let index = 1;
                        for (let menuItem of menuObj) {
                            if(menuItem.libelle ===  'Sortir \n'){
                                console.log(99 + '.', menuItem.libelle)
                            }else {
                                console.log(index + '.', menuItem.libelle);
                            }
                            
                            index++;
                        }

                        rl.question('Votre choix : \n', choix => {
                            const itemChoisi = menuObj[+choix - 1];
                            itemChoisi.fn();
                        });

                    })
                    .catch(err =>{
                        console.log(`
                        Connexion Impossible - Veuillez vérifier vos identifiants
                        `)
                        this.start(); 
                    })

            })
        })

    }
}



export default Presentation; 
