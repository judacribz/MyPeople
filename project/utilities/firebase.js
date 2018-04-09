const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

var fbInitialized = false;
var fbDatabase;

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
    pushMessage: function (user, message) {
        var messages = firebase.database()
            .ref('groups/HackerGroup-2018/channels/random/messages/');

        var updates = {};
        updates[Date.now()] = {
            uid: user.uid,
            content: message
        };
        messages.update(updates);
    },


    // get current users groups
    getGroups: (user = firebase.auth().currentUser) => {
        var groupNames = [];
        var channelNames = [];

        var channels;
        var groups = fbDatabase.ref("groups");
        groups.on("child_added", snap => {
            groupNames.push(snap.key);

            channels = fbDatabase.ref("groups/" + snap.key + "/channels");
            console.log(snap.val().key);
            channelNames.push(snap.val());
        });

        return groupNames;
    },


    // get current users groups
    checkAuth: (res, func) => {
        if (firebase.auth().currentUser) {
            func();
        } else {
            res.redirect('/');
        }
    }
};