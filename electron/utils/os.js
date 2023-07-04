
const isWindows = process.platform === 'win32'
const isLinux = process.platform === 'linux'
const isMac = process.platform === 'darwin'

module.exports = {
	isWindows,
	isLinux,
	isMac,
}
