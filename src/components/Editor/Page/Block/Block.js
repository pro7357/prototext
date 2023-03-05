
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import handleFocus from './utils/handleFocus'
import handleInput from './utils/handleInput'
import handleClick from './utils/handleClick'
import handleKeyDown from './utils/handleKeyDown'
import handlePaste from './utils/handlePaste'
import normalizeBlockValue from './utils/normalizeBlockValue'
import scrollToNode from 'globalUtils/scrollToNode'
import ExtraContent from './ExtraContent/ExtraContent'
import BlockBorder from './BlockBorder'


export default props => {

	const {
		sharedEditorProps,
		block,
		pageIndex,
		blockIndex,
		localeIndex,

		isAlone,
		singlePageMode,
		originalLocaleBlock,
		lang,
		side,
	} = props

	if(!block) {
		return 'Incorrect block'
	}

	const {
		localeOptions,
		dndMode,
		selMode,
		fbbMode,
		linkMode,
		aiPromptMode,
		currentDoc,
		spellcheck,
	} = sharedEditorProps

	const id = block.id
	let style = block.style
	let value = block.content
	let isLoading = block.isLoading


	// Stylization is available only for blocks of original localization.
	if(
		localeIndex > 0 &&
		originalLocaleBlock &&
		typeof originalLocaleBlock === 'object'
	) {
		style = originalLocaleBlock.style
	}

	const classes = useStyles()

	return (
		<div
			data-role='block-root'
			data-depth={1}
			className={clsx(
				classes.root,
				style && classes['blockStyle-'+style],
				isLoading && classes.loading,
				(lang && lang.isRtl) && classes.rtlText
			)}
		>

			<BlockBorder style={style} isLoading={isLoading} />

			<div
				id={`${side?`${side}-`:``}be-${pageIndex}-${localeIndex}-${blockIndex}`}
				data-role='block-value'
				data-depth={2}
				lang={lang && lang.code}
				className={clsx(
					classes.editableRoot
				)}
				contentEditable={!dndMode && !linkMode && !aiPromptMode && !selMode}
				spellcheck={spellcheck}
				ref={(node)=> {
					if(node) {

						node.innerHTML = normalizeBlockValue(value)

						if(block.isHighlighted) {
							setTimeout(() => {
								scrollToNode({
									node,
									containerNode: node.parentNode.parentNode.parentNode.parentNode,
									offset: -60
								})
							}, 0)
						}

						if(blockIndex === 0 && isAlone && singlePageMode) {
							setTimeout(() => {
								node.focus()
							}, 0)
						}

					}
				}}
				onFocus={e => {
					handleFocus({
						e,
						pageIndex,
						localeIndex,
						blockIndex,
						block,
						linkMode,
					})
				}}
				onKeyDown={e => {
					handleKeyDown({
						e,
						block,
						pageIndex,
						localeIndex,
						blockIndex,
						fbbMode,
						linkMode,
						isAlone,
					})
				}}
				onInput={e => {
					handleInput({
						e,
						block,
						pageIndex,
						localeIndex,
						blockIndex,
						side,
					})
				}}
				onClick={e => {
					// pass
				}}
				onDoubleClick={e => {
					handleClick({e,dblMode:true})
				}}
				onPaste={e => {
					handlePaste({e,localeIndex, block})
				}}
			/>

			<ExtraContent
				block={block}
				pageIndex={pageIndex}
				localeIndex={localeIndex}
				blockIndex={blockIndex}
				currentDoc={currentDoc}
				side={side}
				linkMode={linkMode}
			/>

		</div>
	)

}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		minHeight: 56,
		backgroundColor: theme.block.background,
		borderRadius: theme.rounded,
		position: 'relative',
		zIndex: 0,
	},

	editableRoot: {
		wordBreak: 'break-word',
		outline: 'none',
		height: '100%',
		padding: [17,17,17,20],
	},

	rtlText: {
		textAlign: 'right',
		direction: 'rtl',
		fontSize: 22,
	},

	...theme.textBlockStyles,

	loading: {
		// '& $editableRoot': {
		// 	animation: `$blink 1.5s linear infinite`,
		// }
	},

	'@keyframes blink': {
		'50%': {
			opacity: 0.2,
		},
	},

	// important
	// 'blockStyle-1'

	// question
	// 'blockStyle-2'

	// positive
	// 'blockStyle-3'

	// negative
	// 'blockStyle-4'

	// muted
	// 'blockStyle-5'

	// bold
	// 'blockStyle-6'

	// heading
	// 'blockStyle-7'


}),{name: 'block'})