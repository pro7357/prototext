
const path = require('path')
const isExists = require('./isExists')
const openPtxtFile = require('./openPtxtFile')
const createWindow = require('./createWindow')
const log = require('electron-log')


module.exports = async props => {

	const {
		app,
		windows,
		targetWindow,
		payload
	} = props

	if(!payload) {
		return
	}

	const {
		useTargetWindow,
		fullscreenMode,
		docs,
		tpls
	} = payload

	let items = []
	let invalidItems = []

	// Normalize & add the templates paths.
	if(tpls && tpls.length) {
		tpls.forEach((tpl, tplIndex) => {
			items.push({
				doNotKeepFilePath: true,
				filePath: path.resolve(
					__dirname,
					'../build',
					tpl
				)
			})
		})
	}

	// Check & add the recent docs paths.
	if(docs && docs.length) {
		for (const doc of docs) {
			if(await isExists(doc)) {
				items.push({
					doNotKeepFilePath: false,
					filePath: doc
				})
			} else {
				invalidItems.push(doc)
			}
		}
	}

	if(!items.length) {
		log.info('Nothing to open', docs, tpls)
		return
	}

	openItemRecursively({
		app,
		windows,
		targetWindow: useTargetWindow ? targetWindow : null,
		doNotKeepFilePath: true,
		fullscreenMode,
		items,
	})

	if(invalidItems.length) {
		log.info('Invalid documents:' + invalidItems.join(', '))
	}

}


const openItemRecursively = props => {

	const {
		app,
		windows,
		targetWindow,
		fullscreenMode,
	} = props

	let items = props.items
	let item = items.pop()
	let filePath = item.filePath
	let doNotKeepFilePath = item.doNotKeepFilePath

	const initItemData = async (win) => {

		// Complete opening of the current item.
		await openPtxtFile({
			targetWindow: win,
			filePath,
			doNotKeepFilePath
		})

		// Open the next item.
		if(items.length) {
			setTimeout(() => {
				openItemRecursively({
					...props,
					targetWindow: null,
					items,
				})
			}, 500)
		}

	}

	if(targetWindow) {

		// Use the current window to open a item.
		initItemData(targetWindow)
		if(fullscreenMode) {
			targetWindow.setFullScreen(true)
		}

	} else {

		// Use a new window.
		createWindow({
			app,
			windows,
			fullscreenMode,
			onReady: initItemData
		})

	}

}