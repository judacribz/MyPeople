const sys = require('util');
const exec = require('child_process').exec;
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
    exec(cmd + " -f " + mongoConfig, puts);
}

function puts(error, stdout, stderr) {
    console.log(stdout);
}

module.exports = buildEnv;