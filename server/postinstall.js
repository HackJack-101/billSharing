'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Jack3113_billSharing', function (err) {
    if (err) {
        throw err;
    }
});

var User = require('./api/user/user.model');
var Bill = require('./api/bill/bill.model');
var Group = require('./api/group/group.model');
var Payment = require('./api/payment/payment.model');

User.remove({}, function () {});
Bill.remove({}, function () {});
Group.remove({}, function () {});
Payment.remove({}, function () {});

var alice = new User(
        {
            firstName: "Alice",
            lastName: "Impsum",
            email: "example@email.com",
            phone: "+33000000000",
            password: "azerty",
            friends: []
        }
);
var aliceID = null;

var bob = new User(
        {
            firstName: "Bob",
            lastName: "Lorem",
            email: "email@example.com",
            phone: "+33000000001",
            password: "012345",
            friends: []
        }
);
var bobID = null;

var dexter = new User(
        {
            firstName: "Dexter",
            lastName: "Morgan",
            email: "dex@mo.com",
            phone: "+33000000002",
            password: "dexterm",
            friends: []
        }
);
var dexterID = null;

var allan = new User(
        {
            firstName: "Allan",
            lastName: "Toiko",
            email: "alln@toiko.com",
            phone: "+33000000003",
            password: "543210",
            friends: []
        }
);
var allanID = null;

var jenny = new User(
        {
            firstName: "Jenny",
            lastName: "Pomme",
            email: "jenny@jenny.jenny",
            phone: "+33000000004",
            password: "password",
            friends: []
        }
);
var jennyID = null;

//Alice
alice.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
    aliceID = res["_id"];
    bob.save(function (err, res) {
        if (err)
            throw err;
        console.log(res);
        bobID = res["_id"];
        var aliceBob = new Group(
                {
                    name: "Alice & Bob",
                    friends: [aliceID, bobID]
                }
        );
        aliceBob.save(function (err, res)
        {
            if (err)
                throw err;
            console.log(res);
            var aliceBobID = res["_id"];
            var restaurant = new Bill(
                    {
                        name: "Restaurant",
                        description: "Un petit restaurant à deux payé par Alice",
                        owner: aliceID,
                        group: aliceBobID,
                        currency: "EUR",
                        value: 90
                    }
            );
            restaurant.save(function (err, res) {
                if (err)
                    throw err;
                console.log(res);
                var hostel = new Bill(
                        {
                            name: "Auberge de jeunesse",
                            description: "Une nuit en auberge de jeunesse payée par Bob",
                            owner: bobID,
                            group: aliceBobID,
                            currency: "EUR",
                            value: 36
                        }
                );
                hostel.save(function (err, res) {
                    if (err)
                        throw err;
                    console.log(res);


                    // process.exit();

                });
            });
        });
    });
});

var dexterAllanJennyID;

//Dexter
dexter.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
    dexterID = res["_id"];
        allan.save(function (err, res) {
        if (err)
            throw err;
        console.log(res);
        allanID = res["_id"];
        jenny.friends = [dexterID, allanID];
                jenny.save(function (err, res) {
                if (err)
                    throw err;
                console.log(res);
                allanID = res["_id"];
                var dexterAllanJenny = new Group(
                {
                    name: "Dexter & Allan & Jenny",
                    friends: [dexterID, allanID, jennyID]
                }
        );
        dexterAllanJenny.save(function (err, res)
        {
            if (err)
                throw err;
            console.log(res);
            dexterAllanJennyID = res["_id"];
            var billard = new Bill(
                    {
                        name: "Billard",
                        description: "Un billard entre amis payé par Dexter",
                        owner: dexterID,
                        group: dexterAllanJennyID,
                        currency: "EUR",
                        value: 33
                    }
            );
            billard.save(function (err, res) {
                if (err)
                    throw err;
                console.log(res);
                var piscine = new Bill(
                        {
                            name: "Piscine",
                            description: "Une aprem piscine payée par Allan",
                            owner: dexterID,
                            group: dexterAllanJennyID,
                            currency: "EUR",
                            value: 21
                        }
                );
                piscine.save(function (err, res) {
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

// Billard Jenny -> Dexter
var payment1 = new Payment(
        {
            description: "Remboursement du billard",
            from: jennyID,
            to: dexterID,
            group: dexterAllanJennyID,
            currency: "EUR",
            value: 11
        }
);

payment1.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
});

// Billard Allan -> Dexter
var payment2 = new Payment(
        {
            description: "Remboursement du billard",
            from: allanID,
            to: dexterID,
            group: dexterAllanJennyID,
            currency: "EUR",
            value: 11
        }
);

payment2.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
});

// Piscine Jenny -> Dexter
var payment3 = new Payment(
        {
            description: "Remboursement de la Piscine",
            from: jennyID,
            to: dexterID,
            group: dexterAllanJennyID,
            currency: "EUR",
            value: 7
        }
);

payment3.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
});

// Piscine Allan -> Dexter
var payment4 = new Payment(
        {
            description: "Remboursement de la Piscine",
            from: allanID,
            to: dexterID,
            group: dexterAllanJennyID,
            currency: "EUR",
            value: 7
        }
);

payment4.save(function (err, res) {
    if (err)
        throw err;
    console.log(res);
});