const Server = require('karma').Server;
const args = require('minimist')(process.argv.slice(2));
const path = require('path');

const config = {
    configFile: path.resolve(__dirname, '../karma.config.js')
};

if (args.debug) {
    config.singleRun = false;
    captureTimeout = 180000;

}

new Server(config, function (exitCode) {
    console.log(`Karma has exited with code: ${exitCode}`);
    process.exit(exitCode);
}).start();
