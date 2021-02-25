const log4js = require('../../node_modules/log4js/lib/log4js')
const path = require('path');
log4js.configure(path.join(__dirname, 'log4js.json'))
const logger = log4js.getLogger("cheese");
module.exports = logger
