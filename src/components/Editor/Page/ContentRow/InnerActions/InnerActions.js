
import { createUseStyles } from 'react-jss'
import clsx from 'clsx'

import allActionFieldModels from 'settingsModels/cardActions/cardAction'
import { isAiResponse } from 'sharedUtils/blockTypes'
import Spinner from 'sharedComponents/Spinner'
import handleActionClick from './utils/handleActionClick'
import ActionButton from './ActionButton'



export default props => {

	const {
		className,
		sharedEditorProps,
		pageIndex,
		blockIndex,
		localeIndex,
		block = {},
		localizedBlock,
	} = props

	const {
		currentDoc,
		appSettings,
		pageView,
	} = sharedEditorProps

	const cardActions = appSettings.cardActions

	let localizationMode = pageView == 2
	let isLoading = localizationMode
		? localizedBlock.isLoading
		: block.isLoading

	let showLoadingSpinner = isLoading && !isAiResponse(block.style)

	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)} >

			{showLoadingSpinner && (
				<Spinner isSmall/>
			)}

			{!showLoadingSpinner && cardActions.map((cardAction, cardActionIndex) => {

				const status = cardAction.status !== undefined
					? cardAction.status
					: allActionFieldModels.byId.status.defValue

				const engine = cardAction.engine !== undefined
					? cardAction.engine
					: allActionFieldModels.byId.engine.defValue

				const isLocalizationAction = engine.includes('translator')

				if(
					status === 'disabled' ||
					(localizationMode && localizedBlock && !isLocalizationAction) ||
					(!localizationMode && isLocalizationAction) ||
					(localizationMode && (!isLocalizationAction || !localizedBlock))
				) {
					return null
				}

				const promptMode = cardAction.promptMode !== undefined
					? cardAction.promptMode
					: allActionFieldModels.byId.promptMode.defValue

				const button = cardAction.button !== undefined
					? cardAction.button
					: allActionFieldModels.byId.button.defValue

				return (
					<ActionButton
						onClick={e => {
							handleActionClick({
								sharedEditorProps,
								cardActionIndex,
								engine,
								currentDoc,
								pageIndex,
								localeIndex,
								blockIndex,
								cardAction,
								promptMode,
							})
						}}
					>
						{button}
					</ActionButton>
				)

			})}

		</div>
	)
}


const useStyles = createUseStyles(theme => ({

	root: {
		display: 'flex',
		position: 'absolute',
		top: 2,
		right: 12,
		width: 'auto !important',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: 6,
	}

}),{name: 'inner-row-actions'})