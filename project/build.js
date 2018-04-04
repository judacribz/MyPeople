const sys = require('util');
const exec = require('child_process').exec;
const os = require('os');

function buildEnv() {
    if (os.type() === 'Linux') {
        logEnv('Linux');
        exec("mongod -f ./config/mongod_lnx.conf", puts);
    } else if (os.type() === 'Darwin') {
        logEnv('Mac');
        exec("mongod -f ./config/mongod_lnx.conf", puts);
    } else if (os.type() === 'Windows_NT') {
        logEnv('Windows');
        exec("start mongod -f ./config/mongod_win.conf", puts);
    } else
        throw new Error("Unsupported OS found: " + os.type());
}

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function logEnv(osType) {
    console.log(osType + " environment detected.");
}

module.exports = buildEnv;