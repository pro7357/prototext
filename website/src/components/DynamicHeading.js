
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { useState, useEffect } from 'preact/hooks'


let t
export default props => {

	const {
		items,
		timeout = 3000,
		className
	} = props

	const [itemIndex, setItemIndex] = useState(0)

	t = setTimeout(() => {
		setItemIndex((itemIndex + 1) % items.length)
	}, timeout)

	const classes = useStyles()

	return items[itemIndex]

}

const useStyles = createUseStyles(theme => ({

	root: {

	},


}),{name: 'dynamic-heading'})