const chalk = require('chalk');

const { log } = console;

module.exports = (message1, message2) => log(message1, message2);

module.exports.bold = message => log(chalk.bold(message));
module.exports.error = (message1, message2) => log(chalk.red('Error:'), message1, message2);
