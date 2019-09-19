// récupération du module `readline`
const readline = require(`readline`);
const { Service } = require(`./service.js`)

const service = new Service();

// création d'un objet `rl` permettant de récupérer la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const menuObj = [{
    libelle: 'Rechercher un collègue par nom',
    fn: () => rl.question(`>> Recherche en cours du nom : `, (nom) => {

        service.rechercheMatricule(nom)
            .then((tabCollegues) => {
                if (tabCollegues.length === 0) {
                    console.log('Pas de collègue à ce nom');
                    appelMenu();
                } else {
                    tabCollegues.forEach(col => console.log(`${col.nom} ${col.prenoms} (${col.dateDeNaissance})`));
                    appelMenu();
                }

            })
            .catch((err) => {
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
                rl.question(`Date de Naissance du collègue à ajouter :`, (dateDeNaissance) => {
                    rl.question(`URL de la photo du collègue à ajouter : `, (photoURL) => {
                        rl.question(`Mot de passe du collègue à ajouter : `, (motDePasse) => {
                            service.creationCollegue(nom, prenoms, email, dateDeNaissance, photoURL, motDePasse)
                                .then(() => {
                                    console.log('Le nouveau collègue a été ajouté');
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
                    console.log(`L'email est bien modifié`)
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
                    console.log(`La photo a bien été modifiée`);
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

const appelMenu = () => {
    let index = 1;
    for (let menuItem of menuObj) {
        console.log(index + '.', menuItem.libelle);
        index++;
    }

    rl.question('choix', choix => {
        const itemChoisi = menuObj[choix - 1];
        itemChoisi.fn();
    });
}

class Presentation {
    constructor(service) {
        this.service = service;
    }

    start() {
        rl.question(`Quel est votre login? `, (login) => {
            rl.question(`Quel est votre mot de passe? `, (mdp) => {
                service.authentification(login, mdp)
                    .then(() => {
                        console.log('Vous êtes bien connecté ! \n')
                        let index = 1;
                        for (let menuItem of menuObj) {
                            console.log(index + '.', menuItem.libelle);
                            index++;
                        }

                        rl.question('choix', choix => {
                            const itemChoisi = menuObj[choix - 1];
                            itemChoisi.fn();
                        });

                    })
                    .catch(err =>{
                        console.log('Mauvais identifiants de connextion')
                        this.start(); 
                    })

            })
        })

    }
}

module.exports = {
    Presentation
}
