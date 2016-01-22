'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Jack3113_billSharing', function(err) {
    if (err) {
        throw err;
    }
});

var User = require('./api/user/user.model');
var Bill = require('./api/bill/bill.model');
var Group = require('./api/group/group.model');
var Payment = require('./api/payment/payment.model');

User.remove({}, function() {});
Bill.remove({}, function() {});
Group.remove({}, function() {});
Payment.remove({}, function() {});

var alice = new User({
    firstName: "Alice",
    lastName: "Impsum",
    email: "example@email.com",
    phone: "+33000000000",
    password: "azerty",
    friends: []
});
var aliceID = null;

var bob = new User({
    firstName: "Bob",
    lastName: "Lorem",
    email: "email@example.com",
    phone: "+33000000001",
    password: "012345",
    friends: []
});
var bobID = null;

var dexter = new User({
    firstName: "Dexter",
    lastName: "Morgan",
    email: "dex@mo.com",
    phone: "+33000000002",
    password: "dexterm",
    friends: []
});
var dexterID = null;

var allan = new User({
    firstName: "Allan",
    lastName: "Toiko",
    email: "allan@toiko.com",
    phone: "+33000000003",
    password: "543210",
    friends: []
});
var allanID = null;

var jenny = new User({
    firstName: "Jenny",
    lastName: "Pomme",
    email: "jenny@jenny.com",
    phone: "+33000000004",
    password: "password",
    friends: []
});
var jennyID = null;

var aliceBobID = null;

//Alice
alice.save(function(err, res) {
    if (err)
        throw err;
    console.log(res);
    aliceID = res["_id"];
    bob.save(function(err, res) {
        if (err)
            throw err;
        console.log(res);
        bobID = res["_id"];
        var aliceBob = new Group({
            name: "Alice & Bob",
            friends: [aliceID, bobID]
        });
        aliceBob.save(function(err, res) {
            if (err)
                throw err;
            console.log(res);
            aliceBobID = res["_id"];
            var restaurant = new Bill({
                name: "Restaurant",
                description: "Un petit restaurant à deux payé par Alice",
                owner: aliceID,
                group: aliceBobID,
                currency: "EUR",
                value: 90
            });
            restaurant.save(function(err, res) {
                if (err)
                    throw err;
                console.log(res);
                var hostel = new Bill({
                    name: "Auberge de jeunesse",
                    description: "Une nuit en auberge de jeunesse payée par Bob",
                    owner: bobID,
                    group: aliceBobID,
                    currency: "EUR",
                    value: 36
                });
                hostel.save(function(err, res) {
                    if (err)
                        throw err;
                    console.log(res);


                    // process.exit();

                });
            });
        });
    });


    var dexterAllanJennyID;

    //Dexter
    dexter.save(function(err, res) {
        if (err)
            throw err;
        console.log(res);
        dexterID = res["_id"];
        allan.save(function(err, res) {
            if (err)
                throw err;
            console.log(res);
            allanID = res["_id"];
            jenny.friends = [dexterID, allanID];
            jenny.save(function(err, res) {
                if (err)
                    throw err;
                console.log(res);
                jennyID = res["_id"];
                var dexterAllanJenny = new Group({
                    name: "Dexter & Allan & Jenny",
                    friends: [dexterID, allanID, jennyID]
                });
                dexterAllanJenny.save(function(err, res) {
                    if (err)
                        throw err;
                    console.log(res);
                    dexterAllanJennyID = res["_id"];
                    var billard = new Bill({
                        name: "Billard",
                        description: "Un billard entre amis payé par Dexter",
                        owner: dexterID,
                        group: dexterAllanJennyID,
                        currency: "EUR",
                        value: 33
                    });
                    billard.save(function(err, res) {
                        if (err)
                            throw err;
                        console.log(res);
                        var piscine = new Bill({
                            name: "Piscine",
                            description: "Une aprem piscine payée par Allan",
                            owner: dexterID,
                            group: dexterAllanJennyID,
                            currency: "EUR",
                            value: 21
                        });
                        piscine.save(function(err, res) {
                            if (err)
                                throw err;
                            console.log(res);



                            // Billard Jenny -> Dexter
                            var payment1 = new Payment({
                                description: "Remboursement du billard",
                                from: jennyID,
                                to: dexterID,
                                group: dexterAllanJennyID,
                                currency: "EUR",
                                value: 11
                            });

                            payment1.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                            });

                            // Billard Allan -> Dexter
                            var payment2 = new Payment({
                                description: "Remboursement du billard",
                                from: allanID,
                                to: dexterID,
                                group: dexterAllanJennyID,
                                currency: "EUR",
                                value: 11
                            });

                            payment2.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                            });

                            // Piscine Jenny -> Dexter
                            var payment3 = new Payment({
                                description: "Remboursement de la Piscine",
                                from: jennyID,
                                to: dexterID,
                                group: dexterAllanJennyID,
                                currency: "EUR",
                                value: 7
                            });

                            payment3.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                            });

                            // Piscine Allan -> Dexter
                            var payment4 = new Payment({
                                description: "Remboursement de la Piscine",
                                from: allanID,
                                to: dexterID,
                                group: dexterAllanJennyID,
                                currency: "EUR",
                                value: 7
                            });

                            payment4.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                            });

                            // Alice, Allan -> Groupe "Coloc" -> Bill d'Alice "Courses S3" -> Bill d'Alice "Loyer" -> Bill d'Allan "Internet" -> Payment d
                            var aliceAllanID = null;

                            var aliceAllan = new Group({
                                name: "Coloc",
                                friends: [aliceID, allanID]
                            });
                            aliceAllan.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                                aliceAllanID = res["_id"];
                                var coursesS3 = new Bill({
                                    name: "Courses S3",
                                    description: "Courses pour la semaine 3",
                                    owner: aliceID,
                                    group: aliceAllanID,
                                    currency: "EUR",
                                    value: 105
                                });
                                coursesS3.save(function(err, res) {
                                    if (err)
                                        throw err;
                                    console.log(res);
                                    var loyer = new Bill({
                                        name: "Loyer de la maison",
                                        description: "Loyer pour la location de la maison. Prochain mois c'est toi",
                                        owner: aliceID,
                                        group: aliceAllanID,
                                        currency: "EUR",
                                        value: 850
                                    });
                                    loyer.save(function(err, res) {
                                        if (err)
                                            throw err;
                                        console.log(res);
                                        var internet = new Bill({
                                            name: "Forfait Internet",
                                            description: "Paiement du forfait pour la ligne Internet. Moi toujours prochain mois",
                                            owner: allanID,
                                            group: aliceAllanID,
                                            currency: "EUR",
                                            value: 40
                                        });
                                        internet.save(function(err, res) {
                                            if (err)
                                                throw err;
                                            console.log(res);

                                            var paymentInternet = new Payment({
                                                description: "Internet",
                                                from: aliceID,
                                                to: allanID,
                                                group: aliceAllanID,
                                                currency: "EUR",
                                                value: 20
                                            });
                                            paymentInternet.save(function(err, res) {
                                                if (err)
                                                    throw err;
                                                console.log(res);
                                            });
                                        });
                                    });
                                });
                            });

                            //Alice, Jenny -> Groupe "Shopping" -> Bill d'Alice "Soldes Camaieu 10/01/16" -> Bill de Jenny "Starbucks 16/01/16" -> Bill de Jenny "Taxi 16/01/16" 
                            var aliceJennyID = null;

                            var aliceJenny = new Group({
                                name: "Shopping",
                                friends: [aliceID, jennyID]
                            });
                            aliceJenny.save(function(err, res) {
                                if (err)
                                    throw err;
                                console.log(res);
                                aliceJennyID = res["_id"];
                                var camaieu = new Bill({
                                    name: "Soldes Camaieu 10/01/16",
                                    description: "Achat d'une robe de soirée chez Camaieu -50%",
                                    owner: aliceID,
                                    group: aliceJennyID,
                                    currency: "EUR",
                                    value: 35
                                });
                                camaieu.save(function(err, res) {
                                    if (err)
                                        throw err;
                                    console.log(res);
                                    var starbucks = new Bill({
                                        name: "Starbucks 16/01/16",
                                        description: "Petite pause café l'après-midi à Rives d'Arcins",
                                        owner: jennyID,
                                        group: aliceJennyID,
                                        currency: "EUR",
                                        value: 12
                                    });
                                    starbucks.save(function(err, res) {
                                        if (err)
                                            throw err;
                                        console.log(res);
                                        var hmMango = new Bill({
                                            name: "Taxi 16/01/16",
                                            description: "Taxi pour aller à Gare Saint Jean",
                                            owner: jennyID,
                                            group: aliceJennyID,
                                            currency: "EUR",
                                            value: 35
                                        });
                                        hmMango.save(function(err, res) {
                                            if (err)
                                                throw err;
                                            console.log(res);

                                            var paymentCamaieu = new Payment({
                                                description: "Remboursement robe soirée Camaieu",
                                                from: jennyID,
                                                to: aliceID,
                                                group: aliceJennyID,
                                                currency: "EUR",
                                                value: 12
                                            });
                                            paymentCamaieu.save(function(err, res) {
                                                if (err)
                                                    throw err;
                                                console.log(res);

                                                console.log("Jeu de données ajouté.");
                                                process.exit();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});