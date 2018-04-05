const sys = require('util');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const os = require('os');

const mongoConfig = "./config/mongod.conf";
const startMongo = "mongod";
const startMongoWin = "start " + startMongo;

// setup for how to run mongo fore each env
function setupMongo() {
    if (os.type() === 'Linux') {
        logEnv('Linux', startMongo);
    } else if (os.type() === 'Darwin') {
        logEnv('Mac', startMongo);
    } else if (os.type() === 'Windows_NT') {
        logEnv('Windows', startMongoWin);
    } else
        throw new Error("Unsupported OS found: " + os.type());
}

// runs mongodb server for each env`
function logEnv(osType, cmd) {
    console.log(osType + " environment detected.");

    switch (osType) {
        case "Windows":
            exec(cmd + " -f " + mongoConfig, err);
            break;

        default:
            var mongoOut = spawn(cmd, [], {
                f: mongoConfig
            });
            mongoOut
                .stdout
                .on('data', (data) => {
                    console.log(`stdout: ${data}`);
                });

            mongoOut
                .stderr
                .on('data', (data) => {
                    console.log(`stderr: ${data}`);
                });
            break;
    }
}

function err(error, stdout, stderr) {
    console.log(stdout);
}

module.exports = {
    setupMongo: setupMongo
};