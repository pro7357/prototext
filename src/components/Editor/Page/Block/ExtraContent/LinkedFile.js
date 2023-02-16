
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'sharedComponents/TextButton'
import LinkedImage from './LinkedImage'
import LinkedVideo from './LinkedVideo'
import revealFileInFinder from './utils/revealFileInFinder'
import * as fileTypes from 'globalUtils/fileTypes'
import normalizeFilePath from 'globalUtils/normalizeFilePath'


export default props => {

	// Make the path to the file absolute and convert it to Unix format.
	const src = normalizeFilePath(props.filePath, props.currentDoc, true)

	const filePath = normalizeFilePath(props.filePath, props.currentDoc)

	const isImage = fileTypes.isImage(filePath)
	const isVideo = fileTypes.isVideo(filePath)
	const isOther = !isImage && !isVideo

	const classes = useStyles()

	return (
		<div
			data-depth={4}
			className={classes.root}
		>

			{isImage && (
				<LinkedImage
					src={src}
				/>
			)}

			{isVideo && (
				<LinkedVideo
					src={src}
				/>
			)}

			<div
				data-depth={5}
				className={classes.controls}
			>

				<TextButton
					extraProps={{'data-depth':6}}
					onClick={e => {
						window.open(filePath, '_blank')
					}}
					isNotable
				>
					Open
				</TextButton>

				<TextButton
					extraProps={{'data-depth':6}}
					onClick={e => {
						revealFileInFinder(filePath)
					}}
					isNotable
				>
					Reveal in Finder
				</TextButton>

			</div>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {

	},

	controls: {
		display: 'flex',
		gap: 10,
	}

}),{name: 'linked-file'})