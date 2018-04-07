const inherits = require('util').inherits;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const os = require('os');

const mongoConfig = "./config/mongod.conf";
const startMongo = "mongod";
const startMongoWin = "start " + startMongo;

// setup for how to run mongo fore each env
if (os.type() === 'Linux') {
    logEnv('Linux', startMongo);
} else if (os.type() === 'Darwin') {
    logEnv('Mac', startMongo);
} else if (os.type() === 'Windows_NT') {
    logEnv('Windows', startMongoWin);
} else
    throw new Error("Unsupported OS found: " + os.type());

// runs mongodb server for each env`
function logEnv(osType, cmd) {
    console.log(osType + " environment detected.");

    switch (osType) {
        case "Windows":
            exec(cmd + " -f " + mongoConfig, err);
            break;

        default:
            var pipe = spawn(cmd, ['-f', mongoConfig]);

            pipe.stdout.on('data', function (data) {
                console.log(data.toString('utf8'));
            });
            pipe.stderr.on('data', (data) => {
                console.log(data.toString('utf8'));
            });
            pipe.on('close', (code) => {
                console.log('Process exited with code: ' + code);

            });
            break;
    }
}

function err(error, stdout, stderr) {
    console.log(stdout);
}