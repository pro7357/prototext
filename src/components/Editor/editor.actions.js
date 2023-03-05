
import { store } from 'store'


export const resetEditorState = () => {
	store.dispatch({
		allowUndo: true,
		type: 'resetEditorState',
	})
}


export const softResetEditorState = () => {
	store.dispatch({
		allowUndo: true,
		type: 'softResetEditorState',
	})
}


// The UNDO team uses action "setEditorState".
// Therefore, the Flag "Allowundo" should be ignored here.
export const setEditorState = (payload, isUndo) => {
	store.dispatch({
		allowUndo: isUndo ? false : true,
		type: 'setEditorState',
		...payload
	})
}


export const setPageWidth = payload => {
	store.dispatch({
		allowUndo: true,
		type: 'setPageWidth',
		payload
	})
}


export const refresh = () => {
	store.dispatch({
		type: 'refresh'
	})
}


export const switchSideFocus = (side,focus) => {
	store.dispatch({
		type: 'switchSideFocus',
		side,
		focus
	})
}


export const addPage = (side) => {
	store.dispatch({
		allowUndo: true,
		type: 'addPage',
		side
	})
}


export const clonePage = (targetPageIndex) => {
	store.dispatch({
		allowUndo: true,
		type: 'clonePage',
		targetPageIndex
	})
}


export const deletePageOrLocale = (targetPageIndex, targetLocaleIndex) => {
	store.dispatch({
		allowUndo: true,
		type: 'deletePageOrLocale',
		targetPageIndex,
		targetLocaleIndex
	})
}


export const clearLocale = (targetPageIndex) => {
	store.dispatch({
		allowUndo: true,
		type: 'clearLocale',
		targetPageIndex,
	})
}


export const updLocaleOption = (index,value) => {
	store.dispatch({
		allowUndo: true,
		type: 'updLocaleOption',
		index,
		value
	})
}


export const switchPageView = payload => {
	store.dispatch({
		type: 'switchPageView',
		payload
	})
}


export const toggleCompactMenuMode = () => {
	store.dispatch({
		type: 'toggleCompactMenuMode'
	})
}

export const activatePageDndMode = () => switchEditorMode('dnd','page')
export const activateLocaleDndMode = () => switchEditorMode('dnd','locale')
export const activateTextBlockDndMode = () => switchEditorMode('dnd','block')
export const deactivateDndMode = () => switchEditorMode('dnd',false)

export const activateLinkMode = () => switchEditorMode('link',true)
export const deactivateLinkMode = () => switchEditorMode('link',false)

export const activateAiPromptMode = () => switchEditorMode('aiPrompt',true)
export const deactivateAiPromptMode = () => switchEditorMode('aiPrompt',false)


export const switchEditorMode = (key,value) => {
	store.dispatch({
		type: 'switchEditorMode',
		key,
		value
	})
}


export const switchUserFocus = (targetPageIndex, targetLocaleIndex, targetBlockIndex) => {
	store.dispatch({
		type: 'switchUserFocus',
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
	})
}


export const addBlock = (payload, position, replaceTargetBlock) => {
	store.dispatch({
		allowUndo: true,
		type: 'addBlock',
		payload,
		position,
		replaceTargetBlock
	})
}


export const duplicateBlock = () => {
	store.dispatch({
		allowUndo: true,
		type: 'duplicateBlock',
	})
}


export const mergeBlocks = (srcBlockIndex, dstBlockIndex) => {
	store.dispatch({
		allowUndo: true,
		type: 'mergeBlocks',
		srcBlockIndex,
		dstBlockIndex
	})
}

export const updBlock = (payload, refresh, targetPageIndex, targetLocaleIndex, targetBlockIndex) => {
	store.dispatch({
		type: 'updBlock',
		payload,
		refresh,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
	})
}


export const deleteBlock = (position) => {
	store.dispatch({
		allowUndo: true,
		type: 'deleteBlock',
		position
	})
}


export const rearrangePages = (srcPageIndex, dstPageIndex, side) => {
	store.dispatch({
		allowUndo: true,
		type: 'rearrangePages',
		srcPageIndex,
		dstPageIndex,
		side
	})
}


export const rearrangeLocales = (srcLocaleIndex, dstLocaleIndex, newOriginalMode) => {
	store.dispatch({
		allowUndo: true,
		type: 'rearrangeLocales',
		srcLocaleIndex,
		dstLocaleIndex,
		newOriginalMode
	})
}


export const rearrangeTextBlocks = (
	srcPageIndex,
	srcBlockIndex,
	dstPageIndex,
	dstBlockIndex
) => {
	store.dispatch({
		allowUndo: true,
		type: 'rearrangeTextBlocks',
		srcPageIndex,
		srcBlockIndex,
		dstPageIndex,
		dstBlockIndex,
	})
}


export const switchBlockHighlight = (
	turnOn,
	refresh,
	targetPageIndex,
	targetLocaleIndex,
	targetBlockIndex,
	side
) => {
	store.dispatch({
		type: 'switchBlockHighlight',
		turnOn,
		refresh,
		targetPageIndex,
		targetLocaleIndex,
		targetBlockIndex,
		side
	})
}


export const selectBlocks = (range) => {
	store.dispatch({
		type: 'selectBlocks',
		range
	})
}


export const resetBlockSelection = () => {
	store.dispatch({
		type: 'selectBlocks',
		range: null
	})
}



export const resetPage = targetPageIndex => {
	store.dispatch({
		type: 'resetPage',
		targetPageIndex
	})
}
