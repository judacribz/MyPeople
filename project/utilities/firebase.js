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
        var messages = fbDatabase
            .ref('groups/HackerGroup-2018/events/messages/');

        var updates = {};
        updates[Date.now()] = {
            uid: user.uid,
            content: message
        };
        messages.update(updates);
    },


    // get current users groups
    getGroups: (user = firebase.auth().currentUser) => {
        var groups = fbDatabase
            .ref('groups/');

        var groupsList = []
        groups.once('value', function (groupsShot) {
            groupsShot.forEach(function (group) {
                groupsList.push(group.key)
            });
        });

        console.log(groupsList[0]);
    }
};