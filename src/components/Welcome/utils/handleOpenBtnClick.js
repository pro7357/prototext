
import requestElectronApi from 'globalUtils/requestElectronApi'
import { showEditor } from 'layoutActions'

export default props => {

	const {
		selectedDocs,
		isFSStartingMode,
	} = props

	// Open a document in the usual way.
	if(!selectedDocs || !selectedDocs.length) {
		requestElectronApi('openDocs')
		return
	}

	let goWithBlank = false

	let docsToOpen = selectedDocs.reduce((done, cur, index) => {

		let isTpl = cur.indexOf('.') === -1

		if(isTpl && cur === 'Blank') {
			goWithBlank = true
			return done
		}

		done[isTpl ? 'tpls': 'docs'].push(
			isTpl
				? `./assets/docs/templates/${cur.toLowerCase()}.ptxt`
				: cur
		)

		return done

	},{docs:[],tpls:[]})

	if(goWithBlank) {
		showEditor()
	}

	if(!docsToOpen.docs.length && !docsToOpen.tpls.length) {
		return
	}

	docsToOpen.useTargetWindow = !goWithBlank
	docsToOpen.fullscreenMode = isFSStartingMode

	requestElectronApi(
		'openDocs',
		docsToOpen
	)

}