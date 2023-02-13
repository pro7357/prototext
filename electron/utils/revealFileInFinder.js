
const { shell } = require('electron')

module.exports = async (filePath) => {
	shell.showItemInFolder(filePath)
}