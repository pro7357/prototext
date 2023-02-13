const fs = require('fs')
module.exports = async path => !!(await fs.promises.stat(path).catch(e => false))