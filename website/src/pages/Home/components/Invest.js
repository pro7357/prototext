
import { useState } from 'preact/hooks'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Section from 'components/Section'
import Heading from 'components/Heading'
import UIBlock from 'app/components/shared/UIBlock'
import Textarea from 'app/components/shared/Textarea'
import Tags from 'app/components/shared/Tags'
import Tag from 'app/components/shared/Tag'

import data from './data/public'

export default props => {

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

			<Heading>Invest in the project</Heading>

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
						className={classes.btcImg} width={200}
						src={`assets/${targetCoin.wallet}.png`}
					/>
					<Textarea value={targetCoin.wallet}/>
				</div>

			</UIBlock>

			<UIBlock
				label={<b>The most relevant goals</b>}
				className={classes.uiBlock}
			>
				<Tags>
					{data[0].map((goal, goalIndex) => {
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
					{data[1].map((task, taskIndex) => {
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
					{data[2].map((task, taskIndex) => {
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


			<div className={classes.thk}>
				<b>Thank you</b> and best of luck with your journey of self-discovery!
			</div>

		</Section>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		gap: 24
	},

	uiBlock: {
		width: '100%'
	},

	firstBlock: {
		marginTop:  -24,
	},

	crypto: {
		display: 'flex',
		gap: 16,
		width: '100%',
		'& textarea': {
			minHeight: '100%',
			height: 'auto'
		}
	},

	bottomBlock: {
		paddingBottom: 24
	},

	completedTaskTags: {
		opacity: .55,
		'&:hover': {
			opacity: 1
		}
	},

	expansesTags: {
		opacity: .35,
		'&:hover': {
			opacity: 1
		}
	},

	thk: {
		marginTop: 4,
		textAlign: 'left'
	}


}),{name: 'invest'})