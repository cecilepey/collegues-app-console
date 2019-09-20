import moment from 'moment';

moment.locale('fr');

const dateDeNaissance = '15/07/1981'

const date = moment(dateDeNaissance, "DD-MM-YYYY").toDate();
                            console.log('---> 0 --> ',dateDeNaissance)
                            console.log('---> 1 --> ', moment(dateDeNaissance, "DD/MM/YYYY").toDate())
                            console.log('---> 2 --> ', moment(dateDeNaissance, "DD-MM-YYYY").toISOString(false))
                            console.log('---> 3 --> ',  moment(dateDeNaissance, "DD-MM-YYYY").toISOString(true)
                            )