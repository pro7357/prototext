
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import UIBlock from 'app/components/shared/UIBlock'
import Textarea from 'app/components/shared/Textarea'
import Tags from 'app/components/shared/Tags'
import Tag from 'app/components/shared/Tag'


export default props => {

	const {
		publicData
	} = props

	const goals = publicData[0]
	const completedTasks = publicData[1]
	const expanses = publicData[2]

	const coins = [
		{
			label: 'Bitcoin (BTC)',
			wallet: 'bc1q885mar9p4c3kn3d83m42hpgz2rs47r53ldnkmt'
		}, {
			label: 'Ethereum (ETH or USDT)',
			wallet: '0x56Dd0d9A9ddCbCa494909f95496e39e5257de8BA'
		}
	]

	const [coin, setCoin] = useState(0)

	const targetCoin = coins[coin]

	const classes = useStyles()

	return (
		<Section className={classes.root} isCentred isVFlex id='invest-in-the-project'>

			<Heading className={classes.heading}>
				<span>
				At your wish. You can invest in the project to achieve
				</span>
				<span>
				the next goals together and faster.
				</span>
			</Heading>

			{/* <div>
				To achieve the next goals<br/>together & faster.
			</div> */}

			<UIBlock
				label={<b>{targetCoin.label}</b>}
				className={classes.firstBlock}
				secondaryActions={[
					{
						label: 'Switch Coin',
						action: () => {
							setCoin((coin+1)%coins.length)
						}
					}
				]}
			>
				<div className={classes.crypto}>
					<img
						width={200}
						src={`assets/${targetCoin.wallet}.png`}
					/>
					<Textarea value={targetCoin.wallet}/>
					<img
						width={200}
						src={`assets/artemy-bw.jpg`}
					/>
				</div>

			</UIBlock>

			<UIBlock
				label={<b>The next goals</b>}
				className={classes.uiBlock}
			>
				<Tags>
					{goals.map((goal, goalIndex) => {
						if(goalIndex === 0) {
							return null
						}
						return (
							<Tag isStatic>
								{goal.v}
							</Tag>
						)
					})}
				</Tags>
			</UIBlock>

			<UIBlock
				label={<b>Completed tasks</b>}
				className={clsx(classes.uiBlock, classes.completedTaskTags)}
			>
				<Tags>
					{completedTasks.map((task, taskIndex) => {
						if(taskIndex === 0) {
							return null
						}
						return (
							<Tag isStatic>
								{task.v}
							</Tag>
						)
					})}
				</Tags>
			</UIBlock>

			<UIBlock
				label={<b>Expenses</b>}
				className={clsx(classes.uiBlock, classes.expansesTags)}
			>
				<Tags>
					{expanses.map((expanse, expanseIndex) => {
						if(expanseIndex === 0) {
							return null
						}
						return (
							<Tag isStatic>
								{expanse.v}
							</Tag>
						)
					})}
				</Tags>
			</UIBlock>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		gap: 24,
		// alignItems: 'start'
	},

	heading: {
		paddingBottom: 0,
		// marginBottom: -8,
		...theme.desktopLineBreaks
	},

	uiBlock: {
		width: '100%'
	},

	firstBlock: {
		marginTop:  32,
	},

	crypto: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 16,
		width: '100%',
		'& textarea': {
			minHeight: '100%',
			height: 'auto'
		},
		[theme.desktop]: {
			flexWrap: 'nowrap'
		}
	},

	bottomBlock: {
		paddingBottom: 24
	},

	completedTaskTags: {
		[theme.desktop]: {
			opacity: .55,
			'&:hover': {
				opacity: 1
			}
		}
	},

	expansesTags: {
		[theme.desktop]: {
			opacity: .35,
			'&:hover': {
				opacity: 1
			}
		}
	},


}),{name: 'invest'})