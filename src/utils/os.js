
export const isWindows = () => isDesktopBuild ? electronAPI.isWindows : false
export const isMac = () => isDesktopBuild ? electronAPI.isMac : true

export default {
	isWindows,
	isMac
}