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
            password: "azerty"
        }
);
var aliceID = null;

var bob = new User(
        {
            firstName: "Bob",
            lastName: "Lorem",
            email: "email@example.com",
            phone: "+33000000001",
            password: "012345"
        }
);
var bobID = null;

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
                            description: "Un nuit en auberge de jeunesse payée par Bob",
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
                    console.log("Jeu de données ajouté.");
                    process.exit();
                });
            });
        });
    });
});
