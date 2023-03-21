
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import ImagePreview from 'components/ImagePreview'
import splitText from 'utils/splitText'

import questions from './data/qa'


export default props => {

	const {
		publicData
	} = props

	const [opened, setOpened] = useState([])

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isVFlex id='questions-and-answers'>

			<Heading isHuge isWarm >Questions<br/>Answers</Heading>

			<div className={classes.cards}>
				{questions.map((question, questionIndex) => {
					let isOpened = opened.includes(questionIndex)
					return (
						<div
							className={clsx(
								classes.card,
								isOpened && classes.openedCard,
								!isOpened && classes.closedCard
							)}
						>
							{question.map((p, pIndex) => {

								if(pIndex === 0) {
									return null
								}

								let value = p.v
								let role = p.s

								const isTitile = pIndex === 1
								const isImages = role === 1

								if(!isTitile && !isOpened) {
									return null
								}

								if(isTitile) {
									return (
										<div
											className={classes.cardHead}
											onClick={isOpened ? null : () => {
												setOpened(
													opened.concat(questionIndex)
												)
											}}
										>
											<h3 className={classes.cardTitle}>
												{splitText(value)}
											</h3>

											{!isOpened && (
												<div className={classes.cardOpenBtn}>
													▾
												</div>
											)}

										</div>
									)
								}

								if(isImages) {
									return (
										<div className={classes.cardImages}>
											{value.split(' ').map((imgId, imgIndex) => {
												return (
													<ImagePreview
														src={`assets/screenshots/qa/${imgId}`}
													/>
												)
											})}
										</div>
									)
								}

								return <div className={classes.cardText}>{value}</div>

							})}
						</div>
					)
				})}
			</div>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		maxWidth: 800,
	},

	heading: {

	},

	cards: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
		marginTop: 16
	},

	card: {
		textAlign: 'left',
		backgroundColor: theme.background.defualt,
		boxShadow: `0 5px 48px ${theme.shadow.default}`,
		borderRadius: theme.rounded * 2,
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: 16
	},

	openedCard: {
		padding: 30,
		'& $cardHead': {
			marginBottom: 8,
		}
	},

	closedCard: {
		'& $cardHead': {
			padding: 30,
			cursor: 'pointer',
			'&:hover': {
				color: theme.textButton.notable.color
			}
		}
	},

	cardHead: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 20,
	},

	cardTitle: {
		margin: 0,
		...theme.desktopLineBreaks
	},

	cardText: {

	},

	cardImages: {
		marginTop: 8,
		padding: 16,
		backgroundColor: theme.block.background,
		borderRadius: theme.rounded,
		display: 'flex',
		gap: 12,
		flexWrap: 'wrap',
		'& img': {
			width: '100%'
		},
		[theme.desktop]: {
			'& > div': {
				width: 'calc(50% - 6px)'
			},
		}
	},

	cardOpenBtn: {
		display: 'none',
		[theme.desktop]: {
			display: 'initial'
		}
	}


}),{name: 'q-and-a'})