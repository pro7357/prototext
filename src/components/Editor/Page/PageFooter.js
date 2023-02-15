
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'sharedComponents/TextButton'
import Input from 'sharedComponents/Input'
import { deletePageOrLocale, clearLocale, setPageWidth } from 'editorActions'
import { excludePage } from 'exporterActions'


export default props => {

	const {
		pageIndex,
		singlePageMode,
		alonePageMode,
		twoColsMode,
		isLocalesExists,
		pageWidth,
		pwIsOutOfRange
	} = props

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, alonePageMode && classes.alonePageFooter)}>

			{!alonePageMode && (
				<TextButton
					className={classes.deleteButton}
					isDangerous
					onClick={()=>{
						deletePageOrLocale(pageIndex)
						excludePage(pageIndex)
					}}
				>
					Delete page
				</TextButton>
			)}

			{singlePageMode && (
				<div className={classes.pageWidthUI}>
					<Input
						className={clsx(
							classes.pageWidthInput,
							pwIsOutOfRange && classes.wrongInputValue,
						)}
						value={pageWidth ? pageWidth : 'auto'}
						onInput={(val,e) => {

							let displayVal = Number(val)

							if(!displayVal || isNaN(displayVal)) {
								displayVal = 'auto'
							}

							e.target.value = displayVal

						}}
						onPressEnter={val => {
							setPageWidth(Number(val) || false)
						}}
					/>{pageWidth ? <span>px</span>:''}
				</div>
			)}

			{(twoColsMode && isLocalesExists) && (
				<TextButton
					className={clsx(classes.deleteButton,classes.rigthDeleteButton)}
					isDangerous
					onClick={()=>{
						clearLocale(pageIndex)
					}}
				>
					Clear localization
				</TextButton>
			)}

			</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		//marginTop: 8,
		direction: 'ltr',
		paddingBottom: 104,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	alonePageFooter: {
		justifyContent: 'flex-end'
	},

	deleteButton: {
		// minWidth: '33%',
	},

	rigthDeleteButton: {
		textAlign: 'right',
	},

	pageWidthUI: {
		color: theme.text.muted,
		opacity: 0.5,
		display: 'flex',
		alignItems: 'center',
		gap: 2,
		'&:hover': {
			opacity: 1,
		}
	},

	pageWidthInput: {
		color: theme.text.muted,
		background: 'none',
		border: 'none',
		font: 'inherit',
		fontSize: 16,
		textAlign: 'right',
		width: 70,
		padding: [0,2],
		outline: 'none',
		'&:focus': {
			color: theme.text.active,
		}
	},

	wrongInputValue: {
		color: theme.input.wrongValue.color,
		'&:focus': {
			color: theme.input.wrongValue.color,
		}
	},

}),{name: 'page-footer'})