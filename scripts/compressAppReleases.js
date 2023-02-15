
const { execSync } = require('child_process')
const path = require('path')
const isExists = require('../electron/utils/isExists')
const rootPackageJson = require('../package.json')


const compress = async () => {

	const releasesDirRelPath = process.argv[2]
	const publicReleasesDirRelPath = process.argv[3]

	const version = rootPackageJson.version

	const rootDir = path.resolve(__dirname, '../')
	const releasesDir = path.resolve(rootDir, releasesDirRelPath)
	const publicReleasesDir = path.resolve(rootDir, publicReleasesDirRelPath)

	const buildIds = [
		{
			systemName: 'ProtoText-darwin-x64',
			publicName: 'ProtoText-MacOS-Intel',
		},
		{
			systemName: 'ProtoText-win32-x64',
			publicName: 'ProtoText-Windows',
		},
	]

	for (const buildId of buildIds) {

		let inputDir = `${releasesDir}/${buildId.systemName}`
		let outputFilePath = `${publicReleasesDir}/${buildId.publicName}-v${version}.zip`

		if(await isExists(inputDir)) {

			console.log(`Compressing of ${buildId.publicName}.`)

			execSync(
				`ditto -c -k --sequesterRsrc --keepParent ${inputDir} ${outputFilePath}`
			)

		}

	}

	console.log('DONE')

}

compress()