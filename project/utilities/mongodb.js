const models = {
    userSchema: require("../models/user.schema"),
    groupSchema: require("../models/group.schema")
};
const mongoose = require('mongoose');
var User = mongoose.model('user', models.userSchema);
var Group = mongoose.model('group', models.groupSchema);
var newUser
module.exports = {

    // Adds user to mongodb
    createUser: (user) => {

        User.find({
            uid: user.uid
        }).then((results) => {
            if (results.length > 0) {
                // update the user
                User.update({
                        uid: user.uid
                    },
                    user, {
                        multi: false
                    },
                    function (error, numAffected) {
                        if (error || numAffected != 1) {
                            console.log('Not updating user' + user.username);
                        }
                    });
            } else {
                // save a new student
                var newUser = new User(user);
                newUser.save(function (error) {
                    if (error) {
                        console.log('Unable to save user');
                    }
                });
            }
        });
    },

    getUsername: (uid) => {
        User.find({
            uid: uid
        }, {
            username: 1
        }).then(function (results) {
            return results;
        });
    }
};