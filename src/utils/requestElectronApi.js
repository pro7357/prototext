
// Send a request to Electron
export default async (handle, payload) => {

	if(window.electronAPI) {

		return await electronAPI.send(handle, payload)

	} else {
		if(isDesktopBuild) {
			alert('Unable to get access to the Electron API')
		}
	}

}