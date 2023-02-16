
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import Switch from 'sharedComponents/Switch'
import UIBlock from 'sharedComponents/UIBlock'
import TextButton from 'sharedComponents/TextButton'
import { switchLayout } from 'layoutActions'
import { togglePresenterMode } from 'presenterActions'
import presentationModels from '../models/presentation'
import Select from 'sharedComponents/Select'

// const presentationModes = require('../models/presentation').modes()

export default props => {

	const {
		scrollbarsMode,
		presenterProps,
		editorProps,
	} = props

	const isActive = presenterProps.sidebarMode
	const withShadow = !presenterProps.contrastDarkMode

	const classes = useStyles()

	return (
		<div className={clsx(
			classes.root,
			isActive && classes.active,
			withShadow && classes.withShadow
		)}>

			<div className={clsx(
				classes.content,
				scrollbarsMode && classes.withVisibleScrollbars
			)}>

				{!isActive && (
					<div
						className={classes.sidebarToggler}
						onClick={() => togglePresenterMode('sidebarMode')}
					>☰</div>
				)}

				{isActive && <>

					{presentationModels.byGroups.map(group => {
						return (
							<div className={classes.group}>
								<div className={classes.groupLabel}>{group.label}</div>
								<div className={classes.groupContent}>
									{group.content.map(id => {

										const field = presentationModels.byId[id]

										const {
											label,
											getValue,
											getOptions,
											optionValueHandler,
											optionLabelHandler,
											isTransparent,
											onChange,
											defValue,
											displayCondition,
											type
										} = field

										// Hide or show the field in case of dependence.
										if(displayCondition) {

											const targetValue = presenterProps[
												displayCondition.id
											]

											if(typeof targetValue !== 'undefined') {
												if(targetValue !== displayCondition.value) {
													return null
												}
											}
										}

										return (
											<UIBlock
												isSuperCompact
											>

												{type === 'switch' && (
													<Switch
														label={label}
														onClick={() => togglePresenterMode(id)}
														isActive={presenterProps[id]}
														isSmall
													/>
												)}

												{type === 'select' && (
													<Select
														value={getValue(
															presenterProps,
															editorProps
														)}
														options={getOptions(
															presenterProps,
															editorProps
														)}
														optionValueHandler={optionValueHandler}
														optionLabelHandler={optionLabelHandler}
														isTransparent={isTransparent}
														onChange={onChange}
													/>
												)}

											</UIBlock>
										)

									})}
								</div>
							</div>
						)
					})}


					<div className={classes.footer}>

						<div>
								<TextButton
								isNotable
								onClick={(e) => {
									switchLayout(0)
								}}
							>
								Back to Editor
							</TextButton>
						</div>

						<div>
							<TextButton
								isNotable
								onClick={(e) => {
									togglePresenterMode('sidebarMode')
								}}
							>
								Hide
							</TextButton>
						</div>

					</div>

				</>}

			</div>

		</div>
	)

}


const useStyles = createUseStyles(theme => ({

	root: {
		'-webkit-app-region': 'drag',
		cursor: theme.isFrameless ? 'grab' : 'default',
		position: 'relative',
		zIndex: 2,
		backgroundColor: theme.background.default,
		fontSize: 16,
	},

	active: {
		width: 280,
		padding: 24,
	},

	withShadow: {
		boxShadow: `0 0 45px ${theme.shadow.default}`,
	},

	content: {
		width: '100%',
		height: '100%',
		display: 'flex',
		gap: 20,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		overflowX: 'hidden',
		overflowY: 'auto',
		...theme.hiddenScrollbar
	},

	withVisibleScrollbars: {
		...theme.scrollbar
	},

	group: {
		display: 'flex',
		gap: 10,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},

	groupLabel: {
		// fontWeight: theme.typography.weights.bold,
		fontSize: 20,
	},

	groupContent: {
		display: 'flex',
		gap: 10,
		flexDirection: 'column',
		justifyContent: 'flex-start',
	},


	sidebarToggler: {
		padding: [8, 12],
		position: 'absolute',
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		left: '100%',
		top: 0,
		cursor: 'pointer',
		color: theme.text.muted,
		//backgroundColor: theme.background.default,
		opacity: 0,
		'&:hover': {
			color: theme.textButton.notable.color,
			opacity: 1
		}
	},

	footer: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		flexGrow: 1,
		justifyContent: 'flex-end'
	}


}),{name: 'presenter-sidebar'})
