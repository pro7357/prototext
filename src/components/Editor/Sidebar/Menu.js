
import { connect } from 'react-redux'
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'
import { addPage } from 'editorActions'
import handleClick from './utils/handleClick'
import handleDrag from './utils/handleDrag'
import handleDrop from './utils/handleDrop'
import MidDropArea from '../MidDropArea'
import isHiddenPage from 'sharedUtils/isHiddenPage'
import { localesList, localesDict} from 'globalUtils/allLocaleOptions'
import Select from 'sharedComponents/Select'
import handleLocaleOptionsSelect from './utils/handleLocaleOptionsSelect'
import OuterActions from '../Page/ContentRow/OuterActions'


export default connect(mapStateToProps)(props => {

	const {
		compactMode,
		dndMode,
		localizationMode,
		localeConfigMode,
		localeOptions,
		content,
		targetPageIndex,
		targetLocaleIndex,
		side,
		search
	} = props

	let isLeft  = side === 'left'
	let isRight = side === 'right'

	let isLocalizationView = localizationMode && isRight
	let isLocalizationSettingView = isLocalizationView && localeConfigMode

	let targetContent = isLocalizationView
		? content[targetPageIndex].content
		: content

	let isAlone = targetContent.length === 1

	if(isLocalizationView && isAlone && !isLocalizationSettingView) {
		return null
	}

	let isPageDndMode = dndMode === 'page'
	let isLocaleDndMode = dndMode === 'locale'
	let droppable = (isPageDndMode && !isLocalizationView) ||
		(isLocaleDndMode && isLocalizationView)

	const classes = useStyles()

	return (
		<div
			className={clsx(
				classes.root,
				classes[side+'Side'],
				compactMode && classes.compactRoot
			)}
		>
			{targetContent.map((item, itemIndex)=> {

				if(
					(isLocalizationView && itemIndex === 0 && !localeConfigMode) ||
					//(isLocalizationView && itemIndex === 0) ||
					(isLeft && localeConfigMode && itemIndex > 0)
				) {
					return
				}

				if(!isLocalizationView && search && (search.global || search.isTagsMode)) {
					if(isLeft) {
						if(isHiddenPage({ search, page:item })){
							search.hiddenPages = search.hiddenPages || []
							search.hiddenPages.push(itemIndex)
							return null
						}
					} else {
						// Synchronize the search results between sidbars.
						if(search.hiddenPages && search.hiddenPages.includes(itemIndex)){
							return null
						}
					}
				}

				let draggable = isAlone === false

				if(isRight && !localeConfigMode) {
					draggable = false
				}


				let title = (
					isLocalizationView
						? item.content[0]
						: item.content[0].content[0]
					)

				if(title) {
					title = title.content
				}

				if(!title || typeof title !== 'string' || !title.trim()) {
					title = 'Untitled'
				}

				let isActive = isLocalizationView
					? itemIndex === targetLocaleIndex
					: itemIndex === targetPageIndex

				let localeCode = localeOptions[itemIndex]

				return (
					<div
						id={`${itemIndex}`}
						className={clsx(
							classes.item,
							compactMode && classes.compactItem,
							draggable && classes.draggableItem,
							isActive && classes.targetItem
						)}
						onClick={e => {
							handleClick({
								e,
								side,
								isAlone,
								targetPageIndex,
								isLocalizationView,
								itemIndex
							})
						}}
						draggable={draggable}
						onDragStart={e=>{
							if(isAlone || !draggable) return
							handleDrag({e,moment: 'hold',isLocalizationView})
							handleDrag({
								e,
								moment: 'start',
								srcIndex: itemIndex,
								isLocalizationView,
								localeCode
							})
						}}
						onDragEnd={e=>{
							handleDrag({e, moment: 'end'})
						}}
						onDragOver={e => {
							if(!droppable) return
							handleDrop({e,moment: 'over'})
						}}
						onDragLeave={e => {
							if(!droppable) return
							handleDrop({e,moment: 'leave'})
						}}
						onDrop={e => {
							if(!droppable) return
							handleDrop({e,moment: 'drop',itemIndex, isLocalizationView, side})
						}}
					>

						{(isLocalizationSettingView || (isLeft && localeConfigMode)) && (
							<div
								className={clsx(
									(!isAlone && isRight) && classes.draggableSelect
								)}
							>

								{(!isAlone && isRight) && (
									<OuterActions className={classes.localeActions}/>
								)}

								<Select
									className={classes.localeSelect}
									value={localeCode}
									options={localesList}
									optionValueHandler={(option) => option[0]}
									optionLabelHandler={(option) => option[1]}
									isTransparent
									isCompact
									isDisabled={isLeft}
									onChange={value => {
										handleLocaleOptionsSelect({
											value,
											itemIndex
										})
									}}
								/>

							</div>
						)}

						{(
							localeConfigMode
								? isLeft && itemIndex > 1
								: !isLocalizationSettingView
							) && (
							<div className={classes.title}>
								{(isLocalizationView && !localeConfigMode)
									? localeCode ? localesDict[localeCode].name : 'Undefined'
									: title
								}
							</div>
						)}

						<MidDropArea />

					</div>
				)
			})}

			{(
				(isLeft && !localeConfigMode) ||
				isLocalizationSettingView
			) && (
				<div
					className={classes.item}
					onClick={() => addPage(side)}
				>
					+
				</div>
			)}

		</div>
	)

})


function mapStateToProps(state, props) {
	return {
		compactMode: state.editor.compactMenuMode,
		content: state.editor.content
	}
}


const useStyles = createUseStyles(theme => ({

	root: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		gap: 16,
		padding: [28,16,0,16],
	},

	compactRoot: {
		gap: 8
	},

	leftSide: {

	},

	rightSide: {

	},

	item: {
		'-webkit-app-region': 'no-drag',
		'-webkit-user-select': 'none',
		position: 'relative',
		backgroundColor: theme.menuItem.background,
		padding: [8, 15],
		borderRadius: theme.round,
		cursor: 'pointer',
		maxWidth: '100%',
		'&:hover':{
			backgroundColor: theme.menuItem.active.background,
			color: theme.text.active,
		},
	},

	compactItem: {
		padding: [8, 10],
		fontSize: 16,
		borderRadius: 8,
		'& $title':{
			whiteSpace: 'normal',
			overflow: 'initial'
		}
	},

	title: {
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		maxWidth: '100%',
	},

	draggableItem: {

	},

	targetItem: {
		backgroundColor: theme.menuItem.active.background,
		color: theme.text.active,
		cursor: 'default',
	},

	draggableSelect: {
		paddingLeft: 16,
		paddingRight: 20,
		...theme.textBlockHandles.left(false, true),
		...theme.textBlockHandles.right(false, true),
	},

	localeSelect: {
		position: 'relative',
		zIndex: 1
	},

	localeActions: {
		left: 10,
		right: 10,
		zIndex: 0
	}

}),{name: 'menu'})
