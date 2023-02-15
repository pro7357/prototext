
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import Link from 'components/Link'


export default props => {

	const classes = useStyles()

	const data = [
		{
			v: 'The App is Free'
		},
		{
			v: 'Minimalistic'
		},
		{
			v: 'Private'
		},
		{
			v: 'Offline'
		},
		{
			v: 'No ads'
		},
		{
			v: 'No registration'
		},
		{
			v: 'Open source'
		},
	]

	return (
		<Section className={classes.root} isCentred id='manifest'>

			<Heading isHuge isWarm>Manifest</Heading>

			<div className={classes.cards}>
				{data.map(item => {
					return (
						<div className={classes.card}>
							{item.v}
						</div>
					)
				})}

			</div>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {

	},

	cards: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20
	},

	card: {
		backgroundColor: theme.background.defualt,
		color: theme.text.active,
		boxShadow: `0 5px 48px ${theme.shadow.default}`,
		padding: [40,30],
		borderRadius: theme.round,
		flexBasis: '100%',
		[theme.desktop]: {
			flexBasis: '20%',
		}
	}

}),{name: 'manifest'})