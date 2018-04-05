const sys = require('util');
const spawn = require('child_process').spawn;
const os = require('os');

const mongoConfig = "./config/mongod_win.conf";
const startMongo = "mongod";
const startMongoWin = "start " + startMongo;

function buildEnv() {
    if (os.type() === 'Linux') {
        logEnv('Linux', startMongo);
    } else if (os.type() === 'Darwin') {
        logEnv('Mac', startMongo);
    } else if (os.type() === 'Windows_NT') {
        logEnv('Windows', startMongoWin);
    } else 
        throw new Error("Unsupported OS found: " + os.type());
    }

function logEnv(osType, cmd) {
    console.log(osType + " environment detected.");
    var mongoOut = spawn(cmd, [], {f: mongoConfig});
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
}

function puts(error, stdout, stderr) {
    console.log(stdout);
}

const ls = spawn('ls', ['-lh', '/usr']);

module.exports = {
    build: buildEnv
};