
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'sharedComponents/TextButton'

import linkFile from './utils/linkFile'
import {
	activateLinkMode,
	deactivateLinkMode
} from 'editorActions'


export default props => {

	const {
		linkMode,
		block,
		pageIndex,
		localeIndex,
		blockIndex,
		currentDoc,
	} = props

	const classes = useStyles()

	return (
		<div
			data-depth={4}
			className={classes.root}
		>

			{!linkMode && (<>

				<TextButton
					extraProps={{'data-depth':5}}
					onClick={activateLinkMode}
					isNotable
				>
					Link a card
				</TextButton>

				<TextButton
					extraProps={{'data-depth':5}}
					onClick={() => {
						linkFile({
							block,
							targetPageIndex: pageIndex,
							targetLocaleIndex: localeIndex,
							targetBlockIndex: blockIndex,
							currentDoc,
							assetMode: false
						})
					}}
					isNotable
				>
					Link files
				</TextButton>

				<TextButton
					extraProps={{'data-depth':5}}
					onClick={() => {
						linkFile({
							block,
							targetPageIndex: pageIndex,
							targetLocaleIndex: localeIndex,
							targetBlockIndex: blockIndex,
							currentDoc,
							assetMode: true
						})
					}}
					isNotable
				>
					Add assets
				</TextButton>

			</>)}

			{linkMode && (
				<TextButton
					extraProps={{'data-depth':5}}
					onClick={(e) => {
						e.stopPropagation()
						deactivateLinkMode()
					}}
					isSemiDangerous
				>
					Cancel
				</TextButton>
			)}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		gap: 10
	},

}),{name: 'linking-controls'})