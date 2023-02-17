
import prepareDataForExporting from './prepareDataForExporting'
import exportData from './exportData'


export default props => {

	let exportingProps = prepareDataForExporting()

	if(!exportingProps) {
		alert('There is no data to re-export. Check the exporting settings.')
		return
	}

	if(isDesktopBuild) {
		exportData(exportingProps)
	} else {
		console.log('exportingProps')
		console.log(exportingProps)
	}

}