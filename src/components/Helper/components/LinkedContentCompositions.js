
import clsx from 'clsx'
import { createUseStyles } from 'react-jss'
import { domain } from 'globalConstants'
import UIBlock from 'sharedComponents/UIBlock'
import Link from 'sharedComponents/Link'
import TextButton from 'sharedComponents/TextButton'

export default () => {

	const classes = useStyles()

	return (
		<div className={classes.root}>

			<div>
				All these options become available after entering "@" inside the card. The type of link and the behavior of the interface depends on the content of the card.
			</div>

			<UIBlock className={classes.block}>
				{domain}
				<div className={classes.controls}>
					<TextButton isNotable>Follow external link</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				Internal link to another card or page
				<div className={classes.controls}>
					<TextButton isNotable>Follow internal link</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				another-document.ptxt
				<div className={classes.controls}>
					<TextButton isNotable>Open</TextButton>
					<TextButton isNotable>Reveal in Finder</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				any-other-file.ext
				<div className={classes.controls}>
					<TextButton isNotable>Open</TextButton>
					<TextButton isNotable>Reveal in Finder</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				tag1, tag2, tag3
				<div className={classes.controls}>
					<TextButton isNotable>Search by tags</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				Description of the attachment
				<div className={classes.visualAttachment}>Preview of Image, Video, or YouTube video</div>
				<div className={classes.controls}>
					<TextButton isNotable>Open</TextButton>
					<TextButton isNotable>Reveal in Finder</TextButton>
				</div>
			</UIBlock>

			<UIBlock className={classes.block}>
				|
				<div className={classes.controls}>
					<TextButton isNotable>Link a card</TextButton>
					<TextButton isNotable>Link files</TextButton>
					<TextButton isNotable>Add assets</TextButton>
				</div>
			</UIBlock>

			<div>
				An <b>"asset"</b> is not just a link, but a copy of a file that the app makes and stores near the current document in the "./assets" directory.
			</div>

		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: 16,
		margin: [4,0],
		minWidth: 240,
		// maxWidth: 300,
	},

	composition: {
		width: '100%',
		height: 100,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'stretch',
		gap: 8,
	},

	block: {
		padding: 20,
		gap: 8,
	},

	controls: {
		display: 'flex',
		gap: 8
	},

	visualAttachment: {
		backgroundColor: 'black',
		width: '100%',
		height: 110,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	}

}),{name: 'linked-content-compositions'})