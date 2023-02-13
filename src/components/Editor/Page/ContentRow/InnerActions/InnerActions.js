
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import { isAiResponse } from 'sharedUtils/blockTypes'
import Spinner from 'sharedComponents/Spinner'
import ActionButton from './ActionButton'
import translate from './utils/translate'
import glvrdTextAnalysys from './utils/glvrdTextAnalysys'
import askAi from './utils/askAi'

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
		aiPromptMode: promptable
	} = sharedEditorProps

	let isLoading = localizedBlock && typeof localizedBlock.isLoading !== 'undefined'
		? localizedBlock.isLoading
		: block.isLoading

	let showLoadingSpinner = isLoading && !isAiResponse(block.style)
	let showTranslate = !isLoading && twoColsMode && localizedBlock && !promptable
	let showAi = !isLoading && !showTranslate && !promptable
	let showGlvrd = !isLoading && singlePageMode && localeOptions[0] === 'ru' && !promptable

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
					isLoading={localizedBlock.isLoading}
					pageIndex={pageIndex}
					localeIndex={localeIndex}
					blockIndex={blockIndex}
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
					sharedEditorProps={sharedEditorProps}
					pageIndex={pageIndex}
					block={block}
					blockIndex={blockIndex}
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

			{showAi && (
				<ActionButton
					label='AI'
					sharedEditorProps={sharedEditorProps}
					pageIndex={pageIndex}
					block={block}
					blockIndex={blockIndex}
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