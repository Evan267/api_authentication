const request = require("supertest");
const app = require('../app');

const { Sequelize } = require("../models");
const db = require("../models");
const User = db.users;

/*Test de l'inscription sur mon api
describe('POST /signup', function() {
    let user;
    let originalTimeout;
    
    beforeAll(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    beforeEach(function() {
        user = {
            email: "evan.berger68210@gmail.com",
            password: "Jaevkija!68",
            lastName: "Berger",
            firstName: "Evan",
            birthdate: "1998-04-17",
            sex: "Homme"
        };
        User.destroy({ where: { email: user.email }})
    });

    describe("Tests 1", function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        it('test d\'enregistrement normal puis de l\'enregistrement une seconde fois du meme utilisateur', async function() {
            const response1 = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(response1.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(response1.body.message).toBe('Connecté avec succès');
            expect(response1.body.csrf_token).toBeDefined();
            expect(response1.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(response1.statusCode).toBe(201);
            
            const response2 = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(response2.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(response2.body.message).toBe('Cet email est deja utilise');
            expect(response2.statusCode).toBe(400);
        })
    });

    //Tests de l'adresse mail 
    describe("Tests 2", function() {
        it('Email inexistant', async function() {
            user.email = "test@gmail.com";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Adresse mail inexistant');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 3", function() {
        it('Email outlook', async function() {
            user.email = "evan.berger@outlook.com";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Connecté avec succès');
            expect(res.body.csrf_token).toBeDefined();
            expect(res.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(res.statusCode).toBe(201);
            User.destroy({ where: {email: user.email }});
        });
    });
    describe("Tests 4", function() {
        it('Format d\'email incorrect', async function() {
            user.email = "evan.bergerjdsljdlka";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Adresse mail inexistant');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 5", function() {
        it('Format d\'email incorrect', async function() {
            user.email = "evan.bergerjdsljdlka";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Adresse mail inexistant');
            expect(res.statusCode).toBe(400);
        });
    });

    //Tests du mot de passe
    describe("Tests 6", function() {
        it('Mot de passe pas suffisament long', async function() {
            user.password = "1Ja!";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 8 caractères.');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 7", function() {
        it('Mot de passe sans majuscule', async function() {
            user.password = "jaevkija!68";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 8 caractères.');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 8", function() {
        it('Mot de passe sans minuscule', async function() {
            user.password = "JAEVKIJA!68";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 8 caractères.');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 9", function() {
        it('Mot de passe sans chiffre', async function() {
            user.password = "Jaevkija!";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 8 caractères.');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 10", function() {
        it('Mot de passe sans caractere speciaux', async function() {
            user.password = "Jaevkija68";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser au moins 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et au moins 8 caractères.');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 11", function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        it('Mot de passe de plus de 100 caractere', async function() {
            user.password = "8+,4n6e2)S5~E9cwwF]j3B/-!iu5.D!7/Y:w#U~C5P_r)t9f4@G]2(wX4Y58H9{K6MhA[V368qDJak2[62#6b7iZmL^%4WsqjZ2qn=^-CK56:i=98Y6(S3434?mMdD?mRyP5Xq8brT%HT;+}@![SHEhQvnmTvHaV9cj.a938R*3*JL$Q7,y9Yq{nT7a9hKL$z_;y9q4}";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Veuillez utiliser un mot de passe de moins de 100 caractères');
            expect(res.statusCode).toBe(400);
        });
    });

    //Test du Nom
    describe("Tests 12", function() {
        it('Nom avec des chiffres', async function() {
            user.lastName = "Berger85";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ nom n'accepte que les lettres minuscule, majuscule, les tirets et les apostrophes simples")
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 13", function() {
        it('Nom avec plus de 80 caracteres', async function() {
            user.lastName = "GjXrQEIZtnWJUUkRrdapgmjfgeauyjjLbFZscqMFbBWdxxeHRkilpSFCWHesddpwBHhRDZLkzOazuERzrVdDaclUsXwQaHZLThGktVrvOpKarCtoGTpDFFzvptTJACNoqCrhvJBPvjEUBGmMGxGxJLnpFPLCFtApObNUBSJKLaCOfahtdYSbmVTagIyQTwXLwEuexTIF";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ nom doit faire minimum 1 caracteres et maximum 80 caracteres")
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 14", function() {
        it('Nom avec plus de 80 caracteres', async function() {
            user.lastName = 'Berger<';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ nom n'accepte que les lettres minuscule, majuscule, les tirets et les apostrophes simples")
            expect(res.statusCode).toBe(400);
        });
    });

    //Test du Prénom
    describe("Tests 15", function() {
        it('Prénom avec des chiffres', async function() {
            user.firstName = "Evan77";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ prénom n'accepte que les lettres minuscule, majuscule, les tirets et les apostrophes simples")
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 16", function() {
        it('Prénom avec plus de 80 caracteres', async function() {
            user.firstName = "GjXrQEIZtnWJUUkRrdapgmjfgeauyjjLbFZscqMFbBWdxxeHRkilpSFCWHesddpwBHhRDZLkzOazuERzrVdDaclUsXwQaHZLThGktVrvOpKarCtoGTpDFFzvptTJACNoqCrhvJBPvjEUBGmMGxGxJLnpFPLCFtApObNUBSJKLaCOfahtdYSbmVTagIyQTwXLwEuexTIF";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ prénom doit faire minimum 1 caracteres et maximum 80 caracteres")
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 17", function() {
        it('Prénom avec plus de 80 caracteres', async function() {
            user.firstName = 'Evan>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Le champ prénom n'accepte que les lettres minuscule, majuscule, les tirets et les apostrophes simples")
            expect(res.statusCode).toBe(400);
        });
    });

    //Test du champ Sex
    describe("Tests 18", function() {
        it('Test si le sex est Femme', async function() {
            user.sex = "Femme";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Connecté avec succès');
            expect(res.body.csrf_token).toBeDefined();
            expect(res.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(res.statusCode).toBe(201);
        });
    });
    describe("Tests 19", function() {
        it('Sex legerement différent', async function() {
            user.sex = "Femmes";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("La valeur du champ sexe doit etre Homme ou Femme")
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 20", function() {
        it('Sex totalement différent', async function() {
            user.sex = "kdkzjejkflz";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("La valeur du champ sexe doit etre Homme ou Femme")
            expect(res.statusCode).toBe(400);
        });
    });

    //Test de la date de naissance
    describe("Tests 21", function() {
        it('Date complete', async function() {
            user.birthdate = "1998-04-17 09:00:00";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Connecté avec succès');
            expect(res.body.csrf_token).toBeDefined();
            expect(res.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(res.statusCode).toBe(201);
        });
    });
    describe("Tests 22", function() {
        it('Date complete seconde incorrecte', async function() {
            user.birthdate = "1998-04-17 dkeljzd";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Le format de la date est incorrect');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 23", function() {
        it('Date incomplete', async function() {
            user.birthdate = "1998-";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Connecté avec succès');
            expect(res.body.csrf_token).toBeDefined();
            expect(res.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(res.statusCode).toBe(201);
        });
    });
    describe("Tests 24", function() {
        it('30 fevrier', async function() {
            user.birthdate = "1998-02-30";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Le format de la date est incorrect');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 25", function() {
        it('Date chaine de caractere', async function() {
            user.birthdate = "dix janvier deux milles";
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Le format de la date est incorrect');
            expect(res.statusCode).toBe(400);
        });
    });

    //SQL Injection
    describe("Tests 26", function() {
        it('SQL Injection dans l\'email', async function() {
            user.email = 'evan.berger68210@gmail.com\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Adresse mail inexistant');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 27", function() {
        it('SQL Injection dans le mot de passe', async function() {
            user.email = 'Jaevkija!68\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 28", function() {
        it('SQL Injection dans le prénom', async function() {
            user.firstName = 'Evan\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 29", function() {
        it('SQL Injection dans le nom', async function() {
            user.lastName = 'Berger\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 30", function() {
        it('SQL Injection dans le champ sexe', async function() {
            user.sex = 'Homme\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 31", function() {
        it('SQL Injection dans l\'anniversaire', async function() {
            user.sex = '1998-04-17\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });

    //attaques XSS
    describe("Tests 32", function() {
        it('attaques XSS dans l\'email', async function() {
            user.email = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Adresse mail inexistant');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 33", function() {
        it('attaques XSS dans le mot de passe', async function() {
            user.email = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 34", function() {
        it('attaques XSS dans le prénom', async function() {
            user.firstName = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 35", function() {
        it('attaques XSS dans le nom', async function() {
            user.lastName = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 36", function() {
        it('attaques XSS dans le champ sexe', async function() {
            user.sex = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 37", function() {
        it('attaques XSS dans l\'anniversaire', async function() {
            user.sex = '<script>alert("XSS");</script>';
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });

    //Test champ vide, undefined, null, inexistant
    describe("Tests 38", function() {
        it('Sans definir les parametres', async function() {
            let test = {};
            const res = await request(app)
                .post('/api/auth/signup')
                .send(test)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 39", function() {
        it('Sans definir tous les parametres sauf le mot de passe', async function() {
            let test = {
                password: "Jaevkija!68"
            };
            const res = await request(app)
                .post('/api/auth/signup')
                .send(test)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Veuillez renseigner tous les champs");
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 40", function() {
        it('Uniquement le mot de passe et l\'email defini', async function() {
            let test = {
                email: "evan.berger68210@gmail.com",
                password: "Jaevkija!68"
            };
            const res = await request(app)
                .post('/api/auth/signup')
                .send(test)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Veuillez renseigner tous les champs");
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 41", function() {
        it('Nom a null', async function() {
            user.lastName = null;
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Veuillez renseigner tous les champs");
            expect(res.statusCode).toBe(400);
        });
    });
    describe("Tests 42", function() {
        it('Prenom undefined', async function() {
            user.firstName = undefined;
            const res = await request(app)
                .post('/api/auth/signup')
                .send(user)
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe("Veuillez renseigner tous les champs");
            expect(res.statusCode).toBe(400);
        });
    });
});
*/



describe('POST /login', function() {
    let user;
    let originalTimeout;
    
    beforeAll(async function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
        user = {
            email: "evan.berger68210@gmail.com",
            password: "Jaevkija!68",
            lastName: "Berger",
            firstName: "Evan",
            birthdate: "1998-04-17",
            sex: "Homme"
        };
        await request(app)
            .post('/api/auth/signup')
            .send(user);
    });

    beforeEach(function () {
        user = {
            email: "evan.berger68210@gmail.com",
            password: "Jaevkija!68",
            lastName: "Berger",
            firstName: "Evan",
            birthdate: "1998-04-17",
            sex: "Homme"
        };
        User.findOne({ where: {email: user.email}})
            .then(user => {
                if (!user) {
                    console.log("Utilisateur introuvable")
                }
                request(app)
                    .post('/api/auth/login')
                    .send(user);
            })
            .catch(() => console.log("Erreur"))
    });

    /*describe("Test 1", function() {
        it("Connexion classique", async function() {
            const res = await request(app)
                .post('/api/auth/login')
                .send({email: user.email, password: user.password})
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Connecté avec succès');
            expect(res.body.csrf_token).toBeDefined();
            expect(res.body.accessTokenExpires).toBeGreaterThan(Date.now());
            expect(res.statusCode).toBe(201);
        })
    });
    describe("Test 2", function() {
        it("Erreur dans l'email", async function() {
            user.email = "evan.berger@gmail.com";
            const res = await request(app)
                .post('/api/auth/login')
                .send({email: user.email, password: user.password})
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Email incorrect');
            expect(res.statusCode).toBe(400);
        })
    });
    describe("Test 3", function() {
        it("Erreur dans le mot de passe", async function() {
            user.password = "jaev";
            const res = await request(app)
                .post('/api/auth/login')
                .send({email: user.email, password: user.password})
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Mot de passe incorrect');
            expect(res.statusCode).toBe(400);
        })
    });*/

    //Injection SQL
    describe("Test 4", function() {
        it("Injection SQL dans l'adresse mail", async function() {
            user.password = 'evan.berger68210@gmail.com\'; DROP TABLE users; --';
            const res = await request(app)
                .post('/api/auth/login')
                .send({email: user.email, password: user.password})
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Email incorrect');
            expect(res.statusCode).toBe(400);
        })
    });
    /*describe("Test 5", function() {
        it("Injection SQL dans l'adresse mail", async function() {
            user.password = "'Jaevkija!68\'; DROP TABLE users; --'";
            const res = await request(app)
                .post('/api/auth/login')
                .send({email: user.email, password: user.password})
            expect(res.headers["content-type"]).toBe('application/json; charset=utf-8');
            expect(res.body.message).toBe('Mot de passe incorrect');
            expect(res.statusCode).toBe(400);
        })
    });*/
});