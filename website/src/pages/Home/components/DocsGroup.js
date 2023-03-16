
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Subheading from 'components/Subheading'
import Button from 'app/components/shared/Button'
import Link from 'components/Link'

import splitText from 'utils/splitText'


export default props => {

	const {
		dir,
		title,
		data,
		isNarrow,
		isDownloadable,
		renderExtraItem,
		className
	} = props

	const classes = useStyles()

	let examples = []
	let example = []

	const finishExample = (example) => (
		examples.push(
			<div
				className={clsx(
					classes.example,
					isNarrow && classes.narrowExample
				)}
			>
				{example}
			</div>
		)
	)

	for (let i = 1; i < data.length; i++) {

		const item = data[i]
		const isTitle = item.s === 6
		const isLast = i === data.length - 1

		if(isTitle) {

			if(example.length > 1) {
				finishExample(example)
			}

			let _fullItemValue = item.v.indexOf('|')
				? item.v.split('|')
				: item.v

			let exampleTitle = _fullItemValue[0]
			let fileName = _fullItemValue[1]
			let isCompressed

			if(fileName[0] === '$') {
				isCompressed = true
				fileName = fileName.slice(1)
			}

			let imgSrc = `${dir}/${fileName}.jpg`
			let fileSrc = `${dir}/${fileName}.${isCompressed?`zip`:`ptxt`}`

			example = [
				<div className={classes.exampleHeading}>

					<Subheading>{exampleTitle}</Subheading>

					{isDownloadable && (
						<Link
							url={fileSrc}
							isNotable
							isDownloadable
						>
							Download
						</Link>
					)}

				</div>,
				<div
					className={classes.screenshotWindow}
					onClick={() => {
						window.open(imgSrc, '_blank')
					}}
				>
					<img
						src={imgSrc}
						className={classes.screenshot}
					/>
					<div>Preview</div>
				</div>
			]

		} else {

			example.push(
				<div className={classes.description}>
					{splitText(item.v)}
				</div>
			)

		}

		if(isLast) {
			finishExample(example)
		}

	}

	if(typeof renderExtraItem === 'function') {
		finishExample(
			renderExtraItem()
		)
	}

	return (
		<Section className={classes.root} isCentred isWide isVFlex>

			<div className={clsx(classes.examples, className)}>
				{examples}
			</div>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		gap: 60,
		paddingLeft: 0,
		paddingRight: 0,
		[theme.desktop]: {
			paddingLeft: 24,
			paddingRight: 24,
		}
	},

	examples: {
		display: 'flex',
		gap: 48,
		flexWrap: 'wrap'
	},

	example: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		marginBottom: 16,
		[theme.desktop]: {
			width: 'calc((100% / 2) - 48px / 2)',
		}
	},

	narrowExample: {
		width: '100%',
		[theme.desktop]: {
			width: 'calc((100% / 4) - 48px * 3 / 4)',
		}
	},

	exampleHeading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: 16,
		marginBottom: 20,
		'& h2': {
			fontSize: 28,
			textAlign: 'left'
		}
	},

	screenshotWindow: {
		borderRadius: theme.rounded * 2,
		boxShadow: `0 10px 30px ${theme.shadow.default}`,
		marginBottom: 20,
		cursor: 'pointer',
		position: 'relative',
		'&>div': {
			display: 'none',
		},
		'&:hover': {
			background: theme.background.warmGradient,
			'&>div': {
				display: 'block',
				fontWeight: 'bold',
				fontSize: 24,
				position: 'absolute',
				width: '100%',
				textAlign: 'center',
				color: 'white',
				top: 'calc(50% - 20px)',
			},
			'&>img': {
				opacity: 0.2
			}
		}
	},

	screenshot: {
		maxWidth: '100%',
		borderRadius: theme.rounded * 2,
		overflow: 'hidden',
		display: 'block',
	},

	description: {
		fontSize: 15,
		textAlign: 'left',
		marginTop: 8
	}

}),{name: 'docs-group'})