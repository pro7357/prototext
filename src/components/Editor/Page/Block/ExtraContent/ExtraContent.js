
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import LinkedResource from './LinkedResource'

export default props => {

	if(!props.block) {
		return null
	}

	const isLink = props.block.style === 8
	const isActivated = isLink // or something else in the future

	const classes = useStyles()

	return (
		<div
			data-depth={2}
			data-role='extra-block-content-root'
			className={clsx(
				isActivated && classes.activated
			)}
		>
			{isLink && (
				<LinkedResource
					blockProps={props}
				/>
			)}
		</div>
	)
}

const useStyles = createUseStyles(theme => ({

	activated: {
		padding: [0,20,17,20],
		marginTop: -10
	}

}),{name: 'extra-block-content'})