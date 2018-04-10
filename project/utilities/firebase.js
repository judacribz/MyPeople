const mongodb = require("../utilities/mongodb");
const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

var fbInitialized = false;
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

    fbInitialized: fbInitialized,

    // initializes firebase
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
        fbInitialized = true;
        fbDatabase = firebase.database();
    },

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

    onLoginSuccess: (res, user, path) => {
        res.redirect(path);
        console.log(user.displayName + " is logged in.");
    },

    // pushes user info to firebase (used in routes/signup.js)
    pushUser: function (user, username) {
        var users = fbDatabase
            .ref('users');

        console.log(firebase.auth());

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
    pushMessage: function (user, message, group = 'HackerGroup-2018', channel = 'events') {
        firebase.database()
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

        var channels;
        var groups = fbDatabase.ref("groups");
        groups.on("child_added", groupShot => {
            groupNames.push(groupShot.key);

            getChannels(groupShot.key).forEach((channelName) => {
                channelNames.push(groupShot.key + '/channel/' + channelName);
            });
        });

        var users = fbDatabase.ref("users");
        var emails = [],
            usernames = [];
        users.on("child_added", userShot => {
            var uid = userShot.key;
            uids.push(uid);

            var users = fbDatabase.ref("users/" + uid);

            users.once("value").then(userShot => {
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