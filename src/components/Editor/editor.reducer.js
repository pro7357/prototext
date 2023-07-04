
const handlersIds = [
	'resetEditorState',
	'softResetEditorState',
	'setEditorState',
	'refresh',
	'updLocaleOption',
	'setPageWidth',
	'setLastActionIndex',
	'toggleCompactMenuMode',
	'switchPageView',
	'switchSideFocus',
	'addPage',
	'resetPage',
	'clonePage',
	'deletePageOrLocale',
	'clearLocale',
	'switchEditorMode',
	'switchUserFocus',
	'addBlock',
	'duplicateBlock',
	'mergeBlocks',
	'updBlock',
	'deleteBlock',
	'rearrangePages',
	'rearrangeLocales',
	'rearrangeTextBlocks',
	'switchBlockHighlight',
	'selectBlocks'
]

const handlers = handlersIds.reduce((handlers, id) => {
	handlers[id] = require(`./utils/reducerHandlers/${id}`).default
	return handlers
}, {})


// Demo data for debugging the application.
let initialDemoData = []
if(!isDesktopBuild) {
	initialDemoData = require('./initialDemoData').default
}

// In emergency cases, check the presence of a backup of content in Localstorage.
let contentBeforeSoftReset = localStorage.getItem('contentBeforeSoftReset')
if(contentBeforeSoftReset) {
	try {
		contentBeforeSoftReset = JSON.parse(contentBeforeSoftReset)
	} catch (error) {
		alert('Text content is corrupted.')
		console.error(error)
	}
}


const initialState = {

	timestamp: null,

	targetPageIndex:0,
	targetLocaleIndex: 0,
	targetBlockIndex:0,

	leftSideFocus: isDesktopBuild ? 0 : 4,

	// RightSide –
	// is the second page index in the 'Two Pages' mode
	// is the localization index in the 'Localization' mode
	rightSideFocus: isDesktopBuild ? 0 : 0,

	content: contentBeforeSoftReset || [].concat(
		[
			{
				id: 'initial-page',
				content: [
					{
						id: 'initial-locale',
						content: [
							{id: 'initial-block', content: ''},
						]
					}
				]
			}
		],
		initialDemoData,
	),

	pageWidth: 400,

	pageViews: ['One Page','Two Pages','Localization'],
	pageView: isDesktopBuild ? 0 : 0,

	compactMenuMode: false,

	localeOptions: isDesktopBuild ? ['en'] : ['en'],
	localeConfigMode: isDesktopBuild ? false : false,

	// Drag and Drop mode for pages, localizations, text blocks.
	dndMode: false,

	// Selection range.
	selRange: null,

	// The mode of creating links between blocks.
	linkMode: false,

	// The mode of creating AI request between blocks (prompt consisting of two parts).
	aiPromptMode: false,

	// Search tools, etc.
	topbarMode: isDesktopBuild ? false : true,

	// The index of the last initialized action in the target card.
	lastActionIndex: undefined,

}


export default (state = initialState, action) => {

	const handler = handlers[action.type] || (() => state)

	if(contentBeforeSoftReset) {
		contentBeforeSoftReset = null
		localStorage.removeItem('contentBeforeSoftReset')
	}

	return handler(initialState, state, action)

}