
const fsPromises = require('fs').promises

module.exports = async (filePath) => fsPromises.readFile(filePath, 'utf8')