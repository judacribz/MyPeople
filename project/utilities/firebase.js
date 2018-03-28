const firebase = require("firebase");
const fbConfig = require('../config/firebase.config')

module.exports = {
    setupFirebase: function () {
        firebase.initializeApp(fbConfig);

        var database = firebase.database();
        var starCountRef = firebase.database().ref('groups/');
        starCountRef.on('child_added', function (snapshot) {
            console.log(snapshot.val());
        });
    }
};