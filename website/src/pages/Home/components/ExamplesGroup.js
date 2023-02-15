
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Subheading from 'components/Subheading'
import Button from 'app/components/shared/Button'
import Link from 'components/Link'


export default props => {

	const {
		dir,
		title,
		data,
		isNarrow,
		isDownloadable
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
						>
							Download
						</Link>
					)}

					{/* {isDownloadable && (<div>
						<Button
							url={`${dir}/${fileName}.${isCompressed?`zip`:`ptxt`}`}
							isNotable
							isCompact
						>
							Download
						</Button>
					</div>)} */}

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
					{item.v}
				</div>
			)

		}

		if(isLast) {
			finishExample(example)
		}

	}

	return (
		<Section className={classes.root} isCentred isWide isVFlex>

			{/* <Subheading>
				{title}
			</Subheading> */}

			<div className={classes.examples}>
				{examples}
			</div>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		gap: 60
	},

	examples: {
		display: 'flex',
		gap: 48,
		flexWrap: 'wrap'
	},

	example: {
		width: 'calc((100% / 2) - 48px / 2)',
		display: 'flex',
		flexDirection: 'column',
		gap: 20,
		marginBottom: 16,
	},

	narrowExample: {
		width: 'calc((100% / 4) - 48px * 3 / 4)',
	},

	exampleHeading: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'wrap',
		gap: 16,
		'& h2': {
			fontSize: 28,
			textAlign: 'left'
		}
	},

	screenshotWindow: {
		borderRadius: theme.rounded * 2,
		boxShadow: `0 10px 30px ${theme.shadow.default}`,
		marginBottom: 8,
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
		display: 'block'
	},

	description: {
		fontSize: 15,
		textAlign: 'left'
	}

}),{name: 'examples-group'})