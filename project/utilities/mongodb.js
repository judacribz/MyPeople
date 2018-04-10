module.exports = {

    loadUsers: (user11, email_t) => {
        var studentData = {
            username: user11,
            email: email_t
        };
        User.find({
            username: user11
        }).then(function (results) {
            if (results.length > 0) {
                // update the student
                User.update({
                        username: user11
                    },
                    studentData, {
                        multi: false
                    },
                    function (error, numAffected) {
                        if (error || numAffected != 1) {
                            console.log('No need to update ' + error);

                        } else {
                            console.log('Student updated');
                        }
                    });
            } else {
                // save a new student
                var newStudent = new User(studentData);
                newStudent.save(function (error) {
                    if (error) {
                        console.log('Unable to save student');

                    } else {
                        console.log('Student added');
                    }
                });
            }
        });
    },


    getUsernames: () => {
        User.find({}, {
            username: 1,
        }).then(function (results) {
            return results;
        });
    }
};