const mongodb = require("../utilities/mongodb");
const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

var fbDatabase;

function getChannels(groupName) {
    var channelNames = [];
    var channels = fbDatabase.ref("groups/" + groupName + "/channels");
    channels.on("child_added", chanShot => {
        channelNames.push(chanShot.key);
    });

    return channelNames;
}

module.exports = {
    firebase: firebase,

    // initializes firebase
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
        fbDatabase = firebase.database();
    },

    //TODO: remove if not used later
    /* Check if the authentication state has been changed, either if the user is logged in or not */
    onAuthStateChanged: () => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                return firebaseUser;
                // onLoginSuccess(res, firebaseUser);
                // console.log(user.displayName + " is logged in.");
            }
            return null;
        });
    },


    // redirects user to new 
    onLoginSuccess: (res, user, path) => {
        res.redirect(path);
        console.log("Logged in as " + user.displayName + "!");
    },

    // pushes user info to firebase (used in routes/signup.js)
    pushUser: function (user, username) {
        var users = fbDatabase
            .ref('users');

        var displayName;
        user.providerData.forEach(profile => {
            displayName = profile.displayName;
        });
        var updates = {};
        updates[user.uid] = {
            email: user.email,
            username: displayName //username
        };
        users.update(updates);
    },

    // pushes a message to firebase (used in routes/channel.js)
    pushMessage: function (user, message, group, channel) {
        fbDatabase
            .ref('groups/' + group + '/channels/' + channel + '/messages/' + Date.now())
            .set({
                uid: user.uid,
                content: message
            });
    },

    // get current users groups channels and update/push users to mongo
    getInfo: (user = firebase.auth().currentUser) => {
        var groupNames = [];
        var channelNames = [];
        var uids = [];
        var usernames = [];
        var emails = [];

        // get the groups
        var channels;
        var groups = fbDatabase.ref("groups");
        groups.on("child_added", groupShot => {
            groupNames.push(groupShot.key);

            // get the channels for each group
            getChannels(groupShot.key).forEach((channelName) => {
                channelNames.push(groupShot.key + '/channel/' + channelName);
            });
        });

        // get all users
        var users = fbDatabase.ref("users");
        var emails = [],
            usernames = [];
        users.on("child_added", userShot => {
            var uid = userShot.key;
            uids.push(uid);

            // get all usernames and emails
            fbDatabase.ref("users/" + uid).once("value").then(userShot => {
                usernames.push(userShot.val().username);
                emails.push(userShot.val().email);

                var user = {
                    uid: uid,
                    username: userShot.val().username,
                    email: userShot.val().email
                };

                mongodb.createUser(user);
            });

        });

        // return lists of group names, channel names, uids, usernames, and emails
        return {
            groupNames: groupNames,
            channelNames: channelNames,
            uids: uids,
            usernames: usernames,
            emails: emails
        };
    },

    // get current users channels
    getChannels: getChannels,


    // get current users groups
    checkAuth: (res, func) => {
        if (firebase.auth().currentUser) {
            func();
        } else {
            res.redirect('/');
        }
    }
};