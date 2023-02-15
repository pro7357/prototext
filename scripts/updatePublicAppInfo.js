
const path = require('path')
const readFile = require('../electron/utils/readFile')
const isExists = require('../electron/utils/isExists')
const saveFiles = require('../electron/utils/saveFiles')
const rootPackageJson = require('../package.json')
const electronPackageJson = require('../electron/package.json')


const update = async () => {

	const updLevel = Number(process.argv[2])
	const rootDir = path.resolve(__dirname, '../')

	// STEP 1
	// Get the current app version from the root package.json

	const currentVersion = rootPackageJson.version
	console.log(`Current version: ${currentVersion}`)

	let newVersion = currentVersion.split('.').reduce((result, num, index) => {
		num = Number(num)
		return result.concat(
			index === updLevel ? num + 1 : num
		)
	}, []).join('.')


	// STEP 1
	// Update root package.json
	rootPackageJson.version = newVersion
	await saveFiles(
		[{
			name: 'package',
			ext: 'json',
			data: JSON.stringify(rootPackageJson, null, 2),
		}],
		rootDir
	)

	// STEP 2
	// Update Electron package.json
	electronPackageJson.version = newVersion
	await saveFiles(
		[{
			name: 'package',
			ext: 'json',
			data: JSON.stringify(electronPackageJson, null, 2),
		}],
		path.resolve(rootDir,'./electron/')
	)


	// STEP 3
	// Update public app info file for the website

	const infoFileDir = path.resolve(rootDir, './website/src')
	const infoFileName = 'app-info'
	const infoFileExt = 'json'
	const infoFilePath = `${infoFileDir}/${infoFileName}.${infoFileExt}`

	let info = {versions: {}}

	if(await isExists(infoFilePath)) {
		try {
			let prevInfoFile = await readFile(infoFilePath)
			if(prevInfoFile) {
				info = JSON.parse(prevInfoFile)
			}
		} catch (error) {
			//
		}
	}

	// Add the new version and keep the previous in the archived.
	info.versions.actual = newVersion
	info.versions.archived = (info.versions.archived || []).concat(currentVersion)

	await saveFiles(
		[{
			name: infoFileName,
			ext: infoFileExt,
			data: JSON.stringify(info),
		}],
		infoFileDir
	)

	console.log(`New new version: ${newVersion}`)

}

update()