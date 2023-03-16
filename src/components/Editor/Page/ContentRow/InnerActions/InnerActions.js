
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { isAiResponse, isLink } from 'sharedUtils/blockTypes'
import Spinner from 'sharedComponents/Spinner'
import ActionButton from './ActionButton'
import translate from './utils/translate'
import glvrdTextAnalysys from './utils/glvrdTextAnalysys'
import askAi from './utils/askAi'
import textToSpeech from './utils/textToSpeech'

import {
	switchUserFocus
} from 'editorActions'


export default props => {

	const {
		className,
		sharedEditorProps,
		pageIndex,
		blockIndex,
		localeIndex,
		block,
		localizedBlock,
		twoColsMode,
		singlePageMode,
	} = props

	const {
		localeOptions,
		aiPromptMode: promptable,
		selMode,
		isOpenAIEnabled,
		isElevenlabsEnabled,
	} = sharedEditorProps

	let isLoading = localizedBlock && typeof localizedBlock.isLoading !== 'undefined'
		? localizedBlock.isLoading
		: block.isLoading

	let showLoadingSpinner = isLoading && !isAiResponse(block.style)
	let showTranslate = !isLoading && twoColsMode && localizedBlock && !promptable && !selMode
	let showAi = isOpenAIEnabled === 'yes' && !isLoading && !showTranslate && !promptable && !selMode

	let showElevenlabs = isElevenlabsEnabled === 'yes' && !isLink(block.style)

	let showGlvrd = !isLoading &&
		singlePageMode &&
		localeOptions[0] === 'ru' &&
		!promptable && !selMode

	const classes = useStyles()

	return (
		<div
			className={clsx(classes.root, className)}
			onClick={() => {
				switchUserFocus(
					pageIndex,
					localeIndex,
					blockIndex,
				)
			}}
		>
			{showLoadingSpinner && (
				<Spinner isSmall/>
			)}

			{showTranslate && (
				<ActionButton
					label='Translate'
					action={e => {
						translate({
							e,
							localizedBlock,
							srcLang: localeOptions[0],
							dstLang: localeOptions[localeIndex],
							pageIndex,
							blockIndex,
							localeIndex,
						})
					}}
				/>
			)}

			{showGlvrd && (
				<ActionButton
					label='Glvrd'
					action={e => {
						glvrdTextAnalysys({
							pageIndex,
							localeIndex,
							blockIndex,
							node: e.target.parentNode.parentElement.children[0].children[1]
						})
					}}
				/>
			)}

			{showElevenlabs && (
				<ActionButton
					label='Speech'
					action={() => {
						textToSpeech({
							pageIndex,
							blockIndex
						})
					}}
				/>
			)}

			{showAi && (
				<ActionButton
					label='AI'
					action={askAi}
				/>
			)}

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		position: 'absolute',
		top: 4,
		right: 12,
		width: 'auto !important',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 6,
	}

}),{name: 'inner-row-actions'})