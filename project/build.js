const sys = require('util');
const exec = require('child_process').exec;
const os = require('os');

function buildEnv() {
    var cmdMongo = "mongod";

    if (os.type() === 'Linux') {
        logEnv('Linux');
    } else if (os.type() === 'Darwin') {
        logEnv('Mac');
    } else if (os.type() === 'Windows_NT') {
        logEnv('Windows');
        cmdMongo = "start " + cmdMongo;
    } else
        throw new Error("Unsupported OS found: " + os.type());

    exec(cmdMongo + " -f ./config/mongod.conf", puts);
}

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function logEnv(osType) {
    console.log(osType + " environment detected.");
}

module.exports = buildEnv;