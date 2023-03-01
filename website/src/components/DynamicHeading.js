
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { useState, useEffect } from 'preact/hooks'


let t
export default props => {

	const {
		items,
		className
	} = props

	const [itemIndex, setItemIndex] = useState(0)

	t = setTimeout(() => {
		setItemIndex((itemIndex + 1) % items.length)
	}, 3000)

	const classes = useStyles()

	return (
		<h1
			className={clsx(
				classes.root,
				className
			)}
		>
			{items[itemIndex]}
		</h1>
	)
}

const useStyles = createUseStyles(theme => ({

	root: {

	},


}),{name: 'dynamic-heading'})