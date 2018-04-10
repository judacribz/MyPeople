const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

var fbInitialized = false;
var fbDatabase;

function getChannels(groupName) {
    var channelNames = [];
    channels = fbDatabase.ref("groups/" + groupName + "/channels");
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

    // get current users groups
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

        //Gets all uids, usernames, emails
        var uid, username, email;
        var users = fbDatabase.ref("users");
        users.on("child_added", userShot => {
            uid = userShot.key;
            uids.push(uid);

            var usersInfo = fbDatabase.ref("users/" + uid);
            usersInfo.on("value", userShot => {
                emails.push(userShot.val().email);
                usernames.push(userShot.val().username);
            });
        });


        return {
            groupNames: groupNames,
            channelNames: channelNames,
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