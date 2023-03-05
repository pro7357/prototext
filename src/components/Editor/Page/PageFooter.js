
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import TextButton from 'sharedComponents/TextButton'
import Input from 'sharedComponents/Input'
import {
	resetPage,
	clonePage,
	deletePageOrLocale,
	clearLocale,
	setPageWidth
} from 'editorActions'
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
		<div className={clsx(classes.root)}>

			<div className={classes.pageActions}>

				<div className={classes.pageActionsLabel}>
					Page actions
				</div>

				<div className={classes.pageActionsButtons}>
					<div>
						<TextButton
							className={classes.deleteButton}
							onClick={()=>{
								clonePage(pageIndex)
							}}
						>
							Duplicate
						</TextButton>
					</div>

					{!alonePageMode && (
						<div>
							<TextButton
								className={classes.deleteButton}
								onClick={()=>{
									deletePageOrLocale(pageIndex)
									excludePage(pageIndex)
								}}
							>
								Delete
							</TextButton>
						</div>
					)}

					<div>
						<TextButton
							className={classes.deleteButton}
							onClick={()=>{
								resetPage(pageIndex)
							}}
						>
							Reset
						</TextButton>
					</div>

				</div>
			</div>

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

	deleteButton: {
		// minWidth: '33%',
	},

	rigthDeleteButton: {
		textAlign: 'right',
	},


	pageActions: {
		overflow: 'hidden',
		position: 'relative',
		'&:hover':{
			overflow: 'initial',
			'& $pageActionsButtons': {
				opacity: 1
			}
		}
	},

	pageActionsLabel: {
		color: theme.text.muted,
		opacity: 0.6,
		fontSize: 17
	},

	pageActionsButtons: {
		width: '100%',
		padding: [28, 0, 10, 0],
		display: 'flex',
		flexDirection: 'column',
		gap: 5,
		position: 'absolute',
		top: 0,
		left: 0,
		opacity: 0,
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