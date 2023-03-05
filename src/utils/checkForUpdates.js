
import requestActualAppInfo from './requestActualAppInfo'
import { setUpdatesInfo } from 'globalActions/updates'

export default async props => {

	let appInfo = await requestActualAppInfo()

	if(!appInfo) {
		return
	}

	let newVersion = appInfo.versions.actual
	let isNewVersionAvailable = newVersion !== APP_VERSION

	if(!isNewVersionAvailable) {
		return
	}

	let releaseNotes = appInfo.versions.releaseNotes

	setUpdatesInfo({
		releaseVersion: newVersion,
		releaseNotes
	})

}