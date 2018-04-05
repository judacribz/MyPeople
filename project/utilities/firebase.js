const firebase = require("firebase");
const fbConfig = require('../config/firebase.config');

module.exports = {
    firebase: firebase,

    setupFirebase: function () {
        firebase.initializeApp(fbConfig);
    },

    fbPushMessage: function (username, message) {
        var messages = firebase
            .database()
            .ref('groups/HackerGroup-2018/events/messages/');

        // TODO: change to use username stored in database based on current users uid/email
        var auth = firebase.auth();
        var user = auth.currentUser;
        console.log(firebase.auth());
        if (user) {
            email = user.email;
        } else {
            email = "joe@joe.com";
        }

        var updates = {};
        updates[Date.now()] = {
            username: email,
            content: message
        };
        messages.update(updates);
    }
};